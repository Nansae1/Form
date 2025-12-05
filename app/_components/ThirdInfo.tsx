import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar, CalendarIcon, ChevronDownIcon } from "lucide-react";
import React from "react";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export const ThirdInfo = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("In 2 days");
  const [date, setDate] = React.useState<Date | undefined>(new Date(value));
  const [month, setMonth] = React.useState<Date | undefined>(date);
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
          <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
              Date of birth
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
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
        </CardContent>
      </CardHeader>
    </Card>
  );
};
