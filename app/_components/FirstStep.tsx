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
import { useForm } from "react-hook-form";
import { StepProps, variants } from "./SecondStep";
import z from "zod";
import { Header } from "./Header";
import { motion } from "framer-motion";

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

export const FirstStep = ({ step, setStep }: StepProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("agadg");
    console.log(values);
    setStep(step + 1);
  }

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
    >
      <Card className="h-163.75 w-120 flex flex-col gap-40.5 items-center">
        <CardHeader className="h-96.5 w-104 flex flex-col gap-7 items-center">
          <Header />
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
                    className="mt-22 h-11 w-104 bg-black text-white text-[16px]"
                  >
                    Continue 1/3{" "}
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </motion.div>
  );
};
