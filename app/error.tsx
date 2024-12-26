"use client"; 

import { useEffect } from "react";
import NavBar from "./ui/components/navbar";

export default function Error({
    error,
    reset
} : {error: Error & { digest?: string };
    reset: () => void;}){

        useEffect(() => {
            // Optionally log the error to an error reporting service
            console.error(error);
          }, [error]);

        return (
        <main className="flex flex-col items-center justify-center h-screen">
            <NavBar />
            <h2 className="text-center text-lg font-semibold text-gray-700">
                Something went wrong!
            </h2>
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