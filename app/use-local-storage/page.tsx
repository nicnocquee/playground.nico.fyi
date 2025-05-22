"use client";

import { useLocalStorage } from "@nicnocquee/use-local-storage-hook";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const Counter = () => {
  const [value, setValue, clearValue] = useLocalStorage<number>("counter", 0);

  const valueToDisplay = value === undefined ? "Undefined" : value;

  return (
    <Card className="w-full max-w-xs mx-auto mt-10">
      <CardHeader>
        <CardTitle>Counter Demo (LocalStorage)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <span className="text-5xl font-bold" data-testid="counter-value">
            {valueToDisplay}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-between gap-2">
        <Button
          variant="outline"
          onClick={() => setValue((value ?? 0) - 1)}
          aria-label="Decrement"
        >
          -
        </Button>
        <Button
          variant="secondary"
          onClick={() => setValue(0)}
          aria-label="Reset to zero"
        >
          Reset
        </Button>
        <Button
          onClick={() => setValue((value ?? 0) + 1)}
          aria-label="Increment"
        >
          +
        </Button>
        <Button
          variant="destructive"
          onClick={clearValue}
          aria-label="Clear from storage"
        >
          Clear
        </Button>
      </CardFooter>
    </Card>
  );
};

const UseLocalStoragePage = () => {
  return <Counter />;
};

export default UseLocalStoragePage;
