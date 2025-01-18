import { useState, useEffect } from "react";

const useCanvasExists = (selector = ".grid-plane-texture canvas") => {
    const [exists, setExists] = useState(false);
    const [target, setTarget] = useState<
        HTMLElement | HTMLCanvasElement | null
    >(null);

    useEffect(() => {
        const checkCanvas = () => {
            const canvas = document.querySelector(selector);
            setExists(!!canvas);
            setTarget((canvas as HTMLCanvasElement) || null);
        };

        // Initial check
        checkCanvas();

        // Optional: Monitor DOM changes for dynamic canvas updates
        const observer = new MutationObserver(checkCanvas);
        observer.observe(document.body, { childList: true, subtree: true });

        // Cleanup observer on unmount
        return () => {
            observer.disconnect();
        };
    }, [selector]);

    return { exists, target };
};

export default useCanvasExists;
