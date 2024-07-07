"use client";

import { Button } from "@/components/ui/button";
import { useId } from "react";
import { useFormState, useFormStatus } from "react-dom";

export const FormButton = ({
  title,
  action,
  children,
}: {
  title: string;
  action: any;
  children?: React.ReactNode;
}) => {
  const [, submit] = useFormState(action, null);
  const formId = useId();
  return (
    <form id={formId} action={submit}>
      {children}
      <FormButtonContent formId={formId} title={title} />
    </form>
  );
};

const FormButtonContent = ({
  title,
  formId,
}: {
  title: string;
  formId: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      form={formId}
      disabled={pending}
      type="submit"
      className="bg-primary text-primary-foreground hover:bg-primary/80 py-2 px-4 rounded-md disabled:bg-muted-foreground"
    >
      {title}
    </Button>
  );
};
