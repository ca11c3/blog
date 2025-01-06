interface IPost {
    _id: string;
    title: string;
    slug: { current: string; _type: string };
    mainImage: { asset: { url: string; _id: string } };
    categories: string[];
}
