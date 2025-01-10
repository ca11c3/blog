"use server";

import { groq } from "next-sanity";
import { client } from "./client";

export async function getLandingBody() {
    return client.fetch(groq`*[_type == "landingContent"]{
    body,
    greetings,
  }`);
}

export async function getCategories() {
    return client.fetch(groq`*[_type == "category"]{
    title,
    slug,
  }`);
}

export async function getPosts() {
    return client.fetch(groq`*[_type == "post"]{
    title,
    slug,
    body,
    mainImage,
    "categories": categories[]->title,
  }`);
}

export async function getPost(slug: string) {
    return client.fetch(
        groq`*[_type == "post" && slug.current == $slug]{
    title,
    body,
    mainImage,
    "categories": categories[]->title,
  }`,
        { slug },
    );
}
