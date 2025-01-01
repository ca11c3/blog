import { FolderIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const landingType = defineType({
    name: "landingContent",
    title: "Landing Content",
    type: "document",
    icon: FolderIcon,
    fields: [
        defineField({
            name: "iconDark",
            title: "Icon Dark",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", title: "Alt", type: "string" }],
        }),
        defineField({
            name: "iconLight",
            title: "Icon Light",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", title: "Alt", type: "string" }],
        }),

        defineField({
            title: "Landing Content",
            name: "body",
            type: "blockContent",
        }),
    ],
});
