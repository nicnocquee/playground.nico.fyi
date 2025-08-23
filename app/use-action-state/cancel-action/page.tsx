import Form from "./form";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-start space-y-2 text-center p-4">
      Try entering different names in the two fields.
      <Form />
    </div>
  );
}
