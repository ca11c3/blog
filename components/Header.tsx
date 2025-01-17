"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import { useContext } from "react";
import { ThemeContext } from "./LayoutWrapper";
import { useRouter } from "next/navigation";
import Grid from "./P5GridTexture";
import GridHeader from "./GridHeader";
// import PrimaryButton from "./PrimaryButton";

type Props = {
    imageUrl: string;
};

function Header({ imageUrl }: Props) {
    const themeContext = useContext(ThemeContext);
    const router = useRouter();
    return (
        <div className="flex h-24 w-full items-center justify-center bg-[rgba(var(--background),0.5)] backdrop-blur-lg">
            <div className="absolute left-0 top-0 z-0 h-full w-full bg-blend-overlay">
                <GridHeader></GridHeader>
            </div>
            <div className="absolute left-0 top-0 z-[1] h-full w-full bg-gradient-to-t from-[rgb(var(--background))] to-transparent to-50%"></div>
            <div className="screen-width-header relative z-10 flex h-full w-full items-center justify-between">
                <div
                    className="relative h-10 w-10 rounded-full"
                    onClick={() => router.push("/")}
                >
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt="Logo"
                            layout="fill"
                            objectFit="contain"
                            className="h-full w-full rounded-full"
                        />
                    )}
                </div>

                <div className="relative z-10 flex items-center justify-center space-x-2">
                    <PrimaryButton
                        onClick={() => {
                            themeContext.setTheme(
                                themeContext.theme === "dark"
                                    ? "light"
                                    : "dark",
                            );

                            console.log("Mode Clicked");
                        }}
                    >
                        {themeContext.theme === "dark" ? (
                            <SunIcon className="h-6 w-5 text-t-secondary" />
                        ) : (
                            <MoonIcon className="h-6 w-5 text-t-secondary" />
                        )}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}

export default Header;
