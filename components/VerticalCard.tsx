"use client";

import React from "react";
import { motion, useInView } from "motion/react";
import { useRouter } from "next/navigation";
import { init } from "next/dist/compiled/webpack/webpack";
import { Repeat } from "lucide-react";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
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
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
    hover: {
        rotate: 5,
        x: -5,
        transition: {
            type: "spring",

            stiffness: 100,
        },
    },
};
function VerticalCard({ post }: { post: IPost }) {
    const router = useRouter();
    console.log("Post", post);

    const [isHovered, setIsHovered] = React.useState(false);

    const videoRef = React.useRef<HTMLVideoElement>(null);
    const isVideoInView = useInView(videoRef);

    React.useEffect(() => {
        if (!videoRef.current) return;

        if (isHovered) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [videoRef, isHovered]);

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
                    className="masked-bg masked-bg-br min-h-64 rounded-2xl"
                    variants={cardVariants}
                    initial="initial"
                    animate={isHovered ? "hover" : "initial"}
                >
                    <video
                        ref={videoRef}
                        preload={isVideoInView ? "auto" : "none"}
                        loop
                        muted
                        playsInline
                        className="h-full w-full rounded-2xl object-cover"
                        poster={post.demoImage.asset.url}
                        src={post.demoVideo.asset.url}
                    ></video>
                </motion.div>
                <motion.div
                    className="absolute bottom-0 right-2 z-10 flex max-w-40 justify-end text-nowrap rounded-3xl bg-b-tertiary p-2 text-sm font-semibold text-t-primary"
                    variants={tagVariants}
                    initial="initial"
                    animate={isHovered ? "hover" : "initial"}
                >
                    {post.categories[0]}
                </motion.div>
            </div>
            <div className="relative p-4">
                <h2 className="text-xl font-bold text-t-primary">
                    {post.title}
                </h2>
                <p className="mt-2 text-sm text-t-tertiary">
                    {post.description}
                </p>
            </div>
        </motion.div>
    );
}

export default VerticalCard;
