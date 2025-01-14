import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { landingType } from "./landingType";
import { postType } from "./postType";
import { contactType } from "./contactType";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [blockContentType, categoryType, postType, landingType, contactType],
};
