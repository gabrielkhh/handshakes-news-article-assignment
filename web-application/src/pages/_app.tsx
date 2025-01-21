import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AppStateProvider from "@/providers/AppStateProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SharedLayout from "./SharedLayout";

export default function App(appProps: AppProps) {
  return (
    <AppStateProvider>
      <SharedLayout appProps={appProps} />
    </AppStateProvider>
  );
}
