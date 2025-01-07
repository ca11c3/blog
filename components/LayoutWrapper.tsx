"use client";
import React, { createContext, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

type Props = {
    children: React.ReactNode;
};

export const ThemeContext = createContext<{
    theme: "dark" | "light";
    setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}>({
    theme: "dark",
    setTheme: () => {},
});

const imgDomain = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;

function LayoutWrapper({ children }: Props) {
    const [theme, setTheme] = useState("dark" as "dark" | "light");

    const pathname = usePathname();

    if (pathname.includes("/admin")) {
        return <> {children} </>;
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div
                className={
                    "fixed h-screen w-full bg-background " +
                    (theme === "dark" ? "dark" : "")
                }
            >
                <div className="relative flex h-screen w-full flex-col overflow-y-scroll">
                    {/* Header 部分 */}
                    <div className="sticky top-0 z-50 w-full">
                        <Header
                            imageUrl={
                                theme === "dark"
                                    ? imgDomain + "ChaosAtleast_white.png"
                                    : imgDomain + "ChaosAtleast_black.png"
                            }
                        />
                    </div>

                    {/* 动态内容部分 */}
                    <div className="relative w-full px-5 lg:px-0">
                        {children}
                    </div>

                    {/* Footer 部分 */}
                    <div className="relative w-full">
                        <Footer />
                    </div>
                </div>
            </div>
        </ThemeContext.Provider>
    );
}

export default LayoutWrapper;
