import { PortableText, PortableTextComponents } from "next-sanity";
import {
    Sandpack,
    SandpackProvider,
    useSandpack,
} from "@codesandbox/sandpack-react";
import { ArrowRight, Files } from "lucide-react";
import { list } from "postcss";

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
            <span className="text-secondary-text text-base leading-7">
                {children}
                <br />
            </span>
        ),

        h3: ({ children }) => (
            <h3 className="text-primary-text pb-2 pt-4 text-xl font-semibold">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-primary-text text-lg font-bold">{children}</h4>
        ),
    },
    types: {
        callout: ({ value }) => {
            return (
                <div className="my-2 h-fit w-full rounded-lg bg-red-500 p-8 text-foreground">
                    <PortableText
                        value={value.content}
                        components={calloutStyle}
                    />
                </div>
            );
        },
        code: ({ value }) => (
            <Sandpack
                files={{
                    [`${value.filename}`]: `${value.code}`,
                }}
                options={{
                    layout: "console", // preview | tests | console
                }}
                template="react"
            ></Sandpack>
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
            <span className="text-secondary-text text-base leading-7">
                {children}
                <br />
            </span>
        ),

        h3: ({ children }) => (
            <h3 className="text-primary-text pb-2 pt-4 text-xl font-semibold">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-primary-text text-lg font-bold">{children}</h4>
        ),
    },
};
