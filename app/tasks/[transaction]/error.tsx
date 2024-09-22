"use client";

import { useState, useEffect } from "react";

const errorMessages = [
  { lang: "English", text: "Internal Server Error" },
  { lang: "German", text: "Interner Serverfehler" },
  { lang: "French", text: "Erreur Interne du Serveur" },
  { lang: "Italian", text: "Errore Interno del Server" },
];

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(error);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % errorMessages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white p-4 text-center">
      <h1 className="mb-8 text-6xl font-bold text-gray-800">500</h1>
      <div className="mb-4 h-8 text-2xl font-semibold text-gray-700">
        {errorMessages[currentIndex].text}
      </div>
    </div>
  );
}
