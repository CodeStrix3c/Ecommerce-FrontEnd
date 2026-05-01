import { useEffect, useRef, useState } from "react";
import { createPhoneSyncConnection, dataUrlToFile } from "../api/phoneSyncService";

function generateSessionId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function usePhoneSync(onImageReceived) {
  const [sessionId] = useState(generateSessionId);
  const [isConnected, setIsConnected] = useState(false);
  const [phoneJoined, setPhoneJoined] = useState(false);
  const callbackRef = useRef(onImageReceived);
  callbackRef.current = onImageReceived;

  useEffect(() => {
    const conn = createPhoneSyncConnection();

    conn.on("DeviceJoined", (device) => {
      if (device?.deviceType === "phone") setPhoneJoined(true);
    });

    conn.on("ImageReceived", (data) => {
      const file = dataUrlToFile(data.dataUrl, data.fileName || "phone-photo.jpg");
      callbackRef.current?.(file);
    });

    conn.onreconnecting(() => setIsConnected(false));
    conn.onreconnected(() => setIsConnected(true));
    conn.onclose(() => setIsConnected(false));

    conn
      .start()
      .then(() => {
        setIsConnected(true);
        return conn.invoke("JoinSession", sessionId, "desktop");
      })
      .catch((err) => console.warn("PhoneSync:", err));

    return () => {
      conn.stop();
    };
  }, [sessionId]);

  return { sessionId, isConnected, phoneJoined };
}
