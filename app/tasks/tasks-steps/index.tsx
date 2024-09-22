"use client";

import { cn } from "@/lib/utils";
import { Check, Loader2, XCircle } from "lucide-react";
import { Suspense, use } from "react";
import { ErrorBoundary } from "react-error-boundary";

type StepStatus = "done" | "in-progress" | "waiting" | "error";

type Step = {
  title: string;
  description?: string;
  work: Promise<any>;
};

type StepProps = Step & {
  isLast?: boolean;
};

function StepIcon({ status }: { status: StepStatus }) {
  switch (status) {
    case "done":
      return <Check className="h-5 w-5 text-green-500 dark:text-green-400" />;
    case "in-progress":
      return (
        <Loader2 className="h-5 w-5 animate-spin text-blue-500 dark:text-blue-400" />
      );
    case "error":
      return <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />;
  }
}

export function StepComponent({
  title,
  description,
  work,
  isLast = false,
}: StepProps) {
  return (
    <li className={`ml-6 ${isLast ? "" : "mb-10"}`}>
      <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-white ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
        <ErrorBoundary fallback={<StepIcon status={"error"} />}>
          <Suspense fallback={<StepIcon status={"in-progress"} />}>
            <Asyncable work={work}>
              <StepIcon status={"done"} />
            </Asyncable>
          </Suspense>
        </ErrorBoundary>
      </span>
      <ErrorBoundary FallbackComponent={stepErrorWithTitle(title)}>
        <Suspense fallback={<Title disabled={true}>{title}</Title>}>
          <Asyncable work={work}>
            <Title>{title}</Title>
          </Asyncable>
        </Suspense>
      </ErrorBoundary>
      {description ? <p className="text-sm">{description}</p> : null}
    </li>
  );
}

function stepErrorWithTitle(title: string) {
  function StepErrorComponentWithTitle(props: any) {
    return <StepErrorComponent {...props} title={title} />;
  }
  return StepErrorComponentWithTitle;
}

function StepErrorComponent({
  error,
  title,
}: {
  error: Error & { digest?: string };
  resetErrorBoundary: () => void;
  title: string;
}) {
  return (
    <div>
      <Title disabled={true}>{title}</Title>
      <p className="text-sm text-red-400">{error.message}</p>
    </div>
  );
}

const Asyncable = ({
  work,
  children,
}: {
  work: Promise<any>;
  children: React.ReactNode;
}) => {
  use(work);

  return <>{children}</>;
};

const Title = ({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) => {
  return (
    <h3
      className={cn(
        `font-medium leading-tight text-green-500 dark:text-green-400`,
        disabled && "text-gray-500"
      )}
    >
      {children}
    </h3>
  );
};

export function VerticalSteps({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-md">
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        {children}
      </ol>
    </div>
  );
}
