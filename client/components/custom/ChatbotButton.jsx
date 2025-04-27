    'use client'

    import React, { useState, useRef, useEffect } from 'react'
    import { FaComments, FaTimes } from 'react-icons/fa'
    import { GoogleGenerativeAI } from '@google/generative-ai'

    export default function ChatbotButton() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Hello! How can I help you today?' },
    ])
    const [input, setInput] = useState('')
    const [chatSession, setChatSession] = useState(null)
    const inputRef = useRef(null)
    const messageEndRef = useRef(null)
    const API_KEY = process.env.NEXT_PUBLIC_Gemini_API_KEY

    // Auto-scroll to bottom of messages
    useEffect(() => {
        if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    useEffect(() => {
        if (open && inputRef.current) {
        inputRef.current.focus()
        }

        // Initialize the chat session when the component mounts
        if (open && !chatSession && API_KEY) {
        try {
            const genAI = new GoogleGenerativeAI(API_KEY)
            const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash',
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 500, // Reduced token limit
            },
            })

            // Start a chat session
            const chat = model.startChat({
            history: [
                {
                role: 'user',
                parts: [
                    {
                    text: "Hello, I'm shopping at El Boutique website and I need some help.",
                    },
                ],
                },
                {
                role: 'model',
                parts: [
                    {
                    text: 'Hello! How can I help you today with your shopping at El Boutique?',
                    },
                ],
                },
            ],
            })

            setChatSession(chat)
        } catch (error) {
            console.error('Error initializing chat:', error)
        }
        }
    }, [open, chatSession, API_KEY])

    const handleSend = async (e) => {
        e.preventDefault()
        if (!input.trim() || !chatSession) return

        const userMessage = { role: 'user', content: input }
        setMessages((prev) => [...prev, userMessage])
        const userInput = input
        setInput('')
        setLoading(true)

        try {
        // Send the message to the Gemini model
        const result = await chatSession.sendMessage(userInput)
        const response = await result.response
        let botReply = response.text()

        setMessages((prev) => [...prev, { role: 'bot', content: botReply }])
        } catch (error) {
        console.error('Error details:', error)
        setMessages((prev) => [
            ...prev,
            {
            role: 'bot',
            content: `Error contacting AI: ${
                error.message || 'Please try again later.'
            }`,
            },
        ])
        } finally {
        setLoading(false)
        }
    }

    return (
        <>
        <button
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-black text-white shadow-lg flex items-center justify-center text-3xl transition-all duration-200 hover:bg-gray-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black z-[1000]"
            onClick={() => setOpen(true)}
            aria-label="Open chatbot"
        >
            <FaComments />
        </button>

        {open && (
            <div className="fixed bottom-24 right-8 z-[1001] w-[350px] max-w-[90vw] flex flex-col rounded-2xl shadow-2xl border border-gray-200 bg-white animate-fadeInUp">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 rounded-t-2xl bg-gray-50">
                <h4 className="text-lg font-semibold">El Boutique Assistant</h4>
                <button
                className="text-xl text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"
                onClick={() => setOpen(false)}
                aria-label="Close chatbot"
                >
                <FaTimes />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 min-h-[280px] max-h-[400px] flex flex-col gap-3 bg-gray-50">
                {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                >
                    <div
                    className={`${
                        msg.role === 'user'
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    } rounded-2xl px-4 py-3 text-sm max-w-[85%] shadow-sm`}
                    >
                    {msg.content}
                    </div>
                </div>
                ))}
                {loading && (
                <div className="flex justify-start">
                    <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl px-4 py-3 text-sm max-w-[85%] shadow-sm">
                    <div className="flex space-x-1">
                        <div className="animate-bounce h-2 w-2 bg-gray-500 rounded-full"></div>
                        <div className="animate-bounce h-2 w-2 bg-gray-500 rounded-full delay-100"></div>
                        <div className="animate-bounce h-2 w-2 bg-gray-500 rounded-full delay-200"></div>
                    </div>
                    </div>
                </div>
                )}
                <div ref={messageEndRef} />
            </div>

            <form
                onSubmit={handleSend}
                className="flex items-center gap-2 px-5 py-3 border-t border-gray-200 bg-white rounded-b-2xl"
            >
                <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Type your message..."
                disabled={loading}
                />
                <button
                className={`${
                    loading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'
                } text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none`}
                type="submit"
                disabled={loading}
                >
                Send
                </button>
            </form>
            </div>
        )}
        </>
    )
}
