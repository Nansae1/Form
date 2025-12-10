"use client";

import { useState } from "react";
import { FirstStep } from "./_components/FirstStep";
import { SecondStep, variants } from "./_components/SecondStep";
import { ThirdStep } from "./_components/ThirdStep";
import { Success } from "./_components/Success";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmpass: "",
    datepicker: "",
    uploadimg: "",
  });
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#7F7F800D]">
      <AnimatePresence>
        {step == 1 && (
          <FirstStep
            data={data}
            setData={setData}
            step={step}
            setStep={setStep}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step == 2 && (
          <SecondStep
            step={step}
            setStep={setStep}
            data={data}
            setData={setData}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step == 3 && (
          <ThirdStep
            data={data}
            setData={setData}
            step={step}
            setStep={setStep}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>{step == 4 && <Success />}</AnimatePresence>
    </div>
  );
}
