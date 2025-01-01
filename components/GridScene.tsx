"use client";

import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, useAspect } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { patchShaders } from "gl-noise";
import * as THREE from "three";

function GridScene() {
    return (
        <Canvas style={{ width: "fit" }}>
            <GridPlane />
            <directionalLight position={[0, 1, 0]} />
            <Environment preset="city" />
        </Canvas>
    );
}

function GridPlane() {
    const { size, viewport } = useThree();

    console.log(viewport.width);

    const uniforms = React.useRef({
        uResolution: { value: new THREE.Vector2(1024, 1024) },
        uTextureSize: { value: new THREE.Vector2(size.width, size.height) },
    });

    return (
        <motion.group>
            <motion.mesh
                scale={viewport.width * 1.5}
                onPointerEnter={() => {}}
                onPointerLeave={() => {}}
            >
                <planeGeometry args={[1, 1]} />
                <shaderMaterial
                    vertexShader={backgroundPlaneVertex}
                    fragmentShader={planeShaderFragment as string}
                    uniforms={uniforms.current}
                    toneMapped={false}
                />
            </motion.mesh>
        </motion.group>
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
