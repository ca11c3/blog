import { PortableTextComponents } from "next-sanity";

export const landingStyle: PortableTextComponents = {
    block: {
        h4: ({ children }) => (
            <div className="text-xl font-light leading-normal tracking-tight">
                {children}
            </div>
        ),
    },
};

export const greetingsStyle: PortableTextComponents = {
    block: {
        h1: ({ children }) => {
            return (
                <h1
                    className={
                        "text-2xl font-semibold leading-normal tracking-tight"
                    }
                >
                    {children}
                </h1>
            );
        },
    },
};
