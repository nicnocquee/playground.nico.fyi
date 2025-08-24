import Form from "./form";
import { RecaptchaProvider } from "./recaptcha-provider";

export default function Page() {
  return (
    <RecaptchaProvider>
      <div className="flex flex-col items-center justify-start space-y-2 text-center p-4">
        This form uses the reCAPTCHA v3 API to verify the user is human.
        <Form />
      </div>
    </RecaptchaProvider>
  );
}
