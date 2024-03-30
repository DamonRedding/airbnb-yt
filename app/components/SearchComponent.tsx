"use client"

import { useState } from "react";
import { useCountries } from "../lib/getCountries"; // Ensure this hook is correctly implemented to fetch countries
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "./SubmitButtons"; // This should be a component for submitting the form
import { Counter } from "./Counter"; // Ensure this component exists for counting guests, rooms, etc.
import { HomeMap } from "./HomeMap"; // A component to display the selected location on a map
import { DatePickerWithRange } from "./DateRangePicker"; // Make sure the DateRangePicker component is imported correctly
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function SearchModalCompnent() {
  const [step, setStep] = useState(1);
  const [locationValue, setLocationValue] = useState("");
  const { getAllCountries } = useCountries();

  function SubmitButtonLocal() {
    if (step === 1 || step === 2) {
      return (
        <Popover>
          <PopoverTrigger>
            <Button onClick={() => setStep(step + 1)} type="button">
              Next
            </Button>
          </PopoverTrigger>
        </Popover>
      );
    } else if (step === 3) {
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
              <p>Please Choose a Country</p>
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
          ) : step === 2 ? (
            <>
              <h2>Select Dates</h2>
              <p>Please select your check-in and check-out dates.</p>
              <DatePickerWithRange />
            </>
          ) : (
            <>
              <h2>Select all the info you need</h2>
              <p>Please Choose what you need</p>
              <CardTitle>Guests</CardTitle>
              <CardDescription>
                How many guests do you want?
              </CardDescription>
              <Counter name="guest" />
              <Separator />
              <CardTitle>Rooms</CardTitle>
              <CardDescription>
                How many rooms do you need?
              </CardDescription>
              <Counter name="room" />
              <Separator />
              <CardTitle>Bathrooms</CardTitle>
              <CardDescription>
                How many bathrooms do you need?
              </CardDescription>
              <Counter name="bathroom" />
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