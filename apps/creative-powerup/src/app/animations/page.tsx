"use client";

import React from "react";
import FibonacciAnimation from "@/components/FibonacciAnimation";

export default function AnimationsPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 space-y-8">
      <h1 className="text-3xl font-bold">Creative Sandbox</h1>

      {/* Animation Test Container 1 */}
     {/* Fibonacci Dot Growth Animation */}
    <section className="border p-4 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-2">Fibonacci Growth</h2>
    <div className="flex justify-center items-center">
        <FibonacciAnimation />
    </div>
</section>

    </main>
  );
}