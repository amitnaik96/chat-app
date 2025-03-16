import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/built-ui/theme-provider"
import { Navbar } from '@/components/built-ui/navbar';

export const metadata: Metadata = {
  title: "Chat App",
  description: "get access to quick chat rooms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
            <Navbar />
            {children}
        </ThemeProvider>
        <Toaster/>
      </body>
    </html>
  );
}
