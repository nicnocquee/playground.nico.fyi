"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { urlSearchParamsToObject, usePushRoute } from "use-push-router";

export default function SearchParamsDemo() {
  const { pushSearchParams, searchParams } = usePushRoute();
  const [newKey, setNewKey] = useState("");
  const [newValues, setNewValues] = useState<string[]>([""]);

  const obj = urlSearchParamsToObject(searchParams);
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 p-4">
      <div className="flex flex-col space-y-2">
        {Object.entries(obj).map(([key, value], i) => (
          <div key={i}>
            <KeyValueInput theKey={key} value={value} />
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row items-center space-x-2">
          <Label htmlFor="newKey">key</Label>
          <Input
            value={newKey}
            placeholder="key"
            onChange={(e) => setNewKey(e.target.value)}
          />
        </div>
        <div>
          {newValues.map((nv, i) => {
            return (
              <div key={i} className="flex flex-row items-center space-x-2">
                <Label htmlFor="newValue">value</Label>
                <Input
                  value={nv}
                  placeholder="value"
                  onChange={(e) => {
                    setNewValues((prev) => {
                      const newValues = [...prev];
                      newValues[i] = e.target.value;
                      return newValues;
                    });
                  }}
                />
              </div>
            );
          })}
          <Button
            onClick={() => {
              setNewValues((prev) => [...prev, ""]);
            }}
          >
            Add
          </Button>
        </div>
        <Button
          onClick={() => {
            pushSearchParams({
              add: {
                [newKey]: newValues,
              },
            });
            setNewKey("");
            setNewValues([""]);
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

function KeyValueInput({
  theKey,
  value,
}: {
  theKey: string;
  value: string | string[];
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Input placeholder="key" value={theKey} disabled={true} />
      {typeof value === "string" ? (
        <ValueInput key={theKey} theKey={theKey} value={value} />
      ) : (
        <div className="flex flex-col space-y-2">
          {value.map((v, i) => {
            return <ValueInput key={i} theKey={theKey} value={v} />;
          })}
        </div>
      )}
    </div>
  );
}

function ValueInput({ theKey, value }: { theKey: string; value: string }) {
  const { pushSearchParams } = usePushRoute();
  const [newValue, setValue] = useState(value);
  return (
    <div className="flex flex-row space-x-2">
      <Input
        placeholder="value"
        value={newValue}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        variant={"ghost"}
        onClick={() => {
          pushSearchParams({ remove: { [theKey]: value } });
        }}
      >
        <XIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={"ghost"}
        onClick={() => {
          pushSearchParams({ set: { [theKey]: newValue } });
        }}
      >
        <CheckIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
