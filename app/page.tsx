"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FirstStep } from "./_components/FirstStep";
import { SecondStep, variants } from "./_components/SecondStep";
import { ThirdStep } from "./_components/ThirdStep";
import { Success } from "./_components/Success";
import { AnimatePresence, motion } from "framer-motion";

type StepContextType = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  handleNext: () => void;
  handleBack: () => void;
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
};

export const StepContext = createContext<StepContextType>(
  {} as StepContextType
);

export type Data = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phonenumber: string;
  password: string;
  confirmpass: string;
  datepicker: Date;
  uploadimg?: File;
};

const initValue = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  phonenumber: "",
  password: "",
  confirmpass: "",
  datepicker: new Date(),
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [isReady, setIsReady] = useState(false);

  const [data, setData] = useState<Data>(initValue);

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    const saved = localStorage.getItem("data");
    const savedData = JSON.parse(saved ?? JSON.stringify(initValue));
    setData({
      ...savedData,
      datepicker: new Date(savedData.datepicker),
    });
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem("data", JSON.stringify(data));
  }, [data, isReady]);

  if (!isReady) return null;

  return (
    <StepContext.Provider
      value={{ setStep, handleNext, handleBack, data, setData, step }}
    >
      <div className="h-screen w-screen flex justify-center items-center bg-[#7F7F800D]">
        <AnimatePresence>{step == 1 && <FirstStep />}</AnimatePresence>
        <AnimatePresence>{step == 2 && <SecondStep />}</AnimatePresence>
        <AnimatePresence>{step == 3 && <ThirdStep />}</AnimatePresence>
        <AnimatePresence>{step == 4 && <Success />}</AnimatePresence>
      </div>
    </StepContext.Provider>
  );
}
