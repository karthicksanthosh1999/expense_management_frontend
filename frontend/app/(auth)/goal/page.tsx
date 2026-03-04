'use client';
import Footer from '@/components/footer';
import { ChevronLeft, Filter, Plus } from 'lucide-react';
import Link from 'next/link';
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import { GoalHalfRadialChart } from './_components/goal-half-radial-chart';
import { useCallback, useEffect, useState } from 'react';
import { IGoalType } from '@/app/(types)/goalTypes';
import { useGetAllGoals, useGoalDeleteMutationHook } from './_hooks/goalHooks';
import AddAmountModel from './_components/add-amount-model';
import DeleteModel from '@/components/delete-model';
import { IGlobalDeleteType } from '@/app/(types)/constants';

const page = () => {
    const { data: goalData } = useGetAllGoals();
    const { mutate: goalDeleteMutation } = useGoalDeleteMutationHook();

    const [addModelOpen, setAddModelOpen] = useState(false)
    const [deleteModelOpen, setDeleteModelOpen] = useState(false)
    const [selectedGoals, setSelectedGoals] = useState<IGoalType | null>(null)

    useEffect(() => {
        if (goalData?.length && !selectedGoals) {
            setSelectedGoals(goalData[0]);
        }
    }, [goalData, selectedGoals]);

    const handlePassChartData = useCallback((data: IGoalType) => {
        setSelectedGoals(data);
    }, []);

    const handleDelete = (id: string) => {
        goalDeleteMutation(id)
        setDeleteModelOpen(false)
    }

    return (
        <>

            {/* HEADER SECTION */}
            <header className="bg-[#000000] flex items-center justify-between px-5 mt-10">
                <Link
                    href={"/"}
                    className="bg-[#1E1E2D] text-[#ffffff] rounded-full p-2 w-fit">
                    <ChevronLeft size={20} />
                </Link>
                <h1 className="text-xl font-normal tracking-wider text-white">
                    Goals
                </h1>
                <Link href={'/goal/add-goal'} className="bg-[#1E1E2D] text-[#ffffff] rounded-full p-2 w-fit cursor-pointer">
                    <Plus size={18} />
                </Link>
            </header>
            {/* GOAL CHART */}
            <section>
                {
                    selectedGoals ? (
                        <GoalHalfRadialChart chartData={[selectedGoals]} />
                    ) : (
                        <h1>Add Goal</h1>
                    )
                }
            </section>
            <div className="mx-5 flex items-center justify-between">
                <Button onClick={() => setDeleteModelOpen(true)} variant={'link'} className="text-xs font-normal cursor-pointer tracking-wider text-[#0066FF]">Delete Goal</Button>
                <Button variant={'link'} className="text-xs font-normal cursor-pointer tracking-wider text-[#0066FF]">Edit Goals</Button>
                <Button onClick={() => setAddModelOpen(true)} variant={'link'} className="text-xs font-normal cursor-pointer tracking-wider text-[#0066FF]">Add Amount</Button>
            </div>
            {/* GOAL LIST */}
            <ItemGroup className="w-full mt-3 h-96 overflow-auto">
                {goalData && goalData.map((goal, idx) => (
                    <Item
                        key={idx}
                        variant="default"
                        className="hover:bg-gray-900 cursor-pointer"
                        onClick={() => handlePassChartData(goal)}
                    >
                        <ItemMedia>
                            <div className="bg-[#1E1E2D] text-white font-semibold text-xl h-10 w-10 rounded-full flex items-center justify-center">
                                {goal?.target?.charAt(0)}
                            </div>
                        </ItemMedia>
                        <ItemContent className="gap-1">
                            <ItemTitle className="text-white text-lg font-normal tracking-wider">
                                {goal.target}
                            </ItemTitle>
                            <ItemDescription>{goal.goal}</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <h4
                                className={`text-lg font-normal ${goal.target.charAt(0) === "-" ? "text-white" : "text-[#0066FF]"}`}>
                                ₹{goal.amount}
                            </h4>
                        </ItemActions>
                    </Item>
                ))}
            </ItemGroup>

            {/* FOOTER LIST */}
            <Footer title='Goal' />

            {/* ADD AMOUNT SECTION */}
            {
                selectedGoals?.id &&
                <AddAmountModel
                    goalId={selectedGoals?.id}
                    open={addModelOpen}
                    setOpen={setAddModelOpen}
                />
            }
            {
                selectedGoals?.id &&
                <DeleteModel
                    deleteDataId={selectedGoals?.id}
                    name='Goal'
                    handleDelete={handleDelete}
                    open={deleteModelOpen}
                    setOpen={setDeleteModelOpen}
                />
            }
        </>
    )
}

export default page
