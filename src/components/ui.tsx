import React from "react";

export function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {children}
      </div>
    </main>
  );
}

export function Header({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10">
      <h1 className="text-4xl font-semibold tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-zinc-500 mt-2 text-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Card({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-600 hover:bg-zinc-900/40"
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-lg font-medium">
      {children}
    </h2>
  );
}

export function CardDesc({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-sm text-zinc-500 mt-1">
      {children}
    </p>
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
  const styles = {
    primary:
      "bg-white text-black hover:bg-zinc-200",
    secondary:
      "border border-zinc-700 text-white hover:border-zinc-500",
    danger:
      "bg-red-600 text-white hover:bg-red-500",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 rounded-xl font-medium transition ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export function Input(props: any) {
  return (
    <input
      {...props}
      className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-500 outline-none"
    />
  );
}

export function Textarea(props: any) {
  return (
    <textarea
      {...props}
      className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-500 outline-none"
    />
  );
}