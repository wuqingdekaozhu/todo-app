import React from "react";
import type { Metadata } from "next";
import "./globals.css";


// application metadata
export const metadata: Metadata = {
  title: "To-do App",
  description: "A simple to-do app",
};


// root layout component
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;