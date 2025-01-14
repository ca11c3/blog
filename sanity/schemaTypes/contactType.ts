import { PhoneCall } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const contactType = defineType({
    name: "contact",
    title: "Contact",
    type: "document",
    icon: PhoneCall,
    fields: [
        defineField({
            name: "portfolioUrl",
            title: "Portfolio URL",
            type: "url",
            validation: (Rule) =>
                Rule.uri({
                    scheme: ["http", "https"], // Ensures the URL starts with http or https
                    allowRelative: false, // Disallows relative URLs
                }),
        }),
        defineField({
            name: "githubUrl",
            title: "GitHub URL",
            type: "url",
            validation: (Rule) =>
                Rule.uri({
                    scheme: ["http", "https"], // Ensures the URL starts with http or https
                    allowRelative: false, // Disallows relative URLs
                }),
        }),
        defineField({
            name: "instagramUrl",
            title: "Instagram URL",
            type: "url",
            validation: (Rule) =>
                Rule.uri({
                    scheme: ["http", "https"], // Ensures the URL starts with http or https
                    allowRelative: false, // Disallows relative URLs
                }),
        }),
        defineField({
            name: "xUrl",
            title: "X URL",
            type: "url",
            validation: (Rule) =>
                Rule.uri({
                    scheme: ["http", "https"], // Ensures the URL starts with http or https
                    allowRelative: false, // Disallows relative URLs
                }),
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "email",
        }),
    ],
    // preview: {
    //   select: {
    //     title: 'title',
    //     author: 'author.name',
    //     media: 'mainImage',
    //   },
    //   prepare(selection) {
    //     const {author} = selection
    //     return {...selection, subtitle: author && `by ${author}`}
    //   },
    // },
});
