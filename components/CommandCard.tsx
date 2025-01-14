"use client";

import { motion } from "framer-motion";
import { CheckCheckIcon, Code2Icon, SquareTerminalIcon } from "lucide-react";
import React from "react";
import { set } from "sanity";

function CommandCard({
    children,
    copiedText,
}: {
    children: React.ReactNode;
    copiedText: string;
}) {
    const [isCopied, setIsCopied] = React.useState(false);

    React.useEffect(() => {
        if (isCopied) {
            setTimeout(() => {
                setIsCopied(false);
            }, 1000);
        }
    }, [isCopied]);
    return (
        <motion.div className="greetings-card relative bg-transparent">
            <motion.div className="masked-bg-small-tr masked-bg rounded-xl bg-[rgba(var(--b-accent-green-grey),.2)] bg-blend-overlay backdrop-blur">
                <div className="float-right ml-4 h-16 min-w-36 rounded-br-xl bg-transparent"></div>

                <div className="h-full w-full p-4" id="greetings-content">
                    {children}
                </div>
            </motion.div>
            <motion.div
                className="absolute -top-1 right-0 z-10 flex min-w-36 max-w-36 items-center justify-center gap-x-2 text-nowrap rounded-lg bg-[rgba(var(--b-accent-green-grey),.2)] p-2 text-sm font-semibold text-b-accent-green"
                onClick={() => {
                    setIsCopied(true);
                    navigator.clipboard.writeText(copiedText);
                }}
            >
                {isCopied ? (
                    <div className="flex items-center gap-x-2">
                        <CheckCheckIcon
                            size={14}
                            className="text-b-accent-green"
                        />
                        Copied
                    </div>
                ) : (
                    <div className="flex items-center gap-x-2">
                        <SquareTerminalIcon
                            size={14}
                            className="text-b-accent-green"
                        />
                        Copy
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

export default CommandCard;
