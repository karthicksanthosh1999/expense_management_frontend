"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useState } from "react";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axiosInstance";
import { ICategoryTypes } from "@/app/(types)/categoryTypes";
import LineLoader from "../line-loading";

const ViewDetailsModel = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {" "}
          <div className="flex items-center justify-between">
            <h1 className="text-lg">Category List</h1>
            <Button
              type="button"
              variant={"link"}
              className="cursor-pointer"
              onClick={() => setOpen(true)}>
              <X />
            </Button>
          </div>
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogContent></AlertDialogContent>
    </AlertDialog>
  );
};

const CategoryCard = () => {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryFn: async (): Promise<ICategoryTypes[]> => {
      const response = await api.get("/api/category/getAll");
      return response.data?.data;
    },
    queryKey: ["category"],
  });

  return (
    <Card className="md:w-[50%] w-full mx-5">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <h1 className="md:text-lg text-sm">Category</h1>
            <Button
              type="button"
              variant={"link"}
              className="cursor-pointer md:text-sm text-xs"
              onClick={() => setOpen(true)}>
              View Details
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <Separator className="my-2" />
      <CardContent>
        <LineLoader />
        {data && data?.map((item) => <p>{item.title ?? "N/A"}</p>)}
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
