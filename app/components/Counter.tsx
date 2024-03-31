"use client";

// Import React and necessary components/icons
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React from "react";

// Updated Counter component that accepts count and setCount for external control
export function Counter({
  name,
  count, // Use count prop instead of internal state
  setCount, // Use setCount prop for updating the count
}: {
  name: string;
  count: number; // Ensure you're receiving count as a number
  setCount: React.Dispatch<React.SetStateAction<number>>; // Accept a function to update the count
}) {
  // Function to increase count
  function increase() {
    setCount(count + 1);
  }

  // Function to decrease count, ensuring it does not go below 0
  function decrease() {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={name} value={count} />
      <Button variant="outline" size="icon" type="button" onClick={decrease}>
        <Minus className="h-4 w-4 text-primary" />
      </Button>
      <p className="font-medium text-lg">{count}</p>
      <Button variant="outline" size="icon" type="button" onClick={increase}>
        <Plus className="h-4 w-4 text-primary" />
      </Button>
    </div>
  );
}
