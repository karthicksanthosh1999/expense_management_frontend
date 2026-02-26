import React from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'
import { X } from 'lucide-react';
import { Button } from './ui/button';

type TType = {
    name: string,
    open: boolean;
    deleteDataId: string,
    setOpen: (open: boolean) => void,
    handleDelete: (id: string) => void
}

const DeleteModel = ({ name, open, setOpen, deleteDataId, handleDelete }: TType) => {

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader >

                    <AlertDialogTitle className='text-gray-100'>Warning</AlertDialogTitle>
                    <AlertDialogDescription className='text-gray-400'>Are you sure?, You want to delete the {name ?? "N/A"}</AlertDialogDescription>
                    <div className="flex items-center justify-evenly w-full">
                        <Button variant={'default'} className='cursor-pointer' onClick={() => handleDelete(deleteDataId)}>
                            Close
                        </Button>
                        <Button variant={'destructive'} className='cursor-pointer' onClick={() => handleDelete(deleteDataId)}>
                            Delete
                        </Button>
                    </div>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteModel
