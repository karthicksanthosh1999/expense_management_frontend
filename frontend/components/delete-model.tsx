import React from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'

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
                <AlertDialogHeader>
                    <AlertDialogTitle>Warning</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure?, You want to delete the {name ?? "N/A"}</AlertDialogDescription>
                    <AlertDialogCancel onClick={() => handleDelete(deleteDataId)}>
                        Delete
                    </AlertDialogCancel>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteModel
