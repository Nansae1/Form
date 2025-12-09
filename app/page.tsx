"use client";

import { useState } from "react";
import { FirstStep } from "./_components/FirstStep";
import { SecondStep } from "./_components/SecondStep";
import { ThirdStep } from "./_components/ThirdStep";
import { Success } from "./_components/Success";

export default function Home() {
  const [step, setStep] = useState(1);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#7F7F800D]">
      {step == 1 && <FirstStep step={step} setStep={setStep} />}
      {step == 2 && <SecondStep step={step} setStep={setStep} />}
      {step == 3 && <ThirdStep step={step} setStep={setStep} />}
      {step == 4 && <Success step={step} setStep={setStep} />}
    </div>
  );
}
