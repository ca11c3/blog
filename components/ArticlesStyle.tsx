import { PortableTextComponents } from "next-sanity";

export const articleStyle: PortableTextComponents = {
    marks: {
        // Ex. 1: custom renderer for the em / italics decorator
        strong: ({ children }) => (
            <strong className="text-colors-white-100 font-bold">
                {children}
            </strong>
        ),
    },
    block: {
        normal: ({ children }) => (
            <span className="text-colors-white-100 font-light">
                {children}{" "}
            </span>
        ),
    },
};
