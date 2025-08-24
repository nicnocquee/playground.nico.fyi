"use client";

import { ReCaptchaProvider } from "@wojtekmaj/react-recaptcha-v3";

export const RecaptchaProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ReCaptchaProvider
      useEnterprise={false}
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      scriptProps={{
        async: true,
        defer: true,
      }}
    >
      {children}
    </ReCaptchaProvider>
  );
};
