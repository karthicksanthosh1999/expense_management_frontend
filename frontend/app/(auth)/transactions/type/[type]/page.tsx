'use client'
import { Button } from '@/components/ui/button';
import { ChevronLeft, LogOut } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation'
import { useCreateTransactionHook } from '../../_hooks/transactionHooks';
import { useGetAllCategories } from '@/app/(auth)/categoryes/_hooks/categoryHooks';
import { ChangeEvent, FormEvent, useState } from 'react';
import { TTransactionValidationSchemaType } from '../../schema/transactionSchema';

const page = () => {
    const { type } = useParams();
    const navigate = useRouter();

    const typeExpense = type as string;

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [transactionData, setTransactionData] =
        useState<TTransactionValidationSchemaType>({
            amount: 0,
            categoryId: "",
            description: "",
            expenseType: "",
            userId: "",
        });

    const { mutate } = useCreateTransactionHook();
    const { data: categoriesData } = useGetAllCategories();

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;

        setTransactionData((prev) => ({
            ...prev,
            [name]: name === "amount" ? Number(value) : value,
        }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!transactionData.amount || transactionData.amount <= 0) {
            newErrors.amount = "Amount must be greater than 0";
        }

        if (!transactionData.description.trim()) {
            newErrors.description = "Description is required";
        }

        if (!transactionData.categoryId) {
            newErrors.categoryId = "Please select a category";
        }

        return newErrors;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        mutate({
            ...transactionData,
            expenseType: typeExpense ?? "Expense",
        });

        handleResetForm();
    };

    const handleResetForm = () => {
        setTransactionData({
            amount: 0,
            categoryId: "",
            description: "",
            expenseType: "",
            userId: "",
        });
        setErrors({});
    };

    return (
        <div className='h-full'>
            <div className="min-h-screen bg-black flex flex-col">

                {/* Header */}
                <header className="flex items-center justify-between px-5 h-16 mt-10 bg-[#000000]">
                    <button
                        onClick={() => navigate.back()}
                        className="bg-[#1E1E2D] text-white rounded-full p-2 w-fit"
                    >
                        <ChevronLeft size={20} onClick={handleResetForm} />
                    </button>

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
                        <form onSubmit={handleSubmit}></form>
                        <div></div>
                        <div className="flex flex-col items-center space-y-4 w-full">
                            <h4 className="text-lg text-gray-400 text-center">
                                Enter the {type} amount
                            </h4>

                            <div className="flex space-x-2 items-center justify-center">
                                <span className="text-4xl text-white">₹</span>
                                <input
                                    type="number"
                                    onChange={handleChange}
                                    inputMode="numeric"
                                    className="text-4xl text-white w-32 bg-transparent focus:outline-none text-center"
                                    placeholder="00.00"
                                />
                            </div>
                            {errors.amount && (
                                <p className="text-red-500 text-sm">{errors.amount}</p>
                            )}

                            <input
                                type="text"
                                value={transactionData?.description}
                                onChange={handleChange}
                                className="bg-gray-900 focus:outline-none text-gray-300 rounded-2xl p-2 w-full text-center"
                                placeholder="What is this for?"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">{errors.description}</p>
                            )}
                            <select
                                name="categoryId"
                                value={transactionData.categoryId}
                                onChange={handleChange}
                                className="w-full rounded-lg px-3 py-2 bg-gray-900 text-blue-500 border-2 border-gray-900"
                            >
                                <option value="" disabled>
                                    Choose a Category
                                </option>

                                {categoriesData?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && (
                                <p className="text-red-500 text-sm">{errors.categoryId}</p>
                            )}
                        </div>

                        <Button type='submit' className="cursor-pointer w-full bg-[#0066FE] hover:bg-blue-400 mb-10"
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
