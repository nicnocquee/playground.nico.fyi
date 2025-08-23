import Form from "./form";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-start space-y-2 text-center p-4">
      Try entering a name with numbers in it.
      <Form />
    </div>
  );
}
