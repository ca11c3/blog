"use client";

import { motion } from "motion/react";
import React, { useContext } from "react";
import { ThemeContext } from "./LayoutWrapper";

function CalloutCard({
    children,
    text,
    type = "info",
}: {
    children: React.ReactNode;
    text: React.ReactNode;
    type?: "info" | "success" | "warning";
}) {
    const cardVariants = {
        ["dark-info"]: {
            backgroundColor: "rgba(var(--b-info),.3)",
        },
        ["dark-success"]: {
            backgroundColor: "rgba(var(--b-success),.3)",
        },
        ["dark-warning"]: {
            backgroundColor: "rgba(var(--b-warning),.3)",
        },
        ["light-info"]: {
            backgroundColor: "rgba(var(--b-info),1)",
        },
        ["light-success"]: {
            backgroundColor: "rgba(var(--b-success),1)",
        },
        ["light-warning"]: {
            backgroundColor: "rgba(var(--b-warning),1)",
        },
    };

    const tagInfo = {
        ["info"]: {
            backgroundColor: "rgba(var(--b-accent-info),1)",
        },
        ["success"]: {
            backgroundColor: "rgba(var(--b-accent-success),1)",
        },
        ["warning"]: {
            backgroundColor: "rgba(var(--b-accent-warning),1)",
        },
    };

    const tContext = useContext(ThemeContext);
    console.log("tcontext", tContext);

    const getColor = () => {
        if (tContext?.theme === "dark") {
            return "dark-" + type;
        } else {
            return "light-" + type;
        }
    };
    return (
        <motion.div className="greetings-card relative bg-transparent">
            <motion.div
                className="masked-bg-small-tr masked-bg rounded-xl"
                variants={cardVariants}
                initial={getColor()}
                animate={getColor()}
            >
                <div className="float-right mb-4 h-12 w-40 rounded-br-xl bg-transparent"></div>

                <div className="h-full lg:p-4" id="greetings-content">
                    {children}
                </div>
            </motion.div>
            <motion.div
                className="absolute -top-0 right-1 z-10 flex max-h-10 min-w-36 max-w-36 items-center justify-center text-wrap rounded-lg p-2 text-center text-sm font-semibold leading-tight text-t-primary"
                variants={tagInfo}
                initial={type}
                animate={type}
            >
                {text}
            </motion.div>
        </motion.div>
    );
}

export default CalloutCard;
