import { ICategoryTypes } from '@/app/(types)/categoryTypes'
import DeleteModel from '@/components/delete-model';
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item'
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { useCategoryDeleteMutationHook } from '../_hooks/categoryHooks';

type TProps = {
    categories: ICategoryTypes[]
}

const CategoryList = ({ categories }: TProps) => {

    const { mutate } = useCategoryDeleteMutationHook();
    const [deleteCategoryModelOpen, setDeleteCategoryModelOpen] = useState(false);

    const handleDelete = (id: string) => {
        mutate(id)
    }

    return (
        <>
            <ItemGroup className="w-full h-80 overflow-y-auto">
                {categories.map((category, idx) => (
                    <Item key={idx} variant="default" className="hover:bg-gray-900 h-fit border-b border-b-gray-900">
                        <ItemMedia>
                            <div className="bg-[#1E1E2D] font-semibold text-xl h-10 w-10 rounded-full flex items-center justify-center" style={{ color: category.color }} >{category.title.charAt(0)}</div>
                        </ItemMedia>
                        <ItemContent className="gap-1">
                            <ItemTitle className="text-white text-lg font-normal tracking-wider">{category.title}</ItemTitle>
                            <ItemDescription style={{ color: category.color }} >{category.color}</ItemDescription>
                        </ItemContent>
                        <ItemActions className='cursor-pointer' >
                            <Trash className='text-[#A2A2A7] hover:text-white ' />
                            <Edit className='text-[#A2A2A7] hover:text-white ' />
                        </ItemActions>
                        <DeleteModel
                            open={deleteCategoryModelOpen}
                            setOpen={setDeleteCategoryModelOpen}
                            name='Category'
                            deleteDataId={category.id!}
                            handleDelete={handleDelete}
                        />
                    </Item>
                ))}
            </ItemGroup>
        </>
    )
}

export default CategoryList
