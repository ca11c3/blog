import {
    GreetingsCardLeft,
    GreetingsCardRight,
} from "@/components/GreetingsCard";
import Grid from "@/components/Grid";
import GridScene from "@/components/GridScene";
import HorizontalCard from "@/components/HorizontalCard";
import { greetingsStyle, landingStyle } from "@/components/LandingStyle";
import PrimaryButton from "@/components/PrimaryButton";
import VerticalCard from "@/components/VerticalCard";
import { getLandingBody, getPosts } from "@/sanity/lib/action";
import { PortableText } from "next-sanity";

export default async function Home() {
    const landingBody = await getLandingBody();

    const posts = await getPosts();

    return (
        <div className="screen-width relative text-primary-text">
            {/* <div className="top-q absolute left-0 z-0 h-full w-full">
                <Grid></Grid>
            </div> */}

            {/* Quote */}
            <div className="lg:mx-auto lg:max-w-6xl">
                <div className="font-paytone-one text-t-primary flex h-full w-full items-center justify-start text-6xl font-black lg:text-8xl">
                    <h1>
                        CREATE. <br /> <span> BUILD. DEBUG.</span> <br />{" "}
                        <span className="text-n-primary">REPEAT.</span>
                    </h1>
                </div>
            </div>

            {/* Bento */}

            <div className="w-full pt-20 lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-6 lg:space-x-10">
                <div className="w-full pt-12 lg:col-span-3">
                    <GreetingsCardLeft
                        text={
                            <div className="text-base font-bold leading-normal">
                                Greetings
                            </div>
                        }
                    >
                        <PortableText
                            value={landingBody[0].greetings}
                            components={greetingsStyle}
                        />
                    </GreetingsCardLeft>
                </div>
                <div className="w-full pt-12 lg:col-span-3">
                    <GreetingsCardRight
                        text={
                            <div className="text-base font-bold leading-none">
                                Why did I <br />
                                start this blog ?{" "}
                            </div>
                        }
                    >
                        <PortableText
                            value={landingBody[0].body}
                            components={landingStyle}
                        />
                    </GreetingsCardRight>
                </div>
            </div>

            <div className="mb-12 mt-5 pt-20 lg:mx-auto lg:max-w-6xl">
                <h1 className="pb-4 text-[1.75rem] font-bold">All Articles</h1>
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
    );
}
