"use client"; 

import { useEffect } from "react";
import NavBar from "./ui/components/navbar";

export default function Error({
    error,
    reset
} : {error: Error & { digest?: string };
    reset: () => void;}){

        return (
            <main className="flex h-full flex-col items-center justify-center">
                <NavBar />
              <h2 className="text-center">Something went wrong!</h2>
              <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={
                  // Attempt to recover by trying to re-render the invoices route
                  () => reset()
                }
              >
                Try again
              </button>
            </main>
          );

}