import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* background system */}
        <div className="bg-blur">
          <div className="blob blob1" />
          <div className="blob blob2" />
        </div>

        {/* app container */}
        <div className="min-h-screen flex justify-center px-4 py-10">
          <div className="w-full max-w-5xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}