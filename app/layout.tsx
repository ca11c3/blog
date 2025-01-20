import LayoutWrapper from "@/components/LayoutWrapper";
import type { Metadata } from "next";
import { Paytone_One } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "/fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "/fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

const paytone_one = Paytone_One({
    variable: "--font-paytone-one",
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ChaosAtleast's Blog",
    openGraph: {
        images: [
            {
                url: "https://img-chaosatleast.vercel.app/ChaosAtleast_black.png",
                width: 1200,
                height: 630,
                alt: "ChaosAtleast Logo",
            },
        ],
    },
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${paytone_one.variable} antialiased`}
                style={{
                    overscrollBehavior: "none",
                }}
            >
                <LayoutWrapper>{children}</LayoutWrapper>
            </body>
        </html>
    );
}
