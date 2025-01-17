import { articleStyle } from "@/components/ArticlesStyle";
import ReturnButton from "@/components/ReturnButton";
import TableOfContent from "@/components/TableOfContent";
import { getPost } from "@/sanity/lib/action";
import { PortableText } from "next-sanity";

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
                key: block._key,
            };
            toc.push(h3);
        }
        // } else if (block._type === "block" && block.style === "h4" && h3) {
        //     // Add h4 as a subsection of the current h3
        //     h3.subsections.push(
        //         block.children.map((child: any) => child.text).join(""),
        //     );
        // }
    });

    return (
        <div className="flex min-h-screen w-full gap-x-12 px-5 text-t-secondary lg:px-0">
            <div className="blog-post mx-auto mt-32 w-full overscroll-y-auto scroll-smooth lg:max-w-3xl lg:pr-5 xl:max-w-4xl xl:pr-0">
                <div className="-mt-1 mb-4">
                    <ReturnButton pathnames={"/"} />
                </div>
                <h1 className="text-primary-text mb-2 text-3xl font-bold">
                    {post[0].title}
                </h1>
                <h2 className="my-4 text-base text-t-tertiary">
                    {post[0].description}
                </h2>

                <div className="pb-32 pt-4">
                    <PortableText
                        value={post[0].body}
                        components={articleStyle}
                    />
                </div>
            </div>

            <div className="sticky top-32 hidden h-fit max-h-[calc(100vh_-_190px)] w-fit pr-5 xl:block">
                <div className="text-primary-text mb-2 text-sm font-semibold">
                    On this page
                </div>
                <div className="space-y-3">
                    <TableOfContent toc={toc} />
                </div>
            </div>
        </div>
    );
}

export default page;
