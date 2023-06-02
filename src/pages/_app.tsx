import ThemeStateProvider from "@/context/themeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeStateProvider>
      <Component {...pageProps} />
    </ThemeStateProvider>
  );
}
