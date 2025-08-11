import { NextResponse } from 'next/server'

// Small helper to coerce roles and seed a system prompt
function buildOpenRouterMessages(messages, latestUserInput) {
  const system = {
    role: 'system',
    content:
      'You are El Boutique Assistant, a concise, helpful shopping assistant for an e-commerce site. Answer briefly, be friendly, and, when relevant, suggest products or categories. If you are unsure, ask a short follow-up question.',
  }

  const history = Array.isArray(messages)
    ? messages
        .map((m) => {
          if (!m || !m.role) return null
          // Map UI roles to OpenAI roles
          if (m.role === 'bot' || m.role === 'assistant') {
            return { role: 'assistant', content: String(m.content ?? '') }
          }
          if (m.role === 'user') {
            return { role: 'user', content: String(m.content ?? '') }
          }
          return null
        })
        .filter(Boolean)
    : []

  if (latestUserInput && String(latestUserInput).trim().length > 0) {
    history.push({ role: 'user', content: String(latestUserInput) })
  }

  return [system, ...history]
}

export async function POST(req) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server misconfiguration: missing OPENROUTER_API_KEY' },
        { status: 500 }
      )
    }

    const {
      messages,
      prompt,
      temperature = 0.7,
      max_tokens = 300,
    } = (await req.json()) || {}

    const refererHeader = req.headers.get('referer')
    const host = req.headers.get('host')
    const referer =
      refererHeader || (host ? `https://${host}` : 'http://localhost:3000')

    const payload = {
      model: 'openai/gpt-oss-20b:free',
      messages: buildOpenRouterMessages(messages, prompt),
      temperature,
      max_tokens,
    }

    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': referer,
        'X-Title': 'El Boutique Chatbot',
      },
      body: JSON.stringify(payload),
    })

    if (!resp.ok) {
      const text = await resp.text()
      return NextResponse.json(
        { error: 'OpenRouter request failed', details: text },
        { status: resp.status }
      )
    }

    const data = await resp.json()
    const content = data?.choices?.[0]?.message?.content || ''
    return NextResponse.json({ reply: content })
  } catch (err) {
    return NextResponse.json(
      {
        error: 'Unexpected server error',
        details: err?.message || String(err),
      },
      { status: 500 }
    )
  }
}
