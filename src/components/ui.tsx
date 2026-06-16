
import React from "react";

export function Page({ children }: any) {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">{children}</div>
    </main>
  );
}

export function Header({ title, subtitle }: any) {
  return (
    <div className="mb-12">
      <h1 className="text-5xl font-semibold tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-zinc-500 mt-3 text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Card({ children, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="
        relative overflow-hidden
        rounded-2xl p-6
        border border-zinc-800
        bg-gradient-to-b from-zinc-950 to-black
        transition duration-300
        hover:scale-[1.02]
        hover:border-zinc-600
        hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]
        cursor-pointer
      "
    >
      {/* glow overlay */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-white/5" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function CardTitle({ children }: any) {
  return (
    <h2 className="text-lg font-medium text-white">
      {children}
    </h2>
  );
}

export function CardDesc({ children }: any) {
  return (
    <p className="text-sm text-zinc-500 mt-2">
      {children}
    </p>
  );
}

export function Button({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="
        px-5 py-3 rounded-xl
        bg-white text-black font-medium
        hover:bg-zinc-200
        transition
      "
    >
      {children}
    </button>
  );
}

export function Input(props: any) {
  return (
    <input
      {...props}
      className="
        w-full p-4 rounded-xl
        bg-zinc-950
        border border-zinc-800
        text-white
        placeholder-zinc-600
        focus:border-white
        outline-none
      "
    />
  );
}