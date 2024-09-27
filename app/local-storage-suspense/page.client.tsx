"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export const LocalStorageDemo = () => {
  const [data, setData] = useState<{
    name: string;
    project: string;
    darkMode: string;
    updatedAt: Date | null;
  }>({
    name: "",
    project: "",
    darkMode: "false",
    updatedAt: null,
  });

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      setData(
        JSON.parse(data, (_key, value) => {
          if (!isNaN(Date.parse(value))) {
            return new Date(value);
          } else {
            return value;
          }
        })
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <div>
      <Card
        data-dark={data.darkMode}
        className="w-[350px] data-[dark=true]:bg-slate-800 bg-white data-[dark=true]:text-white"
      >
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of your project"
                defaultValue={data.name}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setData({
                    ...data,
                    name: event.target.value,
                    updatedAt: new Date(),
                  });
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <div>
                <Select
                  value={data.project}
                  onValueChange={(value) => {
                    setData({ ...data, project: value, updatedAt: new Date() });
                  }}
                >
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                checked={data.darkMode === "true"}
                onCheckedChange={(checked) => {
                  setData({
                    ...data,
                    darkMode: checked ? "true" : "false",
                    updatedAt: new Date(),
                  });
                }}
              />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col [&_*]:w-full text-sm text-muted-foreground">
          <p>Data is automatically saved to local storage.</p>
          <p>Last updated: {data.updatedAt?.toISOString()}</p>
        </CardFooter>
      </Card>
    </div>
  );
};
