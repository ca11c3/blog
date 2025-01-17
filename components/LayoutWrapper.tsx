"use client";
import { usePathname } from "next/navigation";
import React, { createContext, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Image from "next/image";
import BulgeGrid from "./R3F/BulgeGrid";

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
                    "relative h-full w-full touch-auto overflow-auto bg-background" +
                    (theme === "dark" ? "dark" : "")
                }
            >
                <div className="">
                    {pathname === "/" && (
                        <div className="fixed left-0 top-0 h-full w-screen">
                            <div className="h-full w-full">
                                <BulgeGrid />
                            </div>
                        </div>
                    )}

                    {/* Header  */}
                    <div className="min-h-screen select-none overflow-y-auto">
                        <div className="h-full flex-col justify-evenly">
                            <div className="sticky top-0 z-50 w-full">
                                <Header
                                    imageUrl={
                                        theme === "dark"
                                            ? imgDomain +
                                              "ChaosAtleast_white.png"
                                            : imgDomain +
                                              "ChaosAtleast_black.png"
                                    }
                                />
                            </div>

                            {/* Body */}

                            <div>
                                {children}

                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeContext.Provider>
    );
}

export default LayoutWrapper;
