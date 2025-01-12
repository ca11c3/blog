"use client";

import React from "react";

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
};

function PrimaryButton({ children, onClick }: Props) {
    return (
        <button
            className="h-ful w-full rounded-lg bg-background px-3 py-2 hover:bg-[rgba(var(--t-tertiary),0.1)]"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default PrimaryButton;
