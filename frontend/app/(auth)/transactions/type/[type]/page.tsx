'use client'
import { Button } from '@/components/ui/button';
import { ChevronLeft, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import { useCreateTransactionHook } from '../../_hooks/transactionHooks';
import { useGetAllCategories } from '@/app/(auth)/categoryes/_hooks/categoryHooks';

const page = () => {
    const { type } = useParams();

    const { mutate } = useCreateTransactionHook();
    const { data: categoriesData } = useGetAllCategories();

    const handleClose = () => {
    };

    return (
        <div className='h-full'>
            <div className="min-h-screen bg-black flex flex-col">

                {/* Header */}
                <header className="flex items-center justify-between px-5 h-16 mt-10 bg-[#000000]">
                    <Link
                        href="/"
                        className="bg-[#1E1E2D] text-white rounded-full p-2 w-fit"
                    >
                        <ChevronLeft size={20} />
                    </Link>

                    <h1 className="text-xl font-normal tracking-wider text-white capitalize">
                        {type ?? "N/A"}
                    </h1>

                    <div className="bg-[#1E1E2D] text-white rounded-full p-2 w-fit">
                        <LogOut size={20} />
                    </div>
                </header>

                {/* Remaining Section */}
                <section className="flex-1 flex justify-center px-5">
                    <div className="w-full max-w-md flex flex-col items-center justify-between space-y-6">

                        <div></div>
                        <div className="flex flex-col items-center space-y-4 w-full">
                            <h4 className="text-lg text-gray-400 text-center">
                                Enter the {type} amount
                            </h4>

                            <div className="flex space-x-2 items-center justify-center">
                                <span className="text-4xl text-white">₹</span>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    className="text-4xl text-white w-32 bg-transparent focus:outline-none text-center"
                                    placeholder="00.00"
                                />
                            </div>

                            <input
                                type="text"
                                className="bg-gray-900 focus:outline-none text-gray-300 rounded-2xl p-2 w-full text-center"
                                placeholder="What is this for?"
                            />

                            <select className="text-blue-500 block w-full rounded-lg px-3 py-2.5 border-2 border-gray-900 bg-gray-900 border-default-medium text-heading text-sm rounded-base focus:border-none">
                                <option selected className='text-gray-400'>Choose a Category</option>
                                {categoriesData?.map((item) => (
                                    <option key={item.id} value={item.id!}>{item.title}</option>
                                ))}
                            </select>
                        </div>

                        <Button className="cursor-pointer w-full bg-[#0066FE] hover:bg-blue-400 mb-10"
                            variant="default"                        >
                            Enter
                        </Button>

                    </div>
                </section>

            </div>

        </div>
    )
}

export default page
