import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex font-[family-name:var(--font-geist-sans)] gap-3 h-screen`}
    >
      <div className="bg-red-300 w-full h-10">Test</div>
    </div>
  );
}
