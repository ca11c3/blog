"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function PostTitle({ slug, title }: { slug: string; title: string }) {
    const pathname = usePathname();
    return (
        <Link
            href={`/posts/${slug}`}
            className={
                "text-sm " +
                `${pathname.includes(`/posts/${slug}`) ? "text-primary" : "text-secondary-text"} ` +
                `rounded-md px-1 py-1 hover:bg-[rgba(var(--primary-color),0.2)]`
            }
        >
            {title}
        </Link>
    );
}

export default PostTitle;
