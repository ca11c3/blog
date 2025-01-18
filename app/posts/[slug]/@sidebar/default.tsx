import PostTitle from "@/components/Sidebar/PostTitle";
import { getPosts } from "@/sanity/lib/action";
import Link from "next/link";
import React from "react";

async function Sidebar() {
    const posts = await getPosts();

    const groupedByCategory = posts.reduce((acc: any, post: IPost) => {
        post.categories.forEach((category) => {
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(post);
        });
        return acc;
    }, {});

    console.log(groupedByCategory);

    return (
        <div className="text-t-primary px-5">
            {Object.entries(groupedByCategory).map(([category, posts]: any) => (
                <div key={category} className="category-group mb-8">
                    <h2 className="mb-2 text-base font-bold">{category}</h2>
                    <ul className="list-none border-l-[1px]">
                        {posts.map((post: IPost) => (
                            <li key={post._id} className="mb-2">
                                <PostTitle
                                    slug={post.slug.current}
                                    title={post.title}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Sidebar;
