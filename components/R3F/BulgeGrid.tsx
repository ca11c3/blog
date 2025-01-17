"use client";

import { Center, Html } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { debounce, set } from "lodash";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { ThemeContext } from "../LayoutWrapper";
import { fragmentChunk1, fragmentChunk2 } from "../Shaders/fragmentChunk";
import { vertexChunk1, vertexChunk2 } from "../Shaders/vertextChunk";
import html2canvas from "html2canvas";
import { u } from "framer-motion/client";

const LIGHT_BORDER = "#bec1c6";
const DARK_BORDER = "#353535";
function BulgeGrid() {
    const canvasRef = useRef<any>(null);
    const [isScroll, setIsScroll] = useState(false);
    // useEffect(() => {
    //     const handleScroll = () => {
    //         setIsScroll(true);
    //     };

    //     const handleScrollEnd = () => {
    //         setIsScroll(false);
    //     };

    //     window.addEventListener("scroll", handleScroll);
    //     window.addEventListener("scrollend", handleScrollEnd);

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //         window.removeEventListener("scrollend", handleScrollEnd);
    //     };
    // }, []);

    // useEffect(() => {
    //     console.log("isScroll:", isScroll);
    // }, [isScroll]);

    return (
        <Canvas gl={{ alpha: true }} ref={canvasRef}>
            <Scene />
            {/* <OrbitControls /> */}
        </Canvas>
    );
}

const useDomToCanvas = (domEl: any) => {
    const { theme } = useContext(ThemeContext);
    const [texture, setTexture] = useState<THREE.CanvasTexture | null>();

    useEffect(() => {
        // const domEl: any = document.querySelector(selector);

        console.log("DomEl:", domEl);
        if (!domEl) return;
        const convertDomToCanvas = async () => {
            const canvas: any = await html2canvas(domEl, {
                backgroundColor: null,
            });
            if (canvas) {
                const texture = new THREE.CanvasTexture(canvas);
                texture.needsUpdate = true;
                setTexture(texture);
            }
        };

        convertDomToCanvas();

        const debouncedResize = debounce(() => {
            convertDomToCanvas();
        }, 100);

        window.addEventListener("resize", debouncedResize);
        return () => {
            window.removeEventListener("resize", debouncedResize);
        };
    }, [theme]);

    return texture;
};

function Scene() {
    const { viewport, size } = useThree();

    const { theme } = useContext(ThemeContext);
    const [domEl, setDomEl] = useState(null);
    const domElRef = useRef(null);

    const [isScroll, setIsScroll] = useState(false);
    const texture = useDomToCanvas(domElRef.current);

    const uniforms = useRef<any>({
        u_Resolution: { value: new THREE.Vector2() },
        u_Mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_Texture: { value: null },
    });

    const mouseLerped = useRef({ x: 0, y: 0 });

    useFrame((state, delta) => {
        const { x, y } = state.mouse; // Already in [-1..1] in R3F

        if (!isScroll) {
            // Lerp from current to new
            mouseLerped.current.x = THREE.MathUtils.lerp(
                mouseLerped.current.x,
                x,
                0.05, // smoothing factor
            );
            mouseLerped.current.y = THREE.MathUtils.lerp(
                mouseLerped.current.y,
                y,
                0.05,
            );

            // Update uniform directly in [-1..1]
            uniforms.current.u_Mouse.value.set(
                mouseLerped.current.x,
                mouseLerped.current.y,
            );
        }
    });

    useEffect(() => {
        const handleResize = () => {
            uniforms.current.u_Resolution.value = new THREE.Vector2(
                window.innerWidth,
                window.innerHeight,
            );

            if (texture) {
                uniforms.current.u_Texture.value = texture;
            }
        };

        const handleScroll = () => {
            setIsScroll(true);
        };

        const handleScrollEnd = () => {
            setIsScroll(false);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("scrollend", handleScrollEnd);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("scrollend", handleScrollEnd);
        };
    }, []);

    const materialFill = new THREE.MeshBasicMaterial({
        transparent: true,
        // map: texture,
    });

    materialFill.onBeforeCompile = (shader) => {
        shader.uniforms = {
            ...uniforms.current,
            ...shader.uniforms,
        };

        // 修改顶点着色器
        shader.vertexShader = vertexChunk1 + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace(
            "#include <begin_vertex>",
            vertexChunk2,
        );

        // 修改片段着色器
        shader.fragmentShader = fragmentChunk1 + shader.fragmentShader;
        shader.fragmentShader = shader.fragmentShader.replace(
            `#include <opaque_fragment>`,
            fragmentChunk2,
        );
    };

    return (
        <>
            <pointLight
                position={[0, 0, 10]}
                intensity={3000}
                color={"white"}
                scale={50}
            />

            <mesh>
                <planeGeometry
                    args={[viewport.width, viewport.height, 254, 254]}
                />
                <meshBasicMaterial {...materialFill} wireframe />
            </mesh>
        </>
    );
}

export default BulgeGrid;
