import Footer from '@/components/footer';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import Link from 'next/link';

const page = () => {
    return (
        <div className='relative'>
            <header className='bg-[#000000] flex items-center justify-between px-5 mt-10'>
                <Link href={'/'} className='bg-[#1E1E2D] text-[#ffffff] rounded-full p-2 w-fit'><ChevronLeft size={20} /></Link>
                <h1 className='text-xl font-normal tracking-wider text-white'>Settings</h1>
                <div className='bg-[#1E1E2D] text-[#ffffff] rounded-full p-2 w-fit'><LogOut size={20} /></div>
            </header>

            <section className='bg-black h-fit px-5'>
                <p className='text-[#A2A2A7] pt-5'>General</p>
                <ul className=''>
                    <li>
                        <Link href={'/profile'} className='flex justify-between items-center py-5'>
                            <h4 className='text-sm font-normal text-white'>My Profile</h4>
                            <ChevronRight className='text-[#A2A2A7]' />
                        </Link>
                    </li>
                    <Separator className='bg-[#232533]' />
                    <li>
                        <Link href={'/profile'} className='flex justify-between items-center py-5'>
                            <h4 className='text-sm font-normal text-white'>Change Password</h4>
                            <ChevronRight className='text-[#A2A2A7]' />
                        </Link>
                    </li>
                </ul>
            </section>

            <Footer title="Settings" />
        </div>
    )
}

export default page
