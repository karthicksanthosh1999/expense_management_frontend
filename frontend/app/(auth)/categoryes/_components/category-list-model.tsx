
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { ICategoryTypes } from "@/app/(types)/categoryTypes";
import CategoryList from "./category-list";

type TProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    categoryData: ICategoryTypes[]
}

const CategoryModelList = ({ open, setOpen, categoryData }: TProps) => {
    return (
        <Drawer open={open} onOpenChange={setOpen} direction="bottom">
            <DrawerContent className="h-125">
                <DrawerHeader>
                    <DrawerTitle className="text-white">All Categories</DrawerTitle>
                </DrawerHeader>
                <CategoryList categories={categoryData} />
                <DrawerFooter>
                    <DrawerClose>
                        <Button className="bg-[#0066FF] cursor-pointer hover:bg-blue-800" variant="default">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default CategoryModelList
