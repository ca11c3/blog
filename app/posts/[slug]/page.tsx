import { articleStyle } from "@/components/ArticlesStyle";
import ReturnButton from "@/components/ReturnButton";
import { getPost } from "@/sanity/lib/action";
import { PortableText } from "next-sanity";
import React from "react";

type Props = {
    params: {
        slug: string;
    };
};

async function page({ params: { slug } }: Props) {
    const post = await getPost(slug);

    console.log(post[0].body);

    const toc: any = [];
    let h3: any = null;

    post[0].body.forEach((block: any) => {
        if (block._type === "block" && block.style === "h3") {
            // Start a new section for each h3
            h3 = {
                title: block.children.map((child: any) => child.text).join(""),
                subsections: [],
            };
            toc.push(h3);
        } else if (block._type === "block" && block.style === "h4" && h3) {
            // Add h4 as a subsection of the current h3
            h3.subsections.push(
                block.children.map((child: any) => child.text).join(""),
            );
        }
    });

    return (
        <div className="text-secondary-text relative flex h-full w-full gap-x-12">
            <div className="max-w-4xl pt-7">
                <div className="-mt-1 mb-4">
                    <ReturnButton pathnames={"/"} />
                </div>
                <h1 className="text-primary-text mb-2 text-3xl font-bold">
                    {post[0].title}
                </h1>

                <div className="pb-32 pt-4">
                    <PortableText
                        value={post[0].body}
                        components={articleStyle}
                    />
                </div>
            </div>

            <div className="sticky top-32 hidden h-fit w-fit pr-5 xl:block">
                <div className="text-primary-text mb-2 text-sm font-semibold">
                    On this page
                </div>
                <div className="space-y-3">
                    {toc.map((section: any) => (
                        <div key={section.title}>
                            <h2 className="text-sm">{section.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default page;
