"use server";

import { groq } from "next-sanity";
import { client } from "./client";

export async function getLanding() {
    return client.fetch(groq`*[_type == "project"]{
    _id,
    _createdAt,
    title,
    description,
    devType,
    techUsed,
    coverImage{
    alt,
    asset->{
      _id,
      url,
    }
  },
     screenshots[]{
    alt,
    asset->{
      _id,
      url,
    }
  },
    demoUrl,
    sourceCodeUrl,
    isDisplay,
    slug,
  }`);
}

export async function getLandingBody() {
    return client.fetch(groq`*[_type == "landingContent"]{
    body,
  }`);
}
