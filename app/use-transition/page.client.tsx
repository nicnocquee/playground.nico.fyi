"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { doSomething } from "./action";
import { doSomething as doSomethingAPI } from "./api/do-something/client";

export default function PageClient({ index }: { index: number }) {
  const [status, setStatus] = useState<"pending" | "success" | "error" | null>(
    null
  );

  const onStatusChange = useCallback(
    (id: string, status: "pending" | "success" | "error" | null) => {
      if (id === index.toString()) {
        setStatus(status);
      }
    },
    [index]
  );

  console.log("status", status, index);

  return (
    <>
      <TheCheckbox index={index} onStatusChange={onStatusChange} />
      <Label
        className="text-3xl w-full bg-gray-100"
        htmlFor={`checkbox-${index}`}
      >
        {`Checkbox ${index}`}
      </Label>
      {status && status === "success" && <p>✅</p>}
      {status && status === "error" && <p>❌</p>}
      {status && status === "pending" && <p>⏳</p>}
    </>
  );
}

const TheCheckbox = ({
  index,
  onStatusChange,
}: {
  index: number;
  onStatusChange: (
    id: string,
    status: "pending" | "success" | "error" | null
  ) => void;
}) => {
  //const { isPending, handleChange } = useSubmitAction(index, onStatusChange);
  //const { isPending, handleChange } = useSubmitAPI(index, onStatusChange);
  const { isPending, handleChange } = useSubmitAPIClient(index, onStatusChange);

  useEffect(() => {
    if (isPending) {
      onStatusChange(index.toString(), "pending");
    }
  }, [isPending, index, onStatusChange]);

  return (
    <Checkbox
      id={`checkbox-${index}`}
      onCheckedChange={handleChange}
      disabled={isPending}
    />
  );
};

const useSubmitAPI = (
  index: number,
  onStatusChange: (
    id: string,
    status: "pending" | "success" | "error" | null
  ) => void
) => {
  const [isPending, setPending] = useState(false);

  const handleChange = useCallback(async () => {
    setPending(true);
    const result = await fetch("/use-transition/api/do-something", {
      method: "POST",
      body: JSON.stringify({ index }),
    });

    const data = await result.json();

    setPending(false);

    onStatusChange(index.toString(), data.status === 1 ? "success" : "error");
  }, [index, onStatusChange]);

  return useMemo(() => {
    return {
      isPending,
      handleChange,
      index,
    };
  }, [isPending, handleChange, index]);
};

const useSubmitAPIClient = (
  index: number,
  onStatusChange: (
    id: string,
    status: "pending" | "success" | "error" | null
  ) => void
) => {
  const [isPending, startTransition] = useTransition();

  const handleChange = useCallback(async () => {
    startTransition(async () => {
      const result = await doSomethingAPI(index.toString());
      const newStatus = result.status === 1 ? "success" : "error";
      onStatusChange(index.toString(), newStatus);
    });
  }, [index, onStatusChange, startTransition]);

  return useMemo(() => {
    return {
      isPending,
      handleChange,
      index,
    };
  }, [isPending, handleChange, index]);
};

const useSubmitAction = (
  index: number,
  onStatusChange: (
    id: string,
    status: "pending" | "success" | "error" | null
  ) => void
) => {
  const [isPending, startTransition] = useTransition();

  const handleChange = useCallback(async () => {
    console.log("handleChange", index);
    startTransition(async () => {
      const result = await doSomething(index.toString());
      const newStatus = result.status === 1 ? "success" : "error";
      console.log("newStatus", newStatus);
      onStatusChange(index.toString(), newStatus);
    });
  }, [index, onStatusChange, startTransition]);

  return useMemo(() => {
    return {
      isPending,
      handleChange,
      index,
    };
  }, [isPending, handleChange, index]);
};
