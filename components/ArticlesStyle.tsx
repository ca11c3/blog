import {
    Sandpack,
    SandpackCodeEditor,
    SandpackCodeViewer,
    SandpackLayout,
    SandpackProvider,
} from "@codesandbox/sandpack-react";
import { ArrowRight, CopyIcon } from "lucide-react";
import { PortableText, PortableTextComponents } from "next-sanity";
import { Span } from "next/dist/trace";
import PrimaryButton from "./PrimaryButton";
import CopyButton from "./CopyButton";
import CodeSyntax from "./CodeSyntax";

// import { Refractor, registerLanguage } from "react-refractor";

// Load any languages you want to use from `refractor`

// registerLanguage(ts);

export const articleStyle: PortableTextComponents = {
    marks: {
        strong: ({ children }) => (
            <strong className="text-colors-white-100 font-bold">
                {children}
            </strong>
        ),
        code: ({ children }) => (
            <code className="rounded-lg border-[1px] bg-white bg-opacity-10 p-1 font-mono text-sm text-red-500">
                {children}
            </code>
        ),
    },
    list: ({ children }) => (
        <ul className="my-2 h-fit w-full rounded-lg bg-red-500 p-8">
            {children}
        </ul>
    ),
    listItem: ({ children }) => (
        <li className="my-2 flex items-start gap-x-2 text-base">
            <ArrowRight size={20} className="mt-0.5 text-primary" />

            {children}
        </li>
    ),
    block: {
        normal: ({ children }) => (
            <span className="text-base leading-7 text-secondary-text">
                {children}
                <br />
            </span>
        ),

        h3: ({ children }) => (
            <h3 className="pb-1 pt-2 text-xl font-semibold text-primary-text">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="pb-1 pt-2 text-lg font-bold text-primary-text">
                {children}
            </h4>
        ),
    },
    types: {
        callout: ({ value }) => {
            return (
                <div className="mb-4 mt-2 h-fit w-full rounded-lg bg-red-500 p-8 text-foreground">
                    <PortableText
                        value={value.content}
                        components={calloutStyle}
                    />
                </div>
            );
        },

        code: ({ value }) => (
            <div className="relative mt-2 flex w-[calc(100%_-_0px)] flex-col overflow-hidden rounded-lg">
                <div className="absolute flex w-full items-center justify-between px-4 pt-2 text-primary-text">
                    <div className="rounded-lg bg-background p-1 px-2 font-mono text-sm">
                        {value.filename}
                    </div>
                    <div>
                        <CopyButton code={value.code} />
                    </div>
                </div>

                <div className="rounded-lg">
                    <CodeSyntax
                        codeString={value.code}
                        highlightedLines={value.highlightedLines}
                    />
                </div>
                {/* 
                <Sandpack
                    files={{
                        [`${value.filename}`]: {
                            code: value.code,
                            hidden: false,
                            active: true,
                            readOnly: true,
                        },

                        "pages/index.js": {
                            code: "",
                            hidden: true,
                            active: false,
                        },
                    }}
                    options={{
                        showLineNumbers: true,
                        editorHeight: "100%",
                        showTabs: false,
                        readOnly: true,
                        showNavigator: false,
                        showConsole: false,
                        layout: "editor" as any,
                    }}
                    theme={{
                        colors: {
                            surface1: "#151515",
                        },
                        font: {
                            size: "14px",
                            lineHeight: "18px",
                        },
                    }}
                /> */}
            </div>
        ),
    },
};

const calloutStyle: PortableTextComponents = {
    marks: {
        strong: ({ children }) => (
            <strong className="text-colors-white-100 font-bold">
                {children}
            </strong>
        ),
        code: ({ children }) => (
            <code className="rounded-lg border-[1px] bg-white bg-opacity-10 p-1 font-mono text-sm text-primary">
                {children}
            </code>
        ),
    },
    block: {
        normal: ({ children }) => (
            <span className="text-base leading-7 text-secondary-text">
                {children}
                <br />
            </span>
        ),

        h3: ({ children }) => (
            <h3 className="pb-2 pt-4 text-xl font-semibold text-primary-text">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-lg font-bold text-primary-text">{children}</h4>
        ),
    },
};
