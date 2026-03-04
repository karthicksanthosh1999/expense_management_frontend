'use client'
import { Button } from '@/components/ui/button';
import { ChevronLeft, LogOut, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation'
import { useCreateTransactionHook } from '../../_hooks/transactionHooks';
import { useGetAllCategories } from '@/app/(auth)/categoryes/_hooks/categoryHooks';
import { useEffect } from 'react';
import { transactionValidationSchema, TTransactionValidationSchemaType } from '../../schema/transactionSchema';
import { useAuth } from '@/app/context/AuthContext';
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FieldGroup } from '@/components/ui/field';
import { Label } from '@/components/ui/label';

const page = () => {
    const { type } = useParams();
    const { user } = useAuth()
    const navigate = useRouter();
    const expenseTypeString = type as string;
    const form = useForm({
        resolver: zodResolver(transactionValidationSchema),
        defaultValues: {
            expenseType: "",
            userId: "",
        },
    });

    useEffect(() => {
        form.reset({
            userId: user?.id,
            expenseType: expenseTypeString === "expense" ? "Expense" : "Income",
        });
    }, [user]);

    const { mutate } = useCreateTransactionHook();
    const { data: categoriesData } = useGetAllCategories();
    const handleResetForm = () => {
        form.reset();
        navigate.push("/transactions")
    }
    const handleExpenseSubmit = (data: TTransactionValidationSchemaType) => {
        mutate(data);
        handleResetForm()
    };



    return (
        <div className=' h-full w-full'>
            <div className="min-h-screen bg-black flex flex-col">

                {/* HEADER */}
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

                {/* FORM SECTION */}
                <section className="px-5">
                    <div className="w-full space-y-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleExpenseSubmit)}>
                                <FieldGroup>
                                    <Label />
                                    <FormField
                                        name="amount"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input
                                                    className='text-center border-none h-20 focus:outline-0 text-white text-5xl'
                                                    type="number"
                                                    inputMode="numeric"
                                                    placeholder="00.00"
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="description"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <Input
                                                    className='text-center h-10 border-none focus:outline-0 text-white'
                                                    placeholder="Enter Description"
                                                    {...field}
                                                    type="text"
                                                    autoComplete="off"
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="categoryId"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a Category" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Categories</SelectLabel>
                                                            {categoriesData?.map((item) => (
                                                                <SelectItem key={item.id} value={item.id!}>
                                                                    {item.title}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        className="cursor-pointer w-full bg-[#0066FF] hover:bg-blue-700"
                                        variant={"default"}
                                        type="submit">
                                        Add
                                    </Button>
                                </FieldGroup>
                            </form>
                        </Form>
                    </div>
                </section>

            </div>

        </div>
    )
}

export default page
