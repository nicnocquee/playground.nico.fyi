"use client";

import { useEffect, useState, useEffectEvent } from "react";

const createConnection = (serverUrl: string, roomId: string) => {
  return {
    on: (eventName: string, callback: () => void) => {
      console.log(
        `Event ${eventName} occurred: ${serverUrl} and roomId: ${roomId}`
      );
      callback();
    },
    connect: () => {
      console.log(`Connected to server: ${serverUrl} and roomId: ${roomId}`);
    },
    disconnect: () => {
      console.log(
        `Disconnected from server: ${serverUrl} and roomId: ${roomId}`
      );
    },
  };
};

const serverUrl = "wss://example.com";
const roomIds = ["123", "456", "789"];
const themes = ["light", "dark"];

const showNotification = (message: string, theme: string) => {
  console.log(`Notification: ${message} with theme: ${theme}`);
};

export default function Page() {
  const [theme, setTheme] = useState<string>(themes[0] || "");
  const [roomId, setRoomId] = useState<string>(roomIds[0] || "");

  const notify = useEffectEvent((message: string) => {
    showNotification(message, theme);
  });
  /* 
  const onConnected = (message: string = "Connected!") => {
    showNotification(message, theme);
  };
  */

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on("connected", () => notify("Connected!"));
    connection.connect();

    const timer = setInterval(() => {
      notify("Timer");
    }, 5000);
    return () => {
      connection.disconnect();
      clearInterval(timer);
    };
  }, [roomId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {themes.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
      <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
        {roomIds.map((roomId) => (
          <option key={roomId} value={roomId}>
            {roomId}
          </option>
        ))}
      </select>
      {/* <ChatRoom serverUrl={serverUrl} roomId={roomId} theme={theme} /> */}
      {`ChatRoom: ${serverUrl} and roomId: ${roomId} and theme: ${theme}`}
    </div>
  );
}
