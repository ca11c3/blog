"use client";

import { useInView } from "framer-motion";
import React from "react";

function Video({ url }: { url: string }) {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const isVideoInView = useInView(videoRef);

    React.useEffect(() => {
        if (!videoRef.current) return;

        if (isVideoInView) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [isVideoInView]);

    return (
        <div className="relative my-4 aspect-[16/9] w-full overflow-hidden rounded-xl bg-[rgba(var(--b-accent-blue-grey),.2)] p-2 lg:p-4">
            <video
                ref={videoRef}
                preload={isVideoInView ? "auto" : "none"}
                loop
                muted
                playsInline
                className="h-full w-full rounded-xl object-cover"
                src={url}
            ></video>
        </div>
    );
}

export default Video;
