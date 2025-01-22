import AppStateProvider from "@/providers/AppStateProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SharedLayout from "./SharedLayout";

export default function App(appProps: AppProps) {
  const { Component, pageProps } = appProps;

  return (
    <AppStateProvider>
      <SharedLayout>
        <Component {...pageProps} />
      </SharedLayout>
    </AppStateProvider>
  );
}
