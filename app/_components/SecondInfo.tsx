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
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z
  .object({
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Please provide a valid email address.",
    }),
    phonenumber: z.string().regex(/^\+?\d{8}$/, {
      message: "Please enter a valid phone number.",
    }),
    password: z.string().min(2, {
      message: "Password must include letters and numbers.",
    }),
    confirmpass: z.string().min(8, { message: "min 8" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmpass;
    },
    {
      message: "Don't match",
      path: ["confirmpass"],
    }
  );

export type StepProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export const SecondInfo = ({ step, setStep }: StepProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phonenumber: "",
      password: "",
      confirmpass: "",
    },
  });

  console.log(form.formState.errors);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("agadg");
    console.log(values);
    setStep(step + 1);
  }

  const backChange = () => {
    setStep(step - 1);
  };

  return (
    <Card className="h-180 w-120 flex flex-col gap-40.5 items-center">
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-3.5 font-semibold">
                        Email *
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
                  name="phonenumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-3.5 font-semibold">
                        Phone number *
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-3.5 font-semibold">
                        Password *
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
                  name="confirmpass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-3.5 font-semibold">
                        Confirm password *
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
                <div className="flex gap-2 mt-20.5">
                  <Button
                    className="h-11 w-32 bg-white text-black border border-[#CBD5E1] text-[16px]"
                    type="button"
                    onClick={backChange}
                  >
                    <ChevronLeft /> Back
                  </Button>
                  <Button className="h-11 w-70 text-[16px]" type="submit">
                    Continue 2/3 <ChevronRight />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
