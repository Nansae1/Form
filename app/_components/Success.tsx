import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StepProps } from "./SecondStep";

export const Success = ({ step, setStep }: StepProps) => {
  return (
    <Card className="w-120 h-48.25 flex items-center justify-center">
      <CardContent className="flex flex-col gap-2 w-104">
        <img
          src="./48cbcd1fb0c85cb83db9b8c1218a4675117f8e3f.png"
          className="h-15 w-15"
        />
        <p className="text-[26px] font-semibold">You're All Set 🔥</p>
        <p className="text-[14px] text-[#8E8E8E]">
          We have received your submission. Thank you!
        </p>
      </CardContent>
    </Card>
  );
};
