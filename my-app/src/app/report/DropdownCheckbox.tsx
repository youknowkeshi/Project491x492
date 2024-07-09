"use client";
import { Button } from "@/components/ui/button";

export function DropdownCheckboxForm() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Outline
    </Button>
  );
}
