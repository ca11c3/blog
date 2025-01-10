import { PortableTextComponents } from "next-sanity";

export const landingStyle: PortableTextComponents = {
    block: {
        h4: ({ children }) => (
            <div className="text-xl font-light leading-relaxed text-secondary-text lg:text-2xl">
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
                        "pb-1 pt-2 text-2xl font-bold leading-normal text-primary-text lg:text-4xl"
                    }
                >
                    {children}
                </h1>
            );
        },
    },
};
