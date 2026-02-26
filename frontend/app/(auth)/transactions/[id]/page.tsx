'use client';
import { useParams } from 'next/navigation'
import { deleteSingleTransactions, useDeleteTransactionHook, useGetSingleTransactionsHook } from '../_hooks/transactionHooks';
import { BanknoteArrowDown, Calendar, ChartBarStacked, ChevronLeft, Mail, Trash, UserCircle } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Separator } from '@/components/ui/separator';
import { ISOToIndianDateFormate } from '@/lib/dateFormater';
import Link from 'next/link';
import DeleteModel from '@/components/delete-model';
import { useState } from 'react';

const page = () => {
    const params = useParams();
    const id = params?.id as string;

    const [deleteModelOpen, setDeleteModelOpen] = useState<boolean>(false)


    const { data: transactionData } = useGetSingleTransactionsHook(id);
    const { mutate: deleteTransactionMutation } = useDeleteTransactionHook();

    const handleDelete = (id: string) => {
        deleteTransactionMutation(id)
    }

    return (
        <>
            <div className='relative'>
                <header className='bg-[#000000] flex items-center justify-between px-5 mt-10'>
                    <Link href={'/'} className='bg-[#1E1E2D] text-[#ffffff] rounded-full p-2 w-fit cursor-pointer'><ChevronLeft size={20} /></Link>
                    <h1 className='text-xl font-normal tracking-wider text-white'>Transaction</h1>
                    <div className='bg-[#1E1E2D] text-[#ffffff] rounded-full p-2 w-fit'><Trash size={20} onClick={() => setDeleteModelOpen(true)} /></div>
                </header>


                <div className="flex items-center justify-center w-24 h-24 mx-auto my-8  rounded-full">
                    <DotLottieReact
                        src="/success.json"
                        loop={false}
                        autoplay
                    />
                </div>
                <h1 className="mb-6 text-4xl font-extrabold text-green-600 text-center">
                    Payment Successful!
                </h1>

                <p className="mb-4 text-2xl font-semibold text-green-500  text-center">
                    ₹{transactionData?.amount}
                </p>
                <p className="mb-4 text-xl text-gray-200 text-center">
                    {transactionData?.description}
                </p>
                <div className='p-5'>
                    <div className="grid grid-cols-2 place-items-start justify-center w-full">
                        {/* DATE  SECTION */}
                        <div className="flex flex-col items-start justify-center gap-5">
                            <p className='text-gray-400'>Date</p>
                            <div className="flex  items-center gap-3">
                                <Calendar size={20} className='text-gray-400' />
                                {
                                    transactionData?.createdat &&
                                    <p className='text-gray-200'>{ISOToIndianDateFormate(transactionData?.createdat)}</p>
                                }
                            </div>
                        </div>
                        {/* EXPENSE TYPE SECTION */}
                        <div className="flex flex-col items-start justify-center gap-5">
                            <p className='text-gray-400'>Expense Type</p>
                            <div className="flex  items-center gap-3">
                                <BanknoteArrowDown size={20} className='text-gray-400' />
                                <p className='text-gray-200'>{transactionData?.expensetype}</p>
                            </div>
                        </div>
                        <Separator className='bg-gray-900 my-3 w-full' />
                    </div>
                    {/* CATEGORY SECTION */}
                    <div className="flex flex-col items-start justify-center gap-5">
                        <p className='text-gray-400'>Category</p>
                        <div className="flex  items-center gap-3">
                            <ChartBarStacked className='text-gray-400' />
                            <p style={{ color: transactionData?.category?.color }}>{transactionData?.category?.title}</p>
                        </div>
                        <Separator className='bg-gray-900' />
                    </div>
                    {/* USER NAME SECTION */}
                    <div className="flex flex-col items-start justify-center gap-5">
                        <p className='text-gray-400'>User Name</p>
                        <div className="flex  items-center gap-3">
                            <UserCircle className='text-gray-400' />
                            <p className='text-gray-200'>{transactionData?.user?.fullName}</p>
                        </div>
                        <Separator className='bg-gray-900' />
                    </div>
                    {/* EMAIL SECTION */}
                    <div className="flex flex-col items-start justify-center gap-5">
                        <p className='text-gray-400'>User Email</p>
                        <div className="flex  items-center gap-3">
                            <Mail className='text-gray-400' />
                            <p className='text-gray-200'>{transactionData?.user?.email}</p>
                        </div>
                        <Separator className='bg-gray-900' />
                    </div>
                </div>
            </div>
            <DeleteModel
                deleteDataId={id}
                handleDelete={handleDelete}
                name='transaction'
                open={deleteModelOpen}
                setOpen={setDeleteModelOpen}

            />
        </>
    )
}

export default page
