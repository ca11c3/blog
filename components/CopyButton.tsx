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
        <PrimaryButton
            onClick={() => {
                setIsCopied(true);
                navigator.clipboard.writeText(code);
            }}
        >
            {isCopied ? <CheckCheckIcon size={20} /> : <CopyIcon size={20} />}
        </PrimaryButton>
    );
}

export default CopyButton;
