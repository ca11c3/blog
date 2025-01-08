"use client";

import React from "react";
import TocTitle from "./TocTitle";

type Toc = {
    title: string;
    key: string;
};
export default function TableOfContent({ toc }: { toc: Toc[] }) {
    const [currentActiveId, setCurrentActiveId] = React.useState<string | null>(
        null,
    );

    return (
        <div className="space-y-3">
            {toc.map((section) => (
                <TocTitle
                    title={section.title}
                    targetId={section.key}
                    currentActiveId={currentActiveId}
                    setCurrentActiveId={setCurrentActiveId}
                />
            ))}
        </div>
    );
}
