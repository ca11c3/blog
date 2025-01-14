import { ArrowRight } from "lucide-react";
import { PortableText, PortableTextComponents } from "next-sanity";
import Image from "next/image";
import CalloutCard from "./CalloutCard";
import CodeSyntax from "./CodeSyntax";
import CommandCard from "./CommandCard";
import CopyButton from "./CopyButton";
import Video from "./Video";

export const articleStyle: PortableTextComponents = {
    marks: {
        strong: ({ children }) => (
            <strong className="font-bold text-b-accent-info">{children}</strong>
        ),
        code: ({ children }) => (
            <code className="rounded-lg bg-[rgba(var(--b-accent-grey),.2)] p-1 px-2 font-mono text-sm text-b-accent-green">
                {children}
            </code>
        ),
    },
    list: ({ children }) => (
        <ul className="my-2 h-fit w-full rounded-xl bg-[rgba(var(--b-accent-blue-grey),.2)] p-8">
            {children}
        </ul>
    ),
    listItem: ({ children }) => (
        <li className="my-2 flex items-start gap-x-2 text-base">
            <div className="shrink-0">
                <ArrowRight size={20} className="mt-0.5 text-b-accent-info" />
            </div>

            <div className="w-full">{children}</div>
        </li>
    ),
    block: {
        normal: ({ children }) => (
            <span className="text-base leading-7 text-t-tertiary">
                {children}
                <br />
            </span>
        ),

        h3: ({ children, value }) => {
            return (
                <h3
                    className={
                        "scroll-mt-24 pb-1 pt-2 text-xl font-bold text-t-secondary"
                    }
                    id={value._key}
                    data-section-id={value._key}
                >
                    {children}
                </h3>
            );
        },
        h4: ({ children }) => (
            <h4 className="pb-1 pt-2 text-lg font-semibold text-t-primary">
                {children}
            </h4>
        ),
    },
    types: {
        callout: ({ value }) => {
            if (value.style === "info") {
                return (
                    <CalloutCard text={value.title}>
                        <div className="w-full p-4">
                            <PortableText
                                value={value.content}
                                components={{
                                    ...calloutStyle,
                                    ...listInfoCalloutStye,
                                }}
                            />
                        </div>
                    </CalloutCard>
                );
            } else if (value.style == "warning") {
                return (
                    <CalloutCard text={value.title} type="warning">
                        <div className="w-full p-4">
                            <PortableText
                                value={value.content}
                                components={{
                                    ...calloutStyle,
                                    ...listWarningCalloutStye,
                                }}
                            />
                        </div>
                    </CalloutCard>
                );
            } else if (value.style === "command") {
                return (
                    <div className="py-4">
                        <CommandCard
                            copiedText={value.content[0].children[0].text}
                        >
                            <div className="w-full p-4">
                                <PortableText
                                    value={value.content}
                                    components={calloutStyle}
                                />
                            </div>
                        </CommandCard>
                    </div>
                );
            }
        },

        code: ({ value }) => (
            <div className="relative mt-2 flex flex-col overflow-hidden rounded-xl">
                <div className="text-primary-text absolute flex w-full items-center justify-between px-4 pt-2">
                    <div className="rounded-xl bg-[rgba(var(--b-accent-grey),.2)] p-1 px-2 font-mono text-sm text-b-accent-green">
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

        image: ({ value }) => {
            if (value.asset && value.asset.url) {
                return (
                    <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl bg-[rgba(var(--b-accent-blue-grey),.2)] p-2 lg:p-4 xl:p-8">
                        <Image
                            src={value.asset.url}
                            alt={value.alt}
                            height={1080}
                            width={1920}
                            loading="lazy"
                        />
                    </div>
                );
            }
        },
        videoFile: ({ value }) => <Video url={value.asset.url} />,
    },
};

const calloutStyle: PortableTextComponents = {
    marks: {
        code: ({ children }) => (
            <code className="h-full w-full rounded-lg bg-[rgba(var(--b-accent-grey),.3)] p-1 font-mono text-sm text-b-accent-green">
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
                    className="font-medium text-t-tertiary underline underline-offset-2"
                >
                    {children}
                </a>
            );
        },
    },

    block: {
        normal: ({ children }) => (
            <span className="text-base leading-7 text-t-tertiary">
                {children}
                <br />
            </span>
        ),

        h3: ({ children }) => (
            <h3 className="pb-2 pt-4 text-xl font-semibold text-t-secondary">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-lg font-bold text-t-primary">{children}</h4>
        ),
    },
};

const listInfoCalloutStye: PortableTextComponents = {
    marks: {
        ...calloutStyle.marks,
        strong: ({ children }) => (
            <strong className="font-bold text-b-accent-info">{children}</strong>
        ),
    },
    list: ({ children }) => <ul className="w-full">{children}</ul>,
    listItem: ({ children }) => {
        return (
            <li className="my-2 flex w-full items-start gap-x-2 text-base">
                <div className="shrink-0">
                    <ArrowRight
                        size={24}
                        className="mt-0.5 text-b-accent-info"
                    />
                </div>
                <div className="w-full">{children}</div>
            </li>
        );
    },
};

const listSuccessCalloutStye: PortableTextComponents = {
    marks: {
        ...calloutStyle.marks,
        strong: ({ children }) => (
            <strong className="font-bold text-b-accent-success">
                {children}
            </strong>
        ),
    },
    listItem: ({ children }) => {
        return (
            <li className="my-2 flex items-start gap-x-2 text-base">
                <ArrowRight
                    size={20}
                    className="mt-0.5 text-b-accent-success"
                />
                <div className="flex-nowrap">{children}</div>
            </li>
        );
    },
};

const listWarningCalloutStye: PortableTextComponents = {
    marks: {
        ...calloutStyle.marks,
        strong: ({ children }) => (
            <strong className="font-bold text-b-accent-success">
                {children}
            </strong>
        ),
    },
    listItem: ({ children }) => {
        return (
            <li className="my-2 flex min-w-full items-start gap-x-2 text-base">
                <div className="shrink-0">
                    <ArrowRight
                        size={24}
                        className="text-b-accent-warning mt-0.5"
                    />
                </div>
                <div className="w-full">{children}</div>
            </li>
        );
    },
    list: ({ children }) => <ul className="w-full">{children}</ul>,
};
