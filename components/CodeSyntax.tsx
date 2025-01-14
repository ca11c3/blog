"use client";

import React, { useContext } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
    vs,
    vs2015,
    stackoverflowLight,
    stackoverflowDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

import { CSSProperties } from "styled-components";
import { ThemeContext } from "./LayoutWrapper";

function CodeSyntax({
    codeString,
    highlightedLines,
}: {
    codeString: string;
    highlightedLines?: number[];
}) {
    const { theme } = useContext(ThemeContext);
    return (
        <SyntaxHighlighter
            language="javascript"
            style={theme === "dark" ? stackoverflowDark : stackoverflowLight}
            showLineNumbers
            lineNumberStyle={(lineNumber) => {
                if (highlightedLines && highlightedLines.includes(lineNumber)) {
                    return {
                        borderLeft: "2px solid rgb(var(--b-accent-green))",
                        paddingLeft: ".8rem",
                    };
                } else {
                    return {
                        paddingLeft: ".8rem",
                    };
                }
            }}
            wrapLines={true}
            // wrapLongLines={true}
            lineProps={(lineNumber) => {
                const style: CSSProperties = {};

                if (highlightedLines?.includes(lineNumber)) {
                    style.backgroundColor = "rgb(var(--b-accent-green),.15)";
                }
                return {
                    style,
                    className: "code-line flex  min-w-full",
                    onMouseEnter: (e: React.MouseEvent) => {
                        const target = e.target as HTMLElement;
                        // Check if the target element contains the `code-line` class
                        if (target.classList.contains("code-line")) {
                            target.classList.add(
                                "hover:bg-[rgba(var(--b-accent-green),.1)]",
                            );
                        }

                        // Alternatively, check if the parent element contains the `code-line` class
                        const parent = target.closest(
                            ".code-line",
                        ) as HTMLElement;
                        if (parent) {
                            parent.classList.add(
                                "hover:bg-[rgba(var(--b-accent-green),.1)]",
                            );
                        }
                    },
                    onMouseLeave: (e: React.MouseEvent) => {
                        const target = e.target as HTMLElement;
                        // Check if the target element contains the `code-line` class
                        if (target.classList.contains("code-line")) {
                            target.classList.remove(
                                "hover:bg-[rgba(var(--b-accent-green),.1)]",
                            );
                        }

                        // Alternatively, check if the parent element contains the `code-line` class
                        const parent = target.closest(
                            ".code-line",
                        ) as HTMLElement;
                        if (parent) {
                            parent.classList.remove(
                                "hover:bg-[rgba(var(--b-accent-green),.1)]",
                            );
                        }
                    },
                };
            }}
            customStyle={{
                padding: "0px",
                fontSize: "14px",
                paddingTop: "3.0rem",
                paddingBottom: ".8rem",
                minWidth: "100%",
                display: "grid",
                width: "100%",
                background: "rgba(var(--b-accent-grey),.2)",
            }}
        >
            {codeString}
        </SyntaxHighlighter>
    );
}

export default CodeSyntax;
