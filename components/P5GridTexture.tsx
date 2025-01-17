// * Canvas  Grid
"use client";
import p5 from "p5";
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "./LayoutWrapper";

const DARK_BACKGROUND = "#0d0d0d";
const LIGHT_BORDER = "#bec1c6";
const DARK_BORDER = "#353535";
const LIGHT_BACKGROUND = "#F4F5F7";
const SPACING = 80;
const GRID_SIZE = 78;

function P5GridTexture() {
    const gridTextureRef = useRef<any>(null);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (!gridTextureRef.current) return;

        const { clientWidth, clientHeight } = gridTextureRef.current;

        const p5Instance = new p5((p: p5) => {
            const size: number[][] = [];
            let rows: number, cols: number;

            p.setup = () => {
                const nP = p.createCanvas(clientWidth, clientHeight);
                // nP.id("grid-plane-texture");

                cols = p.width / SPACING;
                rows = p.height / SPACING;
                for (let i = 0; i < cols; i++) {
                    size[i] = [];
                    for (let j = 0; j < rows; j++) {
                        size[i][j] = GRID_SIZE;
                    }
                }
            };

            p.draw = () => {
                const color = p.color(
                    theme === "dark" ? DARK_BORDER : LIGHT_BORDER,
                );

                p.background(color);
                p.rectMode(p.CENTER);

                for (let i = 0; i < cols; i++) {
                    for (let j = 0; j < rows; j++) {
                        p.fill(
                            theme === "dark"
                                ? DARK_BACKGROUND
                                : LIGHT_BACKGROUND,
                        );
                        p.noStroke();

                        p.rect(
                            SPACING / 2 + i * SPACING,
                            SPACING / 2 + j * SPACING,
                            size[i][j],
                            size[i][j],
                            0,
                        );
                    }
                }
            };

            p.windowResized = () => {
                if (!gridTextureRef.current) return;
                const { clientWidth, clientHeight } = gridTextureRef.current;

                p.resizeCanvas(clientWidth, clientHeight);
                cols = p.width / SPACING;
                rows = p.height / SPACING;
                for (let i = 0; i < cols; i++) {
                    size[i] = [];
                    for (let j = 0; j < rows; j++) {
                        size[i][j] = GRID_SIZE;
                    }
                }
            };
        }, gridTextureRef.current);

        return () => {
            p5Instance.remove();
        };
    }, [theme]);

    return (
        <div
            ref={gridTextureRef}
            className="grid-plane-texture h-full w-full"
        ></div>
    );
}

export default P5GridTexture;
