import type { Metadata } from "next";
import { SITE_NAME } from "@/configs";
import { Roboto } from "next/font/google";
import { CommonStoreProvider } from "@/store";
import "./global.scss";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: SITE_NAME,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <CommonStoreProvider>
          {children}
        </CommonStoreProvider>
      </body>
    </html>
  );
}