"use client";

import {
  ChangeEvent,
  useCallback,
  useState,
  useSyncExternalStore,
} from "react";
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
  const [data, setData, isServer] =
    useLocalStorageThatWithoutUseStateWithoutFlashing("data", {
      name: "",
      project: "",
      darkMode: "false",
      updatedAt: new Date(),
    });

  return (
    <div>
      <Card
        data-server={isServer}
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
                data-server={isServer}
                className=" data-[server=true]:opacity-0 data-[server=true]:placeholder:opacity-0 opacity-100 placeholder:opacity-100 bg-white"
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
              <div
                data-server={isServer}
                className=" data-[server=true]:opacity-0 data-[server=true]:placeholder:opacity-0 opacity-100 placeholder:opacity-100 bg-white"
              >
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
          <p>Last updated: {data.updatedAt.toDateString()}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

const useLocalStorageThatDoesntRerenderOnChange = <T,>(
  key: string,
  initialValue: T
) => {
  const stringFromLocalStorage = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("storage", onChange);
      return () => {
        window.removeEventListener("storage", onChange);
      };
    },
    () => {
      const data = localStorage.getItem(key);
      return data;
    },
    () => (initialValue ? JSON.stringify(initialValue) : null)
  );

  const setData = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  const data = stringFromLocalStorage
    ? (JSON.parse(stringFromLocalStorage, (_key, value) => {
        if (!isNaN(Date.parse(value))) {
          return new Date(value);
        } else {
          return value;
        }
      }) as T)
    : initialValue;

  return [data, setData] as const;
};

const useLocalStorageThatWithoutUseState = <T,>(
  key: string,
  initialValue: T
) => {
  const stringFromLocalStorage = useSyncExternalStore(
    (onChange) => {
      const onStorageEvent = (e: Event) => {
        const customEvent = e as CustomEvent;
        if (customEvent.detail.key === key) {
          onChange();
        }
      };
      window.addEventListener(
        "local-storage-change",
        onStorageEvent as EventListener
      );
      return () => {
        window.removeEventListener(
          "local-storage-change",
          onStorageEvent as EventListener
        );
      };
    },
    () => {
      const data = localStorage.getItem(key);
      return data;
    },
    () => (initialValue ? JSON.stringify(initialValue) : null)
  );

  const setData = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(
        new CustomEvent("local-storage-change", { detail: { key } })
      );
    },
    [key]
  );

  const data = stringFromLocalStorage
    ? (JSON.parse(stringFromLocalStorage, (_key, value) => {
        if (!isNaN(Date.parse(value))) {
          return new Date(value);
        } else {
          return value;
        }
      }) as T)
    : initialValue;

  return [data, setData] as const;
};

const useLocalStorageThatWithoutUseStateWithoutFlashing = <T,>(
  key: string,
  initialValue: T
) => {
  const isServer = useSyncExternalStore(
    () => () => {},
    () => "false",
    () => "true"
  );
  const stringFromLocalStorage = useSyncExternalStore(
    (onChange) => {
      const onStorageEvent = (e: Event) => {
        const customEvent = e as CustomEvent;
        if (customEvent.detail.key === key) {
          onChange();
        }
      };
      window.addEventListener(
        "local-storage-change",
        onStorageEvent as EventListener
      );
      return () => {
        window.removeEventListener(
          "local-storage-change",
          onStorageEvent as EventListener
        );
      };
    },
    () => {
      const data = localStorage.getItem(key);
      return data;
    },
    () => (initialValue ? JSON.stringify(initialValue) : null)
  );

  const setData = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(
        new CustomEvent("local-storage-change", { detail: { key } })
      );
    },
    [key]
  );

  const data = stringFromLocalStorage
    ? (JSON.parse(stringFromLocalStorage, (_key, value) => {
        if (!isNaN(Date.parse(value))) {
          return new Date(value);
        } else {
          return value;
        }
      }) as T)
    : initialValue;

  return [data, setData, isServer] as const;
};

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [internalState, setInternalState] = useState<T>(() => {
    const data = localStorage.getItem(key);
    return data
      ? (JSON.parse(data, (_key, value) => {
          if (!isNaN(Date.parse(value))) {
            return new Date(value);
          } else {
            return value;
          }
        }) as T)
      : initialValue;
  });

  const stringFromLocalStorage = useSyncExternalStore(
    (onChange) => {
      const listener = (event: StorageEvent) => {
        if (event.key === key) {
          onChange();
        }
      };
      window.addEventListener("storage", listener);
      return () => {
        window.removeEventListener("storage", listener);
      };
    },
    () => {
      const data = localStorage.getItem(key);
      return data;
    },
    () => (initialValue ? JSON.stringify(initialValue) : null)
  );

  const setData = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
      setInternalState(value);
    },
    [key]
  );

  const data = stringFromLocalStorage
    ? (JSON.parse(stringFromLocalStorage, (_key, value) => {
        if (!isNaN(Date.parse(value))) {
          return new Date(value);
        } else {
          return value;
        }
      }) as T)
    : internalState;

  return [data, setData] as const;
};
