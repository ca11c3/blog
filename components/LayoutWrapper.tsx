"use client";
import { usePathname } from "next/navigation";
import React, { createContext, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Image from "next/image";

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
    const [theme, setTheme] = useState("light" as "dark" | "light");

    const pathname = usePathname();

    if (pathname.includes("/admin")) {
        return <> {children} </>;
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div
                className={
                    "fixed z-0 h-screen w-screen bg-background " +
                    (theme === "dark" ? "dark" : "")
                }
            >
                {pathname === "/" && (
                    <>
                        {" "}
                        <div className="absolute left-0 top-0 h-full w-screen">
                            <Image
                                src={"/bludge-grid.svg"}
                                alt="Grid"
                                fill
                                className="h-full w-full scale-125 object-cover"
                            />
                        </div>
                    </>
                )}
                <div className="relative z-0 flex h-screen flex-col justify-evenly overflow-x-hidden overflow-y-scroll">
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
                    <div>
                        {children}

                        <Footer />
                    </div>
                </div>
            </div>
        </ThemeContext.Provider>
    );
}

export default LayoutWrapper;
