import {
    GreetingsCardLeft,
    GreetingsCardRight,
} from "@/components/GreetingsCard";
import GridScene from "@/components/GridScene";
import HorizontalCard from "@/components/HorizontalCard";
import { greetingsStyle, landingStyle } from "@/components/LandingStyle";
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
            {/* <div className="absolute left-0 top-0 z-0 h-full w-full">
                <GridScene />
            </div> */}
            <div className="relative h-[65vh] w-full">
                <div className="absolute z-10 flex h-full w-full items-center justify-start text-6xl font-black text-secondary lg:text-8xl">
                    <h1>
                        CREATE. <br /> <span> BUILD. DEBUG.</span> <br />{" "}
                        REPEAT.
                    </h1>
                </div>
            </div>

            <div className="">
                <div className="lg:flex lg:justify-between lg:gap-x-5">
                    <div className="w-full lg:w-[50vw]">
                        <GreetingsCardRight
                            text={<div className="text-xl">Greetings</div>}
                        >
                            <PortableText
                                value={landingBody[0].greetings}
                                components={greetingsStyle}
                            />
                        </GreetingsCardRight>
                    </div>
                    <div className="w-full pt-12 lg:w-[40vw] lg:pt-24">
                        <GreetingsCardLeft
                            text={
                                <div className="text-md leading-tight">
                                    Why did I <br />
                                    start this blog ?{" "}
                                </div>
                            }
                        >
                            <PortableText
                                value={landingBody[0].body}
                                components={landingStyle}
                            />
                        </GreetingsCardLeft>
                    </div>
                </div>

                {/* <div>
                    <h1 className="mb-8 mt-16 text-[1.75rem] font-bold">
                        Latest Article
                    </h1>
             
                </div> */}

                <div className="mb-24 mt-5">
                    <h1 className="pb-4 text-[1.75rem] font-bold">
                        All Articles
                    </h1>
                    {/* tags  */}
                    <div className="mt-2 flex h-full w-full flex-col space-y-8">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
