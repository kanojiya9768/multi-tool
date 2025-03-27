"use client";
import React from "react";
import { Navbar } from "../layouts/Navbar";
import { Footer } from "react-day-picker";
import { useRouter } from "next/navigation";

const OfflinePage = () => {
  const { refresh } = useRouter();
  return (
    <div>
      <Navbar />
      <div class="text-center fade-in bg-black h-screen flex flex-col justify-center items-center text-white">
        <img
          src="/offline.jpg"
          alt="logo-multitool"
          className="sm:w-[230px] w-[150px]"
        />
        <h1 class="text-4xl font-bold mb-2">You are Offline</h1>
        <p class="text-lg mb-6">
          It seems you have lost your internet connection. Please check your
          connection and try again.
        </p>
        <button
          onClick={refresh}
          class="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300"
        >
          <i class="fas fa-redo-alt mr-2"></i>
          Retry
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default OfflinePage;
