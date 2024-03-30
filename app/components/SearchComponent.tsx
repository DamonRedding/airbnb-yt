"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator"

import { Search } from "lucide-react";
import { useState } from "react";
import { useCountries } from "../lib/getCountries";
import { HomeMap } from "./HomeMap";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "./SubmitButtons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Counter } from "./Counter";

export function SearchModalCompnent() {
  const [step, setStep] = useState(1);
  const [locationValue, setLocationValue] = useState("");
  const { getAllCountries } = useCountries();

  function SubmitButtonLocal() {
    if (step === 1) {
      return (
        <Popover>
          <PopoverTrigger>
            <Button onClick={() => setStep(step + 1)} type="button">
              Next
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {/* Place the content that was previously in the Dialog here */}
          </PopoverContent>
        </Popover>
      );
    } else if (step === 2) {
      return <CreationSubmit />;
    }
  }
  return (
    <Popover>
      <PopoverTrigger>
        <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
          <div className="flex h-full divide-x font-medium">
            <p className="px-4">Anywhere</p>
            <p className="px-4">Any Week</p>
            <p className="px-4">Add Guests</p>
          </div>
  
          <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="sm:max-w-[425px]">
        <form className="gap-4 flex flex-col">
          <input type="hidden" name="country" value={locationValue} />
          {step === 1 ? (
            <>
              <h2>Select a Country</h2>
              <p>Pleae Choose a Country, so that what you want</p>
  
              <Select
                required
                onValueChange={(value) => setLocationValue(value)}
                value={locationValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {getAllCountries().map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.flag} {item.label} / {item.region}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <HomeMap locationValue={locationValue} />
            </>
          ) : (
            <>
              <h2>Select all the info you need</h2>
              <p>Pleae Choose a Country, so that what you want</p>
  
              {/* <Card> */}
  {/* <CardHeader className="flex flex-col gap-y-5"> */}
    <CardTitle>Guests</CardTitle>
    <CardDescription>
      How many guests do you want?
    </CardDescription>
    <Counter name="guest" />
  {/* </CardHeader> */}

  <Separator />

  {/* <CardContent className="flex items-center justify-between"> */}
    <CardTitle>Rooms</CardTitle>
    <CardDescription>
      How many rooms do you have?
    </CardDescription>
    <Counter name="room" />
  {/* </CardContent> */}
  
  <Separator />

  {/* <CardContent className="flex items-center justify-between"> */}
    <CardTitle>Bathrooms</CardTitle>
    <CardDescription>
      How many bathrooms do you have?
    </CardDescription>
    <Counter name="bathroom" />
  {/* </CardContent> */}
{/* </Card> */}
            </>
          )}
  
          <div>
            <SubmitButtonLocal />
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
