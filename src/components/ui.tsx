import React from "react";

export function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-8">
      <div className="max-w-4xl mx-auto">{children}</div>
    </main>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 hover:border-zinc-700 transition">
      {children}
    </div>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl font-bold tracking-tight">
      {children}
    </h1>
  );
}

export function Subtitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-zinc-400 text-sm">{children}</p>
  );
}

export function Button({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
}) {
  const base =
    "px-4 py-3 rounded-xl font-medium transition w-full";

  const styles: Record<
    "primary" | "secondary" | "danger",
    string
  > = {
    primary: "bg-white text-black hover:opacity-90",
    secondary:
      "border border-zinc-700 text-white hover:border-zinc-500",
    danger: "bg-red-600 text-white hover:opacity-90",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}

export function Input(props: any) {
  return (
    <input
      {...props}
      className="w-full p-4 rounded-xl bg-black border border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-600 outline-none"
    />
  );
}

export function Textarea(props: any) {
  return (
    <textarea
      {...props}
      className="w-full p-4 rounded-xl bg-black border border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-600 outline-none"
    />
  );
}