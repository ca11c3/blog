interface IPost {
    _id: string;
    title: string;
    slug: { current: string; _type: string };
    description: string;
    demoImage: { asset: { url: string; _id: string } };
    demoVideo: { asset: { url: string; _id: string } };
    categories: string[];
}

interface IContact {
    email: string;
    githubUrl: string;
    instagramUrl: string;
    portfolioUrl: null;
    xUrl: string;
}
