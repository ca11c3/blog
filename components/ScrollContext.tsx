"use client";
import { useScroll } from "framer-motion";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

function ScrollContext({ children }: { children: React.ReactNode }) {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: scrollRef,
    });

    useEffect(() => {
        console.log(scrollYProgress);
    }, [scrollYProgress]);

    return (
        <motion.div
            className="blog-post scroll-smooth pb-32 pt-4"
            ref={scrollRef}
        >
            {children}
        </motion.div>
    );
}

export default ScrollContext;
