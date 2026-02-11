import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, CircleUser, Edit, InboxIcon, Mail, Phone, User } from 'lucide-react'
import Link from 'next/link';

const page = () => {
    return (
        <>
            <header className='bg-[#000000] flex items-center justify-between px-5 mt-10'>
                <Link href={'/settings'} className='bg-[#1E1E2D] text-[#ffffff] rounded-full p-2 w-fit'><ChevronLeft size={20} /></Link>
                <h1 className='text-xl font-normal tracking-wider text-white'>Profile</h1>
                <div className='bg-[#1E1E2D] text-[#ffffff] rounded-full p-2 w-fit'><Edit size={20} /></div>
            </header>

            <section className='flex items-center justify-center flex-col gap-5 mt-10'>
                <Avatar className="size-28">
                    <AvatarImage src="https://github.com/maxleiter.png" />
                    <AvatarFallback>JK</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                    <h1 className="text-white text-2xl font-semibold">Joseph Karthick</h1>
                    <p className="text-[#7E848D] text-sm text-center">Software Engineer</p>
                </div>
            </section>

            <div className='mt-5'>
                <ItemGroup className="w-full">
                    <h4 className='text-[#A2A2A7] pl-4 text-[15px] font-normal tracking-wider'>Full Name</h4>
                    <Item variant="default">
                        <ItemMedia>
                            <CircleUser size={25} className="text-[#A2A2A7]" />
                        </ItemMedia>
                        <ItemContent className="gap-1">
                            <ItemTitle className="text-white text-sm font-normal tracking-wider">Joseph Karthick</ItemTitle>
                            <ItemDescription></ItemDescription>
                        </ItemContent>
                    </Item>
                </ItemGroup>
                <Separator className='bg-[#232533] my-2' />
                <ItemGroup className="w-full">
                    <h4 className='text-[#A2A2A7] pl-4 text-[15px] font-normal tracking-wider'>Email</h4>
                    <Item variant="default">
                        <ItemMedia>
                            <Mail size={25} className="text-[#A2A2A7]" />
                        </ItemMedia>
                        <ItemContent className="gap-1">
                            <ItemTitle className="text-white text-sm font-normal tracking-wider">jk@jk.net</ItemTitle>
                            <ItemDescription></ItemDescription>
                        </ItemContent>
                    </Item>
                </ItemGroup>
                <Separator className='bg-[#232533] my-2' />
                <ItemGroup className="w-full">
                    <h4 className='text-[#A2A2A7] pl-4 text-[15px] font-normal tracking-wider'>Email</h4>
                    <Item variant="default">
                        <ItemMedia>
                            <Phone size={25} className="text-[#A2A2A7]" />
                        </ItemMedia>
                        <ItemContent className="gap-1">
                            <ItemTitle className="text-white text-sm font-normal tracking-wider">8220942387</ItemTitle>
                            <ItemDescription></ItemDescription>
                        </ItemContent>
                    </Item>
                </ItemGroup>
                <Separator className='bg-[#232533] my-2' />
            </div>

            <h4 className='text-[#A2A2A7] pl-4 text-xs font-normal tracking-wider text-center mt-10'>Joined 28 Jan 2026</h4>
        </>
    )
}

export default page
