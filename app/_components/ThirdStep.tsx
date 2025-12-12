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
import { CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Header } from "./Header";
import { StepProps, variants } from "./SecondStep";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";
import { StepContext } from "../page";

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

const formSchema = z.object({
  datepicker: z
    .date("Please select a date")
    .refine((date) => date <= eighteenYearsAgo, {
      message: "You must be 18 years or older.",
    }),
  uploadimg: z.file().optional(),
});

export const ThirdStep = () => {
  const { data, handleNext, handleBack, setData } = useContext(StepContext);

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      datepicker: data.datepicker,
      uploadimg: data.uploadimg,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    form.setValue("uploadimg", file);
  };
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("agadg");
    console.log(values);
    localStorage.setItem(
      "ThirdStep",
      JSON.stringify({ datepicker: values.datepicker.toISOString() })
    );
    setData((prev) => ({
      ...prev,
      datepicker: values.datepicker,
      uploadimg: values.uploadimg,
    }));
    handleNext();
  };

  const a = form.watch();

  console.log(a);

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
    >
      <Card className="h-163 w-120 flex flex-col gap-40.5 items-center">
        <CardHeader className="h-96.5 w-104 flex flex-col gap-7 items-center">
          <Header />
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 w-104">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
                  <FormField
                    control={form.control}
                    name="datepicker"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="date"
                          className="text-[14px] font-semibold"
                        >
                          Date of birth *
                        </FormLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date"
                              className="w-104 justify-between font-normal "
                            >
                              {field.value
                                ? new Date(field.value).toISOString()
                                : "--/--/--"}
                              <CalendarIcon className="text-black h-3 w-3" />
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
                                if (!date) return;
                                form.setValue("datepicker", date);
                                // field.onChange(date);
                                setOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="uploadimg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[14px] font-semibold">
                          Profile image *
                        </FormLabel>
                        <FormControl className="flex flex-col">
                          <button
                            type="button"
                            className="h-45 w-104 bg-[#7F7F800D] rounded-md relative flex justify-center items-center"
                          >
                            <img src="/image.png" className="h-3 w-3" />
                            Add image
                            <input
                              type="file"
                              onChange={handleFileChange}
                              className="opacity-0 absolute top-0 left-0 h-full w-full"
                            />
                            {field.value && (
                              <img
                                src={URL.createObjectURL(field.value)}
                                className="absolute top-0 left-0 h-full w-full object-cover rounded-md"
                              />
                            )}
                            {field.value && (
                              <X
                                onClick={() => {
                                  form.setValue("uploadimg", undefined);
                                }}
                                className="h-6 w-6 rounded-xl bg-[#202124] text-white absolute top-4 right-4"
                              />
                            )}
                          </button>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2 mt-15">
                    <Button
                      className="h-11 w-32 bg-white text-black border border-[#CBD5E1] text-[16px]"
                      type="button"
                      onClick={handleBack}
                    >
                      {" "}
                      <ChevronLeft /> Back
                    </Button>
                    <Button className="h-11 w-70 text-[16px]" type="submit">
                      Continue 3/3 <ChevronRight />
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </motion.div>
  );
};
