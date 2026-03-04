'use client';

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ChevronLeft, LogOut, SendHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react';


const page = () => {

    const { back } = useRouter()
    const [messages, setMessages] = useState<string[]>([
        "Hello 👋 I am your AI assistant.",
    ]);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // ✅ Auto Scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div>
            {/* HEADER SECTION */}
            <header className='bg-[#000000] flex items-center justify-between px-5 mt-10'>
                <Button type='button' variant={'ghost'} onClick={() => back()} className='bg-[#1E1E2D] text-[#ffffff] rounded-full p-2 w-fit'><ChevronLeft size={20} /></Button>
                <h1 className='text-xl font-normal tracking-wider text-white'>AI Chat</h1>
                <div></div>
            </header>

            {/* CHAT SECTION */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className="max-w-[70%] bg-[#1E1E2D] text-white px-4 py-2 rounded-2xl"
                    >
                        {msg}
                    </div>
                ))}

                {/* Auto scroll target */}
                <div ref={messagesEndRef} />
            </div>

            <form className='fixed bottom-10 w-full'>
                <div className='flex gap-2 px-2'>
                    <Input placeholder='What is the agenta today?' className='border border-blue-600 focus:outline-none focus:ring-0' />
                    <Button type='submit' variant={'ghost'} size={'icon'} className='cursor-pointer hover:bg-gray-900 border border-blue-600'>
                        <SendHorizontal className='text-[#0066FF]' />
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default page
