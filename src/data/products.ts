export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  images?: string[];
  category?: string;
  subcategory?: string;
};

export const ALL_PRODUCTS: Product[] = [
  { id: "pant-5", name: "Burgundy Trousers", price: "2,999", image: "/oldmoney pics/burgundy trousers1.JPG", images: ["/oldmoney pics/burgundy trousers2.JPG", "/oldmoney pics/burgundy trousers3.JPG", "/oldmoney pics/burgundy trousers4.JPG"], category: "trousers", subcategory: "pleated" },
  { id: "pant-6", name: "Gray Pleated Trousers", price: "2,799", image: "/oldmoney pics/gray pleated trousers1.JPG", images: ["/oldmoney pics/gray pleated trousers2.JPG"], category: "trousers", subcategory: "pleated" },
  { id: "shirt-1", name: "Oldmoney Glow Shirt", price: "1,999", image: "/oldmoney pics/OLDMONEY GLOW SHIRT.JPG", images: ["/oldmoney pics/OLDMONEY GLOW SHIRT2.JPG", "/oldmoney pics/OLDMONEY GLOW SHIRT3.JPG", "/oldmoney pics/OLDMONEY GLOW SHIRT4.JPG"], category: "shirts", subcategory: "casual" },
  { id: "shirt-2", name: "Oldmoney Skyblue", price: "1,899", image: "/oldmoney pics/oldmoney skyblue1.JPG", images: ["/oldmoney pics/oldmoney skyblue2.JPG", "/oldmoney pics/oldmoney skyblue3.JPG"], category: "shirts", subcategory: "casual" },
  { id: "shirt-3", name: "Black Shirt", price: "1,799", image: "/oldmoney pics/BLACKSHIRT.JPG", images: [], category: "shirts", subcategory: "casual" },
  { id: "misc-1", name: "Oldmoney Classic", price: "2,499", image: "/oldmoney pics/1000055352.JPG", images: [], category: "accessories", subcategory: "classic" },
];

export const DENIMS = ALL_PRODUCTS;
export const BEST_SELLERS = ALL_PRODUCTS;
export const TOPWEAR = ALL_PRODUCTS;
export const JUST_ARRIVED = ALL_PRODUCTS;

export const getProductById = (id: string) => ALL_PRODUCTS.find((p) => p.id === id);
