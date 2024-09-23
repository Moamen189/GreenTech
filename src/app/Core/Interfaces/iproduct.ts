export interface IProduct {
    sold: number;
    images: string[];
    subcategory: ISubcategory[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: ICategory;
    brand: IBrand;
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    id: string;
}

interface ISubcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

interface ICategory {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

interface IBrand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}
