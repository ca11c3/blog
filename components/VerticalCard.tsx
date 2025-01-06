"use client";

import React from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

function VerticalCard({ post }: { post: IPost }) {
    const router = useRouter();
    console.log("Post", post);
    return (
        <motion.div
            className="relative flex max-h-96 flex-col rounded-xl bg-transparent"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
                router.push(`/posts/${post.slug.current}`);
            }}
        >
            <div className="relative min-h-64 rounded-3xl bg-red-800 before:absolute before:bottom-12 before:right-0 before:z-0 before:h-12 before:w-12 before:rounded-br-2xl before:shadow-[0px_15px_0px_0px_var(--background)] after:absolute after:bottom-0 after:right-40 after:z-0 after:h-12 after:w-12 after:rounded-br-2xl after:shadow-[0px_15px_0px_0px_var(--background)]">
                <div className="absolute bottom-0 right-0 z-0 flex h-12 min-w-40 rounded-tl-3xl bg-background"></div>
                <div className="absolute bottom-0 right-2 z-10 flex max-w-40 justify-end text-nowrap rounded-3xl bg-primary p-2 text-sm text-foreground">
                    {post.categories[0]}
                </div>
            </div>
            <div className="relative p-4">
                <h2 className="text-primary-text text-xl font-bold">
                    {post.title}
                </h2>
                <p className="text-secondary-text text-sm">Description</p>
            </div>
        </motion.div>
    );
}

export default VerticalCard;
