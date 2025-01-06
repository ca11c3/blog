import GridScene from "@/components/GridScene";
import HorizontalCard from "@/components/HorizontalCard";
import PrimaryButton from "@/components/PrimaryButton";
import VerticalCard from "@/components/VerticalCard";
import { getLandingBody, getPosts } from "@/sanity/lib/action";
import { PortableText } from "next-sanity";

export default async function Home() {
    const landingBody = await getLandingBody();

    // console.log(landingBody[0].body);

    const posts = await getPosts();

    return (
        <div className="screen-width text-primary-text">
            <div className="relative h-[15rem] w-full md:h-[25rem]">
                <div className="absolute z-10 flex h-full w-full items-center justify-center text-center text-5xl font-black text-secondary md:text-5xl lg:text-7xl">
                    <h1>
                        CREATE. <br /> <span> BUILD. DEBUG.</span> <br />{" "}
                        REPEAT.
                    </h1>
                </div>
                <div className="absolute left-0 top-0 z-0 h-full w-full">
                    <GridScene />
                </div>
            </div>

            <div className="content-width">
                <div className="mt-16 text-lg font-medium">
                    <PortableText value={landingBody[0].body} />
                </div>

                <div>
                    <h1 className="mb-8 mt-16 text-[1.75rem] font-bold">
                        Latest Article
                    </h1>
                    {/* Latest Article Cards */}
                    <div>{/* <VerticalCard /> */}</div>
                </div>

                <div className="mb-24 mt-16">
                    <h1 className="text-[1.75rem] font-bold">All Articles</h1>
                    {/* tags  */}
                    <div className="mt-2 flex h-full w-full flex-col space-y-8">
                        <div>
                            <PrimaryButton>
                                <div className="px-4">All</div>
                            </PrimaryButton>
                        </div>

                        {/* Cards */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post: IPost) => (
                                <VerticalCard key={post._id} post={post} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
