import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Header } from "./Header";
import { StepProps } from "./SecondInfo";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const ThirdInfo = ({ step, setStep }: StepProps) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("File uploaded successfully");
    } else {
      console.error("Error uploading file");
    }
  };

  // function onSubmit() {
  //   setStep(step + 1);
  // }

  const backChange = () => {
    setStep(step - 1);
  };
  return (
    <Card className="h-164 w-120 flex flex-col gap-40.5 items-center">
      <CardHeader className="h-96.5 w-104 flex flex-col gap-7 items-center">
        <Header />
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 w-104">
            <Label htmlFor="date" className="text-[14px] font-semibold">
              Date of birth *
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-104 justify-between font-normal"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-3 w-104 relative">
            <p className="text-[14px] font-semibold">Profile image *</p>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="file"
                onChange={handleFileChange}
                className="opacity-0 absolute top-0 left-0 h-full w-full"
              />
              <button
                type="button"
                className="h-45 w-104 bg-[#7F7F800D] rounded-md"
              >
                Add image
              </button>
            </form>
          </div>
          <div className="flex gap-2 mt-20.5">
            <Button
              className="h-11 w-32 bg-white text-black border border-[#CBD5E1] text-[16px]"
              type="button"
              onClick={backChange}
            >
              {" "}
              <ChevronLeft /> Back
            </Button>
            <Button className="h-11 w-70 text-[16px]" type="submit">
              {" "}
              Continue 3/3 <ChevronRight />
            </Button>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
