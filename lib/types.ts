import { CommentStatus } from "@prisma/client"; // adjust this import if needed

export type LodgeCardData = {
  id: string;
  refNo: string;
  name: string;
  nickname: string;
  address: string;
  features: string[];
  images: string[];
  price: number;
  guests: number;
  bedrooms: string;
  bathrooms: string;
};


export type PropertyDetailsType = {
  price: number;
  id: string;
  address: string;
  name: string;
  description: string;
  images: string[];
  refNo: string;
  longitude: number;
  latitude: number;
  features: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  guests: number;
  bathrooms: string;
  bedrooms: string;
  cleaning_fee: number;
  nickname: string;
  pets: number;
  pets_fee: number;
  checkInTime: string | null;
  checkOutTime: string | null;
  maxStay: number;
  minStay: number;
  calendar: {
    date: string;
    available: boolean;
    day_rate: number;
    closed_for_arrival: boolean;
  }[];
  comments: {
    id: string;
    content: string;
    status: CommentStatus;
    createdAt: Date;
    updatedAt: Date;
    propertyId: string;
    visitorId: string;
    rating: number | null;
    reply: string | null;
  }[];
}
