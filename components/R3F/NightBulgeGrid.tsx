"use client";

import { Html } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import html2canvas from "html2canvas";
import { debounce, set } from "lodash";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ThemeContext } from "../LayoutWrapper";
import { fragmentChunk1, fragmentChunk2 } from "../Shaders/fragmentChunk";
import { vertexChunk1, vertexChunk2 } from "../Shaders/vertextChunk";

const LIGHT_BORDER = "#bec1c6";
const DARK_BORDER = "#353535";
function NightBulgeGrid() {
    const canvasRef = useRef<any>(null);

    return (
        <Canvas gl={{ alpha: true }} ref={canvasRef}>
            <Scene />
            {/* <OrbitControls /> */}
        </Canvas>
    );
}

function Scene() {
    const { viewport, size } = useThree();

    const [domEl, setDomEl] = useState(null);

    const domRef = useRef<HTMLDivElement>(null);

    const uniforms = useRef<any>({
        u_Resolution: { value: new THREE.Vector2() },
        u_Mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_Texture: { value: null },
    });

    const mouseLerped = useRef({ x: 0, y: 0 });

    useFrame((state, delta) => {
        const { x, y } = state.mouse; // Already in [-1..1] in R3F
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
    });

    useEffect(() => {
        if (!domEl) return;
        console.group("Viewport:");

        console.log("DomEl:", domEl);

        // Function to convert DOM to canvas and update the texture
        const convertDomToCanvas = async () => {
            // if (!domRef.current) return;
            const canvas = await html2canvas(domEl, {
                // backgroundColor: null,
            });
            if (canvas) {
                const texture = new THREE.CanvasTexture(canvas);
                texture.needsUpdate = true;

                // Update the Three.js uniform
                uniforms.current.u_Texture.value = texture;
            }
        };

        // Initial canvas conversion
        convertDomToCanvas();

        // Debounced resize handler

        window.addEventListener("resize", convertDomToCanvas);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("resize", convertDomToCanvas);
        };
    }, [domEl]); // Re-run if `domEl` or `theme` changes

    useEffect(() => {
        const handleResize = () => {
            uniforms.current.u_Resolution.value = new THREE.Vector2(
                window.innerWidth,
                window.innerHeight,
            );

            console.log("window.innerWidth:", window.innerWidth);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const materialFill = new THREE.MeshStandardMaterial({
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
            <Html zIndexRange={[-1, -10]} prepend fullscreen>
                <div
                    ref={(el: any) => {
                        if (el) {
                            setDomEl(el);
                        }
                    }}
                    className="relative h-screen w-screen"
                    style={{
                        backgroundColor: "#0d0d0d",
                    }}
                >
                    <Image
                        src={"/bulge-grid-night.svg"}
                        alt="Grid"
                        fill
                        className="object-cover"
                    />
                </div>
            </Html>
            <pointLight
                position={[0, 0, 10]}
                intensity={1000}
                color={"white"}
                scale={50}
            />
            <mesh>
                <planeGeometry
                    args={[viewport.width, viewport.height, 254, 254]}
                />
                <meshStandardMaterial {...materialFill} flatShading />
            </mesh>
        </>
    );
}

export default NightBulgeGrid;
