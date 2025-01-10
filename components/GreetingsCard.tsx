"use client";

import React from "react";
import { motion } from "motion/react";
import SplitType from "split-type";

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
            scale: 1.01,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
    };

    const tagVariants = {
        initial: {
            rotate: [0, 0],
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
        hover: {
            rotate: [10, 0],
            transition: {
                // type: "spring",
                repeat: Infinity,
                repeatDelay: 0.2,
                duration: 1,

                ease: [0.39, 0.24, 0.3, 1],
            },
        },
    };

    const [isHovered, setIsHovered] = React.useState(false);
    return (
        <motion.div
            className="relative flex h-full flex-col rounded-xl bg-transparent"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="rounded-3xl bg-red-800"
                variants={cardVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
            >
                <div className="absolute right-0 top-16 z-0 h-16 w-16 rounded-tr-3xl shadow-[0px_-20px_0px_0px_var(--background)]"></div>

                <div className="absolute right-44 top-0 z-0 h-16 w-16 rounded-tr-3xl shadow-[0px_-20px_0px_0px_var(--background)]"></div>
                <div className="float-right mb-2 ml-8 h-16 w-44 rounded-bl-3xl bg-background"></div>
                <motion.div
                    className="absolute -top-0 right-0 z-10 flex w-44 max-w-40 items-center justify-center text-nowrap rounded-3xl bg-primary p-2 text-foreground"
                    variants={tagVariants}
                    initial="initial"
                    animate={isHovered ? "hover" : "initial"}
                >
                    {text}
                </motion.div>
                <div className="p-4" id="greetings-content">
                    {children}
                </div>
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
            scale: 1.01,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
    };

    const tagVariants = {
        initial: {
            rotate: [0, 0],
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
        hover: {
            rotate: [-10, 0],
            transition: {
                // type: "spring",
                repeat: Infinity,
                repeatDelay: 0.2,
                duration: 1,

                ease: [0.39, 0.24, 0.3, 1],
            },
        },
    };

    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <motion.div
            className="relative flex h-full flex-col rounded-xl bg-transparent"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="masked-bg-tl rounded-3xl will-change-transform"
                variants={cardVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
            >
                <div className="float-left mb-2 mr-5 h-16 w-48 rounded-br-3xl bg-transparent"></div>

                <div className="h-full w-full p-4" id="greetings-content">
                    {children}
                </div>
            </motion.div>

            {/* <motion.div
                className="absolute -top-2 left-0 z-0 flex w-44 max-w-48 items-center justify-center rounded-3xl bg-primary p-2 text-foreground"
                variants={tagVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
            >
                {text}
            </motion.div> */}
        </motion.div>
    );
}

{
}
{
    /* rounded radius */
}
{
    /* <div
                    className="absolute left-0 top-16 z-0 h-16 w-16 rounded-tl-3xl bg-transparent shadow-[0px_-25px_0px_0px_var(--background)] will-change-transform"
                    style={{ transform: "translateZ(0)" }}
                ></div> */
}
{
    /* rounded radius */
}
{
}
{
    /*  bg for tags */
}
{
}

export { GreetingsCardRight, GreetingsCardLeft };
