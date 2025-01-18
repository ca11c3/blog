"use client";

import { motion } from "framer-motion";
import React from "react";

const iconVariants = {
    initial: {
        // opacity: 0,
        scale: 0,
        y: 10,
        x: -10,
        color: "rgb(var(--t-tertiary))",
    },
    hover: {
        x: 1,
        y: 1,
        scale: 1,
        // opacity: 0.5,
        color: "rgb(var(--n-primary))",
        transition: {
            duration: 0.5,
            delay: 0.1,
        },
    },
};

const icon2Variants = {
    initial: {
        opacity: 1,
        scale: 1,
        display: "block",
        color: "rgb(var(--t-tertiary))",
    },
    hover: {
        // opacity: 0,
        color: "rgb(var(--n-primary))",
        scale: 0,
        display: "none",
    },
};

const textVariants = {
    initial: {
        opacity: 1,
        color: "rgb(var(--t-tertiary))",
    },
    hover: {
        color: "rgb(var(--n-primary))",
    },
};

type Props = {
    children: React.ReactNode;
    icon: React.ReactNode;
    url?: string;
};

const MotionTextWithIcon: React.FC<Props> = ({ children, icon, url }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <motion.div
            className="relative flex h-fit w-fit cursor-pointer flex-row items-center justify-start py-1 pr-2 text-t-tertiary"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
                variants={textVariants}
            >
                {children}
            </motion.div>

            <div className="absolute -right-3 top-0 2xl:-right-7">
                <motion.div
                    className="absolute right-0 top-0"
                    initial="initial"
                    animate={isHovered ? "hover" : "initial"}
                    variants={icon2Variants}
                >
                    {icon}
                </motion.div>
                <motion.div
                    className="absolute right-0 top-0"
                    initial="initial"
                    animate={isHovered ? "hover" : "initial"}
                    variants={iconVariants}
                >
                    {icon}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default MotionTextWithIcon;
