'use client'

import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item'
import { Separator } from './ui/separator'
import Link from 'next/link'
import { TransactionModel } from './TransactionModel'
import { useState } from 'react'


type TProps = {
    limit: number
}

const RecentTransactions = ({ limit }: TProps) => {

    const [open, setOpen] = useState(false)


    const people = [
        {
            description: "Apple",
            amount: "3000",
            category: "Purchase",
        },
        {
            description: "Banana",
            amount: "-300",
            category: "Food",
        },
        {
            description: "Salary",
            amount: "10000",
            category: "Salary",
        },
        {
            description: "Banana",
            amount: "-300",
            category: "Food",
        },
        {
            description: "Salary",
            amount: "10000",
            category: "Salary",
        },
        {
            description: "Salary",
            amount: "10000",
            category: "Salary",
        },
        {
            description: "Banana",
            amount: "-300",
            category: "Food",
        },
        {
            description: "Salary",
            amount: "10000",
            category: "Salary",
        },
        {
            description: "Salary",
            amount: "10000",
            category: "Salary",
        },
        {
            description: "Banana",
            amount: "-300",
            category: "Food",
        },
        {
            description: "Salary",
            amount: "10000",
            category: "Salary",
        },
    ]

    return (
        <section>
            <div className="mx-5 flex items-center justify-between m-5">
                <h4 className="text-lg font-normal tracking-wider text-white">Transaction</h4>
                <Link href={'/transactions'} className="text-sm font-semibold text-[#0066FF]">See All</Link>
            </div>
            <Separator className='bg-[#232533]' />
            <ItemGroup className="w-full h-80 overflow-y-auto">
                {people.slice(0, limit).map((person, idx) => (
                    <Item key={idx} variant="default" className="hover:bg-gray-900 cursor-pointer h-fit" onClick={() => setOpen(true)}>
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

            <TransactionModel open={open} setOpen={setOpen} expenseType='Expense' />
        </section>
    )
}

export default RecentTransactions
