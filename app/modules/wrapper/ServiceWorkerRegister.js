"use client";
import React, { useEffect, useState } from "react";
import OfflinePage from "../constant/OfflinePage";

const ServiceWorkerRegister = ({ children }) => {
  const [isOnline, setIsOnline] = useState("loading");

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js");
      });
    }

    const handleOnline = () => setIsOnline("online");
    const handleOffline = () => setIsOnline("offline");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    setIsOnline(navigator.onLine ? "online" : "offline");

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline == "loading") {
    return (
      <div className="fixed w-full h-full overflow-hidden bg-black grid place-items-center">
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }

  if (isOnline == "offline") {
    return <OfflinePage />;
  }

  if (isOnline == "online") {
    return <>{children}</>;
  }
};

export default ServiceWorkerRegister;
