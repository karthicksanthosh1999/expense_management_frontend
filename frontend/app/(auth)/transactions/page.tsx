import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item'
import { ChevronLeft, Filter } from 'lucide-react';
import Link from 'next/link';

const page = () => {
    const people = [
        {
            description: "Apple",
            amount: "3000",
            category: "Purchase",
        },
        {
            description: "Banana",
            amount: "-300",
            category: "Snacks",
        },
        {
            description: "Salary",
            amount: "10000",
            category: "Salary",
        },
        {
            description: "Apple",
            amount: "3000",
            category: "Purchase",
        },
        {
            description: "Banana",
            amount: "-300",
            category: "Snacks",
        },
        {
            description: "Salary",
            amount: "10000",
            category: "Salary",
        },
        {
            description: "Apple",
            amount: "3000",
            category: "Purchase",
        },
        {
            description: "Banana",
            amount: "-300",
            category: "Snacks",
        },
        {
            description: "Salary",
            amount: "10000",
            category: "Salary",
        },
        {
            description: "Apple",
            amount: "3000",
            category: "Purchase",
        },
        {
            description: "Banana",
            amount: "-300",
            category: "Snacks",
        },
        {
            description: "Salary",
            amount: "10000",
            category: "Salary",
        },
        {
            description: "Apple",
            amount: "3000",
            category: "Purchase",
        },
        {
            description: "Banana",
            amount: "-300",
            category: "Snacks",
        },
        {
            description: "Salary",
            amount: "10000",
            category: "Salary",
        },
        {
            description: "Apple",
            amount: "3000",
            category: "Purchase",
        },
        {
            description: "Banana",
            amount: "-300",
            category: "Snacks",
        },
        {
            description: "Salary",
            amount: "10000",
            category: "Salary",
        },
    ]

    return (
        <>
            <header className='bg-[#000000] flex items-center justify-between px-5 mt-10'>
                <Link href={'/'} className='bg-[#1E1E2D] text-[#ffffff] rounded-full p-2 w-fit'><ChevronLeft size={20} /></Link>
                <h1 className='text-xl font-normal tracking-wider text-white'>Profile</h1>
                <div className='bg-[#1E1E2D] text-[#ffffff] rounded-full p-2 w-fit cursor-pointer'><Filter size={18} /></div>
            </header>
            <section>
                <ItemGroup className="w-full mt-3">
                    {people.map((person, idx) => (
                        <Item key={idx} variant="default" className="hover:bg-gray-900 cursor-pointer">
                            <ItemMedia>
                                <div className="bg-[#1E1E2D] text-white font-semibold text-xl h-10 w-10 rounded-full flex items-center justify-center" >{person.description.charAt(0)}</div>
                            </ItemMedia>
                            <ItemContent className="gap-1">
                                <ItemTitle className="text-white text-lg font-normal tracking-wider">{person.description}</ItemTitle>
                                <ItemDescription>{person.category}</ItemDescription>
                            </ItemContent>
                            <ItemActions >
                                <h4 className={`text-lg font-normal ${person.amount.charAt(0) === "-" ? "text-white" : "text-[#0066FF]"}`}>₹{person.amount}</h4>
                            </ItemActions>
                        </Item>
                    ))}
                </ItemGroup>
            </section>
        </>
    )
}

export default page
