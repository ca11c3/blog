"use client";

import React, { useContext } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
            style={theme === "dark" ? vs2015 : vs}
            showLineNumbers
            lineNumberStyle={(lineNumber) => {
                if (highlightedLines && highlightedLines.includes(lineNumber)) {
                    return {
                        borderLeft: "2px solid rgb(var(--b-primary))",
                        paddingLeft: ".8rem",
                    };
                } else {
                    return {
                        paddingLeft: ".8rem",
                    };
                }
            }}
            wrapLines={true}
            lineProps={(lineNumber) => {
                const style: CSSProperties = {
                    display: "block",
                };
                if (highlightedLines?.includes(lineNumber)) {
                    style.backgroundColor = "rgb(var(--b-primary),.2)";
                }
                return {
                    style,
                    className: "code-line md:w-full w-[200%]",
                    onMouseEnter: (e: React.MouseEvent) => {
                        const target = e.target as HTMLElement;
                        // Check if the target element contains the `code-line` class
                        if (target.classList.contains("code-line")) {
                            target.classList.add("hover:bg-n-secondary");
                        }

                        // Alternatively, check if the parent element contains the `code-line` class
                        const parent = target.closest(
                            ".code-line",
                        ) as HTMLElement;
                        if (parent) {
                            parent.classList.add("hover:bg-n-secondary");
                        }
                    },
                    onMouseLeave: (e: React.MouseEvent) => {
                        const target = e.target as HTMLElement;
                        // Check if the target element contains the `code-line` class
                        if (target.classList.contains("code-line")) {
                            target.classList.remove("hover:bg-n-secondary");
                        }

                        // Alternatively, check if the parent element contains the `code-line` class
                        const parent = target.closest(
                            ".code-line",
                        ) as HTMLElement;
                        if (parent) {
                            parent.classList.remove("hover:bg-n-secondary");
                        }
                    },
                };
            }}
            customStyle={{
                padding: "0px",
                fontSize: "12px",
                paddingTop: "3.0rem",
                paddingBottom: ".8rem",
                backgroundColor: "rgb(var(--foreground))",
            }}
        >
            {codeString}
        </SyntaxHighlighter>
    );
}

export default CodeSyntax;
