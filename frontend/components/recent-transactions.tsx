'use client'

import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item'
import { Separator } from './ui/separator'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFilterTransactionHook } from '@/app/(auth)/transactions/_hooks/transactionHooks'


type TProps = {
    limit: number
}

const RecentTransactions = ({ limit }: TProps) => {
    const { push } = useRouter();
    const { mutate: transactionMutation, data: transactionData } = useFilterTransactionHook();

    const fetchTransactions = useCallback(() => {
        transactionMutation({
            search: "",
            endDate: "",
            startDate: "",
            expenseType: ""
        })
    }, [])

    useEffect(() => {
        fetchTransactions()
    }, [])

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
    ];

    const handleTransactionNavigation = (id: string) => {
        if (id) {
            push(`/transactions/${id}`)
        }
    };

    return (
        <section>
            <div className="mx-5 flex items-center justify-between m-5">
                <h4 className="text-lg font-normal tracking-wider text-white">Transaction</h4>
                <Link href={'/transactions'} className="text-sm font-semibold text-[#0066FF]">See All</Link>
            </div>
            <Separator className='bg-[#232533]' />
            <ItemGroup className="w-full h-80 overflow-y-auto">
                {transactionData && transactionData?.slice(0, limit).map((item, idx) => (
                    <Item key={idx} variant="default" className="hover:bg-gray-900 cursor-pointer h-fit" onClick={() => handleTransactionNavigation(item?.id)}>
                        <ItemMedia>
                            <div className="bg-[#1E1E2D] font-semibold text-xl h-10 w-10 rounded-full flex items-center justify-center" style={{ color: item?.category?.color }} >{item.description.charAt(0)}</div>
                        </ItemMedia>
                        <ItemContent className="gap-1">
                            <ItemTitle className="text-white text-lg font-normal tracking-wider">{item.description}</ItemTitle>
                            <ItemDescription>{item.expensetype}</ItemDescription>
                        </ItemContent>
                        <ItemActions >
                            <h4 className={`text-lg font-normal`} style={{ color: item.amount.charAt(0) === "-" ? "red" : "green" }}>₹{item.amount}</h4>
                        </ItemActions>
                    </Item>
                ))}
            </ItemGroup>

        </section>
    )
}

export default RecentTransactions
