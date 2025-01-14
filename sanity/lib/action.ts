"use server";

import { groq } from "next-sanity";
import { client } from "./client";

export async function getLandingBody() {
    return client.fetch(
        groq`*[_type == "landingContent"]{
      body,
      greetings,
    }`,
    );
}

export async function getCategories() {
    return client.fetch(
        groq`*[_type == "category"]{
      title,
      slug,
    }`,
    );
}

export async function getPosts() {
    return client.fetch(
        groq`*[_type == "post"]{
      title,
      slug,
      description,
      demoImage,
      demoVideo{
        alt,
        asset->{
          _id,
          url,
        }
      },
      "categories": categories[]->title,
    }`,
    );
}

export async function getPost(slug: string) {
    return client.fetch(
        groq`*[_type == "post" && slug.current == $slug]{
      title,
      description,
      body[]{
        ...,
        _type == "image" => {
          alt,
          asset->{
            _id,
            url,
          }
        },
        _type == "videoFile" => {
          alt,
          asset->{
            _id,
            url,
          }
        }
      },
      "categories": categories[]->title,
    }`,
        { slug },
    );
}

export async function getContact() {
    return client.fetch(
        groq`*[_type == "contact"]{
      email,
      portfolioUrl,
      githubUrl,
      instagramUrl,
      xUrl,
    }`,
    );
}
