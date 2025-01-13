"use client";

import React from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { init } from "next/dist/compiled/webpack/webpack";
import { Repeat } from "lucide-react";
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
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
    hover: {
        rotate: 360,
        transition: {
            type: "spring",
            repeat: Infinity,
            repeatDelay: 0.2,
        },
    },
};
function VerticalCard({ post }: { post: IPost }) {
    const router = useRouter();
    console.log("Post", post);

    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <motion.div
            className="relative flex max-h-96 flex-col rounded-xl bg-transparent"
            onClick={() => {
                router.push(`/posts/${post.slug.current}`);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative min-h-64 w-full">
                <motion.div
                    className="masked-bg masked-bg-br min-h-64 rounded-3xl bg-red-800"
                    variants={cardVariants}
                    initial="initial"
                    animate={isHovered ? "hover" : "initial"}
                ></motion.div>
                <motion.div
                    className="text-b-accent-green-grey bg-b-tertiary absolute bottom-0 right-2 z-10 flex max-w-40 justify-end text-nowrap rounded-3xl p-2 text-sm font-semibold"
                    variants={tagVariants}
                    initial="initial"
                    animate={isHovered ? "hover" : "initial"}
                >
                    {post.categories[0]}
                </motion.div>
            </div>
            <div className="relative p-4">
                <h2 className="text-t-primary text-xl font-bold">
                    {post.title}
                </h2>
                <p className="text-t-secondary text-sm">Description</p>
            </div>
        </motion.div>
    );
}

export default VerticalCard;
