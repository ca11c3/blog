"use client";

import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Html, useAspect } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { patchShaders } from "gl-noise";
import * as THREE from "three";
import {
    fragmentChunk1,
    fragmentChunk2,
    fragShader,
} from "../Shaders/fragmentChunk";
import {
    vertexChunk1,
    vertexChunk2,
    vertShader,
} from "../Shaders/vertextChunk";
import P5GridTexture from "../P5GridTexture";

function GridScene() {
    return (
        <Canvas style={{ width: "fit" }}>
            <P5GridTexture />
        </Canvas>
    );
}

const waitForCanvas = async (selector: string) => {
    return new Promise((resolve) => {
        const observer = new MutationObserver(() => {
            const target = document.querySelector(selector);
            if (target) {
                observer.disconnect(); // Stop observing when the element is found
                resolve(target);
            }
        });

        // Start observing the DOM for changes
        observer.observe(document.body, { childList: true, subtree: true });
    });
};

function GridPlane() {
    const { viewport } = useThree();
    const [canvasTexture, setCanvasTexture] =
        React.useState<THREE.CanvasTexture | null>(null);
    const uniforms = React.useRef<any>({
        u_Texture: { value: null },
    });

    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        const target = document.querySelector("#grid-plane-texture");

        console.log("canvasTexture", target);

        if (target) {
            const canvasTexture = new THREE.CanvasTexture(target);
            setCanvasTexture(canvasTexture);
        }
        setCanvasTexture(null);
    }, []);

    // 更新纹理
    React.useEffect(() => {
        const handleResize = () => {
            const target = document.querySelector("#grid-plane-texture");
        };

        // 初始化时调用
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <motion.group>
                {/* Ambient Light */}
                <motion.ambientLight
                    position={[0, 0, 5]}
                    color={"yellow"}
                    intensity={1}
                />

                {/* Mesh */}
                <motion.mesh
                    onPointerEnter={() => {}}
                    onPointerLeave={() => {}}
                >
                    {/* 平面几何 */}

                    {uniforms.current.u_Texture.value && (
                        <>
                            <planeGeometry
                                args={[
                                    viewport.width,
                                    viewport.height,
                                    500,
                                    500,
                                ]}
                            />
                            <shaderMaterial
                                uniforms={uniforms.current}
                                fragmentShader={fragShader}
                                vertexShader={vertShader}
                            />
                        </>
                    )}

                    {/* 材质 */}
                    {/* <meshBasicMaterial
                        onBeforeCompile={(shader) => {
                            // 注入 uniforms
                            shader.uniforms = {
                                ...uniforms.current,
                                ...shader.uniforms,
                            };

                            // 修改顶点着色器
                            shader.vertexShader =
                                vertexChunk1 + shader.vertexShader;
                            shader.vertexShader = shader.vertexShader.replace(
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
                    /> */}
                </motion.mesh>
            </motion.group>
        </>
    );
}

const backgroundPlaneVertex = /* glsl */ `

    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }

`;

const planeShaderFragment = patchShaders(/* glsl */ `
	uniform float uProgress; // Progress of the slide animation (0 to 1)
	uniform sampler2D uColor; // Texture for the plane
	uniform vec2 uResolution; // Resolution of the texture
    uniform vec2 uTextureSize; // Size of the texture
	varying vec2 vUv; // UV coordinates of the plane


	float cubicIn(float t) {
        return t * t * t;
    }


	float cubicOut(float t) {
        float f = t - 1.0;
        return f * f * f + 1.0;
    }

	float cubicInOut(float t) {
        return t < 0.5
          ? 4.0 * t * t * t
          : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
    }

  	float map(float value, float min1, float max1, float min2, float max2) {
    	float val = min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        return clamp(val, min2, max2);
    }

	float PristineGrid(vec2 uv, vec2 lineWidth){
		
        vec4 uvDDXY = vec4(dFdx(uv), dFdy(uv));
        vec2 uvDeriv = vec2(length(uvDDXY.xz), length(uvDDXY.yw));
        bool invertLine = lineWidth.x > 0.5;
        vec2 targetWidth = invertLine ? vec2(1.0) - lineWidth : lineWidth;
        vec2 drawWidth = clamp(targetWidth, uvDeriv, vec2(0.5));
        vec2 lineAA = max(uvDeriv, 0.000001) * 5.5;
        vec2 gridUV = abs(fract(uv) * 2.0 - 1.0);
        gridUV = invertLine ? gridUV : 1.0 - gridUV;
        vec2 grid2 = smoothstep(drawWidth + lineAA, drawWidth - lineAA, gridUV);
        grid2 *= clamp(targetWidth / drawWidth,0.,1.);
        grid2 = mix(grid2, targetWidth, clamp(uvDeriv * 2.0 - vec2(1.0),vec2(0.),vec2(1.)));
        grid2 = invertLine ? 1.0 - grid2 : grid2;

        return mix(grid2.x, 1.0, grid2.y);
    }

    float circle(in vec2 _st, in float _radius){
        vec2 l = _st-vec2(0.5);

        return 1.-smoothstep(_radius-(_radius*0.01),
        _radius+(_radius*0.01),
        dot(l,l)*4.0);
    }

	void main() {

    
    float uAspect = uResolution.x / uResolution.y;

    float s = 25.0;

    vec2 gridSize = vec2(
        s,
        floor(s / uAspect)
    );


    // Calculate the distance from the center based on texture size
    float distanceFromCenter = distance(vUv, vec2(0.5, 0.5));

    // Define max and min radii for the fading effect
    float maxRadius = 0.3;  // Maximum radius for fading
    float minRadius = 0.1;  // Minimum radius for fading

    // Calculate the texture aspect ratio
    float textureAspect = uTextureSize.x / uTextureSize.y;

    // Map the aspect ratio to adjust max distance smoothly
    // We use map to scale the max radius based on aspect ratio
    float maxDistance = map(textureAspect, 0.1, 2.0, 0.3, 0.5);  // Map aspect ratio to distance range

    // Use the map function to calculate radius based on distanceFromCenter and texture size
    float radius = map(distanceFromCenter, 0.0, maxDistance, minRadius, maxRadius);

    // Call the circle function to get the circular mask
    float circularMask = circle(vUv, radius);
        
    // Generate grid pattern with animated line width
    float gridLine = PristineGrid(vUv * gridSize, vec2(0.02));
    
    float gridLineAlpha = mix(0.2, 0.1, 1.0 - circularMask);
    // Set alpha to fully opaque
    gl_FragColor.a = mix(0.,gridLineAlpha, gridLine);

    gl_FragColor.rgb = mix(vec3(0.,0.,0.), vec3(0.,0.,0.) ,  gridLine);

    }
`);

export default GridScene;
