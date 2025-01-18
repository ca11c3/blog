"use client";
import { inView, motion, scroll, useScroll } from "motion/react";
import React from "react";
import { useEffect } from "react";
import { set } from "sanity";

interface CustomIntersectionObserverEntry extends IntersectionObserverEntry {
    isVisible: boolean;
}
function TocTitle({
    title,
    targetId,
    currentActiveId,
    setCurrentActiveId,
    lastActiveId,
    firstActiveId,
}: {
    title: string;
    targetId?: string;
    currentActiveId: string | null;
    setCurrentActiveId: (id: string) => void;
    firstActiveId: string;
    lastActiveId: string;
}) {
    const textVariants = {
        initial: {
            color: "rgb(var(--t-secondary))",
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
        hover: {
            color: "rgb(var(--b-tertiary))",

            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
        active: {
            marginLeft: "-1.5px",
            borderTopRightRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderLeft: "2px solid rgb(var(--b-tertiary))",
            color: "rgb(var(--b-tertiary))",
            fontWeight: "bold",
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
    };

    const handleClick = () => {
        if (!targetId) return;

        const targetElement = document.getElementById(targetId);

        // Find the target section
        const blogPostElement = document.getElementsByClassName("blog-post")[0]; // Find the blog post container
        // Find the current active section
        console.log("Target", blogPostElement, targetElement);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });

            setCurrentActiveId(targetId);
        }
    };
    return (
        <motion.div key={title}>
            <motion.h1
                className="toc-title w-fit py-1.5 pl-4 pr-2 text-xs"
                variants={textVariants}
                initial={"initial"}
                whileHover={"hover"}
                animate={targetId === currentActiveId ? "active" : "initial"}
                onClick={handleClick}
            >
                {title}
            </motion.h1>
        </motion.div>
    );
}

export default TocTitle;
