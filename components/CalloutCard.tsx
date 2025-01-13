"use client";

import React from "react";
import { motion } from "motion/react";

function CalloutCard({
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
            rotate: [10, 0],
            x: 20,
            scale: 1.1,
            transition: {
                // type: "spring",
                repeat: Infinity,
                repeatDelay: 0.5,
                duration: 1,

                ease: [0.39, 0.24, 0.3, 1],
            },
        },
    };

    const [isHovered, setIsHovered] = React.useState(false);
    return (
        <motion.div
            className="greetings-card relative bg-transparent"
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="masked-bg-small-tr masked-bg rounded-xl bg-[rgba(var(--b-info),.2)] bg-blend-overlay backdrop-blur"
                variants={cardVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
            >
                <div className="float-right ml-4 h-16 w-40 rounded-br-xl bg-transparent"></div>

                <div className="h-full w-full p-4" id="greetings-content">
                    {children}
                </div>
            </motion.div>
            <motion.div
                className="text-t-primary absolute -top-1 right-0 z-10 flex min-w-36 max-w-40 items-center justify-center text-nowrap rounded-lg bg-[rgba(var(--b-info),.2)] p-2 text-sm font-semibold"
                variants={tagVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
            >
                {text}
            </motion.div>
        </motion.div>
    );
}

export default CalloutCard;
