import { ChartPie, House, Settings } from 'lucide-react'
import Link from 'next/link';

type TProps = {
    title: string
}

const Footer = ({ title }: TProps) => {
    return (
        <footer className='bg-[#27273A] fixed bottom-0 flex items-center justify-around p-3 py-5 w-full rounded-t-2xl'>
            <Link href={'/'} className={`flex items-center flex-col ${title === "Home" ? " text-[#0066FF]" : "text-[#8B8B94]"}`}>
                <House size={25} />
                <span className='text-xs'>Home</span>
            </Link>
            <Link href={'/statistics'} className={`flex items-center flex-col ${title === "Statistics" ? " text-[#0066FF]" : "text-[#8B8B94]"}`}>
                <ChartPie size={25} />
                <span className='text-xs'>Statistics</span>
            </Link>
            <Link href={'/categoryes'} className={`flex items-center flex-col ${title === "Category" ? " text-[#0066FF]" : "text-[#8B8B94]"}`}>
                <House size={25} />
                <span className='text-xs'>Category</span>
            </Link>
            <Link href={'/settings'} className={`flex items-center flex-col ${title === "Settings" ? " text-[#0066FF]" : "text-[#8B8B94]"}`}>
                <Settings size={25} />
                <span className='text-xs'>Settings</span>
            </Link>
        </footer>
    )
}

export default Footer
