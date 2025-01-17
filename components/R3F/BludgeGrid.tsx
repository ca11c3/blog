"use client";

import { Center, OrbitControls, Svg } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { useContext, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three-stdlib";
import { ThemeContext } from "../LayoutWrapper";
import { vertexChunk1, vertexChunk2 } from "../Shaders/vertextChunk";
import { fragmentChunk1, fragmentChunk2 } from "../Shaders/fragmentChunk";

const LIGHT_BORDER = "#bec1c6";
const DARK_BORDER = "#353535";
function BludgeGrid() {
    const canvasRef = useRef<any>(null);

    // const frustumSize = 10; // 设置视锥体大小

    // const cameraMemo = useMemo(() => {
    //     console.log("resized");
    //     if (!canvasRef.current) return;

    //     const { clientHeight, clientWidth } = canvasRef.current;

    //     const aspect = clientWidth / clientHeight;
    //     const cameraProps = {
    //         left: (-frustumSize * aspect) / 2,
    //         right: (frustumSize * aspect) / 2,
    //         top: frustumSize / 2,
    //         bottom: -frustumSize / 2,
    //         // near: 0.1,
    //         // far: 1000,
    //         position: new THREE.Vector3(0, 0, 10),
    //         zoom: 200, // 调整 zoom 来缩放整个视图
    //     };

    //     return { ...cameraProps };
    // }, [canvasRef.current]);

    return (
        <Canvas gl={{ alpha: true }} ref={canvasRef}>
            <Scene />
            <OrbitControls />
        </Canvas>
    );
}

function Scene() {
    const { viewport, size } = useThree();

    const { theme } = useContext(ThemeContext);

    const uniforms = useRef<any>({
        u_Resolution: { value: new THREE.Vector2() },
    });

    useEffect(() => {
        const handleResize = () => {
            uniforms.current.u_Resolution.value = new THREE.Vector2(
                viewport.width,
                viewport.height,
            );
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const scale = useMemo(() => {
        console.group("Resize");
        console.log("Width:", viewport.width);
        console.log("Height:", viewport.height);
        console.log("Size Width:", size.width);
        console.log("Size Height:", size.height);

        console.groupEnd();

        const calculatedScale = 1024 / size.width;
        const scaleFactor = Math.max(1.25, Math.min(calculatedScale, 3));

        console.log("Scale:", scaleFactor);

        const widthScale = (viewport.width / 1024) * scaleFactor; // Adjust SVG's width
        const heightScale = (viewport.height / 1024) * scaleFactor; // Adjust SVG's height
        return Math.max(widthScale, heightScale); // U
    }, [size, viewport]);
    //    const grid = useLoader(SVGLoader, "/bludge-grid.svg");
    // const bludgeGrid = useMemo(() => {
    //     const paths = grid.paths;
    //     const group = new THREE.Group();

    //     paths.forEach((path: any) => {
    //         const subPaths = path.subPaths;
    //         const material = new THREE.LineBasicMaterial({
    //             color: "red",
    //             linewidth: 10,
    //         });
    //         // const shapes = SVGLoader.createShapes(path);
    //         subPaths.forEach((subPath: any) => {
    //             const points = subPath.getPoints(50); // Number of points to generate
    //             const geometry = new THREE.BufferGeometry().setFromPoints(
    //                 points.map((p: any) => new THREE.Vector3(p.x, p.y, 0)), // Convert 2D points to 3D
    //             );

    //             const line = new THREE.Line(geometry, material);

    //             console.log("Line", line);
    //             group.add(line);
    //         });
    //     });

    //     console.log("Group", group);
    //     return { group };
    // }, []);

    const material = new THREE.MeshStandardMaterial({
        color: theme === "dark" ? DARK_BORDER : LIGHT_BORDER,
    });

    const planeGeometry = new THREE.PlaneGeometry(
        viewport.width,
        viewport.height,
    );

    const materialFill = new THREE.MeshStandardMaterial({
        color: "blue",
    });

    materialFill.onBeforeCompile = (shader) => {
        shader.uniforms = {
            ...uniforms.current,
            ...shader.uniforms,
        };

        // 修改顶点着色器
        shader.vertexShader = vertexChunk1 + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace(
            "#include <project_vertex>",
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
            <Center>
                {/* <group
                    scale={[scale, scale, 1]}
                    position={[-viewport.width / 2, viewport.height / 2, 0]}
                >
                    <mesh>
                        <Svg
                            src="/bludge-grid.svg"
                            strokeMaterial={material}
                            fillMaterial={materialFill}
                        />
                    </mesh>
                </group> */}

                <mesh>
                    <planeGeometry
                        args={[viewport.width, viewport.height, 500, 500]}
                    />
                    <meshStandardMaterial {...materialFill} />
                </mesh>

                {/* 
                <mesh>
                    <planeGeometry
                        args={[viewport.width, viewport.height, 500, 500]}
                    >
                        <meshStandardMaterial
                            color={"blue"}
                            onBeforeCompile={(shader) => {
                                shader.uniforms = {
                                    // ...uniforms.current,
                                    ...shader.uniforms,
                                };

                                // 修改顶点着色器
                                shader.vertexShader =
                                    vertexChunk1 + shader.vertexShader;
                                shader.vertexShader =
                                    shader.vertexShader.replace(
                                        "#include <project_vertex>",
                                        vertexChunk2,
                                    );

                                // 修改片段着色器
                                shader.fragmentShader =
                                    fragmentChunk1 + shader.fragmentShader;
                                shader.fragmentShader =
                                    shader.fragmentShader.replace(
                                        `#include <opaque_fragment>`,
                                        fragmentChunk2,
                                    );
                            }}
                        />
                    </planeGeometry>
                </mesh> */}
            </Center>
        </>
    );
}

export default BludgeGrid;
