"use client";
import { easeIn, motion } from "motion/react";
import { off } from "process";
import React, { use, useEffect } from "react";
import { set } from "sanity";

function TocTitle({
    title,
    targetId,
    currentActiveId,
    setCurrentActiveId,
}: {
    title: string;
    targetId?: string;
    currentActiveId: string | null;
    setCurrentActiveId: (id: string) => void;
}) {
    const textVariants = {
        initial: {
            color: "rgb(var(--primary-text))",
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
        hover: {
            color: "rgb(var(--primary-color))",
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
        active: {
            color: "rgb(var(--primary-color))",
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
    };

    const handleClick = () => {
        if (!targetId) return;

        const targetElement = document.getElementsByClassName(targetId)[0]; // Find the target section
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
                id={targetId}
                className="toc-title text-sm"
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
