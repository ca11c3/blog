"use client";

import React, { useEffect } from "react";
import TocTitle from "./TocTitle";
import { set } from "sanity";

type Toc = {
    title: string;
    key: string;
};
export default function TableOfContent({ toc }: { toc: Toc[] }) {
    const [currentActiveId, setCurrentActiveId] = React.useState<string | null>(
        null,
    );

    const [offsetTop, setOffsetTop] = React.useState<number | null>(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.3, // Adjust for when you want the "active" to kick in
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    // Use the data attribute or matching logic to set active section

                    console.log("Entry", entry);
                    setCurrentActiveId(entry.target.id);
                }
            });
        }, options);

        // Observe each section
        toc.forEach((section) => {
            const targetElement = document.getElementById(section.key); // Find the target section
            if (!targetElement) return;
            observer.observe(targetElement);
        });

        // Cleanup
        return () => {
            toc.forEach((section) => {
                const targetElement = document.getElementById(section.key); // Find the target section
                if (!targetElement) return;
                observer.unobserve(targetElement);
            });
        };
    }, []);

    return (
        <div>
            <div className="ml-2 space-y-0 border-l-[1px]">
                {toc.map((section) => (
                    <TocTitle
                        title={section.title}
                        targetId={section.key}
                        currentActiveId={currentActiveId}
                        setCurrentActiveId={setCurrentActiveId}
                        lastActiveId={toc[toc.length - 1].key}
                        firstActiveId={toc[0].key}
                    />
                ))}
            </div>
        </div>
    );
}
