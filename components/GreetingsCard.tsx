"use client";

import { motion } from "motion/react";
import React from "react";

function GreetingsCardRight({
    children,
    text,
}: {
    children: React.ReactNode;
    text: React.ReactNode;
}) {
    const cardVariants = {
        initial: {
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
    };

    const tagVariants = {
        initial: {
            rotate: 0,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
        hover: {
            rotate: -10,
            x: -1,
            scale: 1.05,
            transition: {
                type: "spring",

                duration: 1,
                stiffness: 50,

                ease: [0.39, 0.24, 0.3, 1],
            },
        },
    };

    const [isHovered, setIsHovered] = React.useState(false);
    return (
        <motion.div
            className="greetings-card relative bg-transparent"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="masked-bg-tr masked-bg rounded-3xl bg-[rgba(var(--n-secondary),1)] bg-blend-overlay backdrop-blur"
                variants={cardVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
            >
                <div className="float-right ml-4 h-16 w-48 rounded-br-3xl bg-transparent"></div>

                <div className="h-full w-full p-4" id="greetings-content">
                    {children}
                </div>
            </motion.div>
            <motion.div
                className="absolute right-0 top-0 z-10 flex w-44 max-w-48 items-center justify-center text-nowrap rounded-3xl bg-t-primary p-2 font-semibold text-n-secondary"
                variants={tagVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
            >
                {text}
            </motion.div>
        </motion.div>
    );
}

function GreetingsCardLeft({
    children,
    text,
}: {
    children: React.ReactNode;
    text: React.ReactNode;
}) {
    const cardVariants = {
        initial: {
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
    };

    const tagVariants = {
        initial: {
            rotate: [0, 0],
            x: 0,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
        hover: {
            rotate: 10,
            x: 1,
            scale: 1.05,
            transition: {
                type: "spring",

                duration: 1,
                stiffness: 50,

                ease: [0.39, 0.24, 0.3, 1],
            },
        },
    };

    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <motion.div
            className="greetings-card relative bg-transparent"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="masked-bg-tl masked-bg rounded-3xl bg-[rgba(var(--n-tertiary),1)]"
                variants={cardVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
            >
                <div className="float-left mr-4 h-16 w-48 rounded-br-3xl bg-transparent"></div>

                <div className="p-4" id="greetings-content">
                    {children}
                </div>
            </motion.div>

            <motion.div
                className="absolute left-0 top-0 z-10 flex w-44 max-w-48 items-center justify-center text-nowrap rounded-3xl bg-t-primary p-2 font-semibold text-n-tertiary"
                variants={tagVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
            >
                {text}
            </motion.div>
        </motion.div>
    );
}

export { GreetingsCardLeft, GreetingsCardRight };
