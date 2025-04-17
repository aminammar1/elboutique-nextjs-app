    'use client'

    import React, { useState, useRef, useEffect } from 'react'
    import { FaComments, FaTimes } from 'react-icons/fa'

    export default function ChatbotButton() {
    const [open, setOpen] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        if (open && inputRef.current) {
        inputRef.current.focus()
        }
    }, [open])

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
                <h4 className="text-lg font-semibold">Chatbot</h4>
                <button
                className="text-xl text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"
                onClick={() => setOpen(false)}
                aria-label="Close chatbot"
                >
                <FaTimes />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 min-h-[180px] max-h-[300px] flex flex-col gap-2 bg-white">
                {/* Example chat bubbles */}
                <div className="self-start bg-gray-100 text-gray-800 rounded-xl px-4 py-2 text-sm max-w-[80%]">
                Hello! How can I help you today?
                </div>
                {/* Add more chat bubbles here */}
            </div>
            <form className="flex items-center gap-2 px-5 py-3 border-t border-gray-100 bg-white rounded-b-2xl">
                <input
                ref={inputRef}
                type="text"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Type your message..."
                />
                <button
                className="bg-black text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors focus:outline-none"
                type="submit"
                // onClick={handleSend}
                >
                Send
                </button>
            </form>
            </div>
        )}
        </>
    )
    }
