import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { StepProps } from "./SecondInfo";
import z from "zod";

const formSchema = z.object({
  firstname: z
    .string()
    .min(4)
    .regex(/^[a-zA-Z\s]+$/, {
      message: "First name cannot contain special characters or numbers.",
    }),
  lastname: z
    .string()
    .min(4)
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Last name cannot contain special characters or numbers.",
    }),
  username: z.string().min(2, {
    message: "This username is already taken. Please choose another one.",
  }),
});

export const FirstInfo = ({ step, setStep }: StepProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
    },
  });

  console.log(form.formState.errors);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("agadg");
    console.log(values);
    setStep(step + 1);
  }

  return (
    <Card className="h-163.75 w-120 flex flex-col gap-40.5 items-center">
      <CardHeader className="h-96.5 w-104 flex flex-col gap-7 items-center">
        <div className="gap-1.5 flex flex-col w-104">
          <img
            src="./48cbcd1fb0c85cb83db9b8c1218a4675117f8e3f.png"
            className="h-15 w-15"
          ></img>
          <div className="flex flex-col gap-2">
            <h1 className="text-6.5 font-semibold">Join Us! 😎</h1>
            <p className="text-4.5 text-[#8E8E8E]">
              Please provide all current information accurately.
            </p>
          </div>
        </div>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-3.5 font-semibold">
                        First name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Place holder"
                          className="h-11 w-104"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-3.5 font-semibold">
                        Last name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Place holder"
                          className="h-11 w-104"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-3.5 font-semibold">
                        User name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Place holder"
                          className="h-11 w-104"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="h-11 w-104 bg-black text-white text-[16px]"
                >
                  Continue 1/3{" "}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
