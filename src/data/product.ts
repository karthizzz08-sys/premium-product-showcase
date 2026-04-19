import iphoneFront from "@/assets/iphone-front.jpg";
import iphoneBack from "@/assets/iphone-back.jpg";
import iphoneSide from "@/assets/iphone-side.jpg";
import iphoneCamera from "@/assets/iphone-camera.jpg";

export const product = {
  id: "iphone-15-pro-max",
  name: "iPhone 15 Pro Max",
  tagline: "Titanium. So strong. So light. So Pro.",
  price: 149900,
  discountPrice: 139900,
  rating: 4.8,
  reviews: 2847,
  inStock: true,
  shortDescription:
    "Experience the power of Apple's latest A17 Pro chip with stunning camera quality and titanium design.",
  longDescription:
    "iPhone 15 Pro Max is forged in titanium and features the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever — including a 5x Telephoto lens.",
  highlights: [
    "6.7\" Super Retina XDR display with ProMotion",
    "A17 Pro chip with 6-core GPU",
    "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto",
    "Aerospace-grade titanium design",
    "USB-C with USB 3 speeds",
    "Up to 29 hours of video playback",
  ],
  images: [iphoneFront, iphoneBack, iphoneSide, iphoneCamera],
};

export type Product = typeof product;

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
