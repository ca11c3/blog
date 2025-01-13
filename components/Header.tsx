"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import { useContext } from "react";
import { ThemeContext } from "./LayoutWrapper";
import { useRouter } from "next/navigation";
// import PrimaryButton from "./PrimaryButton";

type Props = {
    imageUrl: string;
};

function Header({ imageUrl }: Props) {
    const themeContext = useContext(ThemeContext);
    const router = useRouter();
    return (
        <div className="flex h-24 w-full items-center justify-center bg-background">
            <div className="screen-width-header flex h-full w-full items-center justify-between">
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

                <div className="flex items-center justify-center space-x-2">
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
                            <SunIcon className="text-t-secondary h-6 w-5" />
                        ) : (
                            <MoonIcon className="text-t-secondary h-6 w-5" />
                        )}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}

export default Header;
