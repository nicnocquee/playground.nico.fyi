import Form from "./form";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-start space-y-2 text-center p-4">
      After clicking Submit, this browser&apos;s IP address will be added to the
      payload.
      <Form />
    </div>
  );
}
