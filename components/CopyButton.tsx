"use client";

import React, { use, useEffect } from "react";
import PrimaryButton from "./PrimaryButton";
import { CheckCheckIcon, CopyIcon } from "lucide-react";

function CopyButton({ code }: { code: string }) {
    const [isCopied, setIsCopied] = React.useState(false);

    useEffect(() => {
        if (isCopied) {
            setTimeout(() => {
                setIsCopied(false);
            }, 1000);
        }
    }, [isCopied]);

    return (
        <div
            className="h-ful text-b-accent-green w-full rounded-lg bg-[rgba(var(--b-accent-grey),.2)] px-3 py-2 hover:bg-[rgba(var(--b-accent-grey),0.5)]"
            onClick={() => {
                setIsCopied(true);
                navigator.clipboard.writeText(code);
            }}
        >
            {isCopied ? <CheckCheckIcon size={16} /> : <CopyIcon size={16} />}
        </div>
    );
}

export default CopyButton;
