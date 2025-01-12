"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "motion/react";

function PostTitle({ slug, title }: { slug: string; title: string }) {
    const pathname = usePathname();

    const textVariants = {
        initial: {
            color: "rgb(var(--t-primary))",
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
        hover: {
            color: "rgb(var(--n-primary))",

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
            borderLeft: "2px solid rgb(var(--n-primary))",
            color: "rgb(var(--n-primary))",

            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
    };

    return (
        <motion.div
            variants={textVariants}
            initial="initial"
            whileHover="hover"
            animate={pathname.includes(`/posts/${slug}`) ? "active" : "initial"}
            className="rounded-md px-1 py-2 pl-2 text-sm"
        >
            <Link href={`/posts/${slug}`} className={"text-sm"}>
                {title}
            </Link>
        </motion.div>
    );
}

export default PostTitle;
