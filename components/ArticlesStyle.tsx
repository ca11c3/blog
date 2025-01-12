import { ArrowRight } from "lucide-react";
import { PortableText, PortableTextComponents } from "next-sanity";
import CodeSyntax from "./CodeSyntax";
import CopyButton from "./CopyButton";
import { link } from "fs";

export const articleStyle: PortableTextComponents = {
    marks: {
        strong: ({ children }) => (
            <strong className="text-colors-white-100 font-bold">
                {children}
            </strong>
        ),
        code: ({ children }) => (
            <code className="text-n-primary rounded-lg p-1 font-mono text-sm">
                {children}
            </code>
        ),
    },
    list: ({ children }) => (
        <ul className="my-2 h-fit w-full rounded-lg bg-[rgba(var(--n-tertiary),.1)] p-8">
            {children}
        </ul>
    ),
    listItem: ({ children }) => (
        <li className="my-2 flex items-start gap-x-2 text-base">
            <ArrowRight size={20} className="text-n-tertiary mt-0.5" />

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

        h3: ({ children, value }) => {
            return (
                <h3
                    className={
                        "scroll-mt-24 pb-1 pt-2 text-xl font-bold text-primary-text"
                    }
                    id={value._key}
                    data-section-id={value._key}
                >
                    {children}
                </h3>
            );
        },
        h4: ({ children }) => (
            <h4 className="pb-1 pt-2 text-lg font-semibold text-primary-text">
                {children}
            </h4>
        ),
    },
    types: {
        callout: ({ value }) => {
            return (
                <div className="mb-4 mt-2 h-fit w-full rounded-lg bg-[rgba(var(--b-primary),0.1)] p-8 text-foreground">
                    <PortableText
                        value={value.content}
                        components={calloutStyle}
                    />
                </div>
            );
        },

        code: ({ value }) => (
            <div className="relative mt-2 flex flex-col overflow-hidden rounded-lg">
                <div className="absolute flex w-full items-center justify-between px-4 pt-2 text-primary-text">
                    <div className="bg-n-secondary text-t-primary rounded-lg p-1 px-2 font-mono text-sm">
                        {value.filename}
                    </div>
                    <div className="hidden md:flex">
                        <CopyButton code={value.code} />
                    </div>
                </div>

                <div className="w-full rounded-lg">
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
            <code className="text-b-primary rounded-lg p-1 font-mono text-sm">
                {children}
            </code>
        ),
        link: ({ children, value }) => {
            const rel = !value.href?.startsWith("/")
                ? "noreferrer noopener"
                : undefined;
            return (
                <a
                    href={value.href}
                    rel={rel}
                    className="font-medium text-secondary-text underline underline-offset-2"
                >
                    {children}
                </a>
            );
        },
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
