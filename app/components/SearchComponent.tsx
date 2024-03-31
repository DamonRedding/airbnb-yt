"use client"

import { useState } from "react";
import { useCountries } from "../lib/getCountries";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "./SubmitButtons";
import { Counter } from "./Counter";
import { HomeMap } from "./HomeMap";
import { DatePickerWithRange } from "./DateRangePicker";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function SearchModalCompnent() {
  const [step, setStep] = useState(1);
  const [locationValue, setLocationValue] = useState("");
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
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
        <div className="flex items-center justify-center py-6">
          <div className="flex items-center rounded-full bg-white shadow-lg">
            <div className="flex h-full divide-x font-medium">
              <p className="flex items-center justify-center px-6 border-r h-12 text-sm font-medium text-gray-700"> {locationValue || "Anywhere"}</p>
              <p className="flex items-center justify-center px-6 border-r h-12 text-sm font-medium text-gray-700">{dateRange.from ? `Week of ${dateRange.from}` : "Any Week"}</p>
              <p className="flex items-center justify-center px-6 h-12 text-sm font-medium text-gray-700">{`Guests: ${guestCount}, Rooms: ${roomCount}, Bathrooms: ${bathroomCount}`}</p>
            </div>
            <Search className="flex items-center justify-center rounded-full bg-[#ff385c] p-3 ml-2 text-white" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[350px]">
        <form className="gap-2 flex flex-col">
          <input type="hidden" name="country" value={locationValue} />
          {step === 1 ? (
            <>
              <CardHeader>
                <CardTitle>Select a Country</CardTitle>
                <CardDescription>Please choose a country you want to visit.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-1.5">
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
                </div>
              </CardContent>
            </>
          ) : step === 2 ? (
            <>
              <CardHeader>
                <CardTitle>Select Dates</CardTitle>
                <CardDescription>Please select your check-in and check-out dates.</CardDescription>
              </CardHeader>
              <DatePickerWithRange dateRange={dateRange} onDateChange={(range: DateRange | undefined) => setDateRange(range)} />
            </>
          ) : (
            <>
              <CardTitle>Guests</CardTitle>
              <CardDescription>
                How many guests do you want?
              </CardDescription>
              <Counter name="guest" count={guestCount} setCount={setGuestCount} />
              <Separator />
              <CardTitle>Rooms</CardTitle>
              <CardDescription>
                How many rooms do you need?
              </CardDescription>
              <Counter name="room" count={roomCount} setCount={setRoomCount} />
              <Separator />
              <CardTitle>Bathrooms</CardTitle>
              <CardDescription>
                How many bathrooms do you need?
              </CardDescription>
              <Counter name="bathroom" count={bathroomCount} setCount={setBathroomCount} />
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