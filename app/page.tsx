import {
    GreetingsCardLeft,
    GreetingsCardRight,
} from "@/components/GreetingsCard";
import Grid from "@/components/Grid";
import GridScene from "@/components/GridScene";
import HorizontalCard from "@/components/HorizontalCard";
import { greetingsStyle, landingStyle } from "@/components/LandingStyle";
import PrimaryButton from "@/components/PrimaryButton";
import StaggerObjectSlideIn from "@/components/StaggerObjectSlideIn";
import TextRotateIn from "@/components/TextRotateIn";
import VerticalCard from "@/components/VerticalCard";
import { getLandingBody, getPosts } from "@/sanity/lib/action";
import { PortableText } from "next-sanity";

export default async function Home() {
    const landingBody = await getLandingBody();

    const posts = await getPosts();

    return (
        <div className="screen-width relative text-t-tertiary">
            {/* <div className="top-q absolute left-0 z-0 h-full w-full">
                <Grid></Grid>
            </div> */}

            {/* Quote */}
            <div className="flex h-96 items-center justify-center lg:mx-auto lg:max-w-6xl">
                <div className="flex h-full w-full items-center justify-start font-paytone-one text-6xl font-black text-t-primary lg:text-8xl">
                    <TextRotateIn textType="word" staggerAmount={0.2}>
                        <>
                            CREATE. <br /> <span> BUILD. DEBUG.</span> <br />{" "}
                            <span className="text-n-primary">REPEAT.</span>
                        </>
                    </TextRotateIn>
                </div>
            </div>

            {/* Bento */}

            <StaggerObjectSlideIn className="greetings-card">
                <div className="w-full pt-10 lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-6 lg:space-x-10">
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
                                <div className="text-sm font-bold leading-none">
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
            </StaggerObjectSlideIn>

            <div className="mb-12 mt-5 pt-20 lg:mx-auto lg:max-w-6xl">
                <h1 className="pb-4 text-[1.75rem] font-bold text-t-primary">
                    All Articles
                </h1>
                {/* tags  */}
                <div className="mt-2 flex h-full w-full flex-col space-y-8 pb-16">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post: IPost) => (
                            <VerticalCard key={post._id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
