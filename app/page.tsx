"use client";

import { useState } from "react";
import { FirstInfo } from "./_components/FirstInfo";
import { SecondInfo } from "./_components/SecondInfo";
import { ThirdInfo } from "./_components/ThirdInfo";

export default function Home() {
  const [step, setStep] = useState(1);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {step == 1 && <FirstInfo step={step} setStep={setStep} />}
      {step == 2 && <SecondInfo step={step} setStep={setStep} />}
      {step == 3 && <ThirdInfo />}
    </div>
  );
}
