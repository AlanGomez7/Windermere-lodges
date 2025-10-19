import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { amenityIcons } from "./icons";
import { DateRange } from "react-day-picker";
import { eachDayOfInterval, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCreditCardNumber(value: string): string {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  }
  return value;
}

export function formatExpiryDate(value: string): string {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

  if (v.length >= 2) {
    const month = v.slice(0, 2);
    const year = v.slice(2);
    if (parseInt(month) > 12) {
      return "12" + (year ? "/" + year : "");
    }
    return month + (year ? "/" + year : "");
  }
  return v;
}

export function formatCVC(value: string): string {
  return value
    .replace(/\s+/g, "")
    .replace(/[^0-9]/gi, "")
    .slice(0, 3);
}

export function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // Call the parent Error class constructor
    this.name = "HttpError"; // Set the name of the error for identification
    this.statusCode = statusCode;
  }
}

type Resource = {
  id: string;
  type: string;
  attributes?: Record<string, any>;
  relationships?: Record<
    string,
    { data: { id: string; type: string } | { id: string; type: string }[] }
  >;
};

export function hydrateResourceById(
  id: string,
  data: Resource[],
  included: Resource[]
): any | null {
  // lookup table: "type-id" => resource
  const includedMap = Object.fromEntries(
    included.map((item) => [`${item.type}-${item.id}`, item])
  );

  function resolveRelationship(rel: any) {
    if (!rel) return null;

    if (Array.isArray(rel.data)) {
      // to-many relationship
      return rel.data.map((r: any) => {
        const found = includedMap[`${r.type}-${r.id}`];
        return found ? { ...r, ...found.attributes } : r;
      });
    } else {
      // to-one relationship
      const r = rel.data;
      if (!r) return null;
      const found = includedMap[`${r.type}-${r.id}`];
      return found ? { ...r, ...found.attributes } : r;
    }
  }

  // find the main resource
  const item = data.find((d) => d.id === id);
  if (!item) return null;

  const hydrated: any = { ...item, attributes: { ...item.attributes } };

  if (item.relationships) {
    hydrated.relationships = Object.fromEntries(
      Object.entries(item.relationships).map(([key, rel]) => [
        key,
        resolveRelationship(rel),
      ])
    );
  }

  return hydrated;
}

export const findDays = (
  checkIn: Date | undefined,
  checkOut: Date | undefined
) => {
  if (checkIn && checkOut) {
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    // Difference in milliseconds
    const diffMs = date2.getTime() - date1.getTime();
    // Convert ms to days (1000 ms * 60 sec * 60 min * 24 hr)
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  return 0;
};

export const ratingsInfo = (comments: Record<any, string>[]) => {
  const numberOfReviews = comments.length;
  const sum = comments.reduce((acc: number, curr: any) => {
    acc = curr.rating + acc;
    return acc;
  }, 0);

  const rating = sum / numberOfReviews;
  return [Number(rating.toFixed(1)), numberOfReviews];
};

type RatingItem = { rating: number; count: number };

export function normalizeRatings(
  response: { rating: number | null; _count: { rating: number } }[]
): RatingItem[] {
  const map = new Map<number, number>();

  response.forEach((r) => {
    if (r.rating) {
      map.set(r.rating, r._count.rating);
    }
  });

  return Array.from({ length: 5 }, (_, i) => {
    const rating = i + 1;
    return { rating, count: map.get(rating) ?? 0 };
  });
}

export const formatDate = (dateStr: Date | undefined) => {
  if (dateStr) {
    const date = new Date(dateStr);

    const formatted = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(date);

    return formatted;
  }
};

export function getAmenityIcon(name: string) {
  const key = name.toLowerCase(); // normalize string
  return amenityIcons[key] || amenityIcons["info"]; // fallback to default if missing
}

export function findDiscountAmount(appliedCoupon: any, price: number) {
  if (appliedCoupon.discountType === "FIXED") {
    return price - appliedCoupon.discountValue;
  } else {
    const percentValue = Math.ceil((price * appliedCoupon.discountValue) / 100);
    return price - percentValue;
  }
}

export function findDiscountValue(appliedCoupon: any, price: number) {
  if (appliedCoupon.discountType === "FIXED") {
    return price - appliedCoupon.discountValue;
  } else {
    const percentValue = Math.ceil((price * appliedCoupon.discountValue) / 100);

    return percentValue;
  }
}

export function toLocalDate(dateString: any) {
  const [y, m, d] = dateString.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function calculatePrices(
  dateRange: DateRange | undefined,
  lodge: any
  // dataMap: any
) {
  if (!dateRange?.from || !dateRange?.to) {
    return lodge?.price;
  }

  const dataMap = Object.fromEntries(
    lodge.calendar.map((d: any) => [
      format(toLocalDate(d.date), "yyyy-MM-dd"),
      d,
    ])
  );

  const days = eachDayOfInterval({
    start: dateRange?.from,
    end: dateRange?.to,
  });
  const formattedDays = days.map((d) => {
    return format(d, "yyyy-MM-dd");
  });

  let total = 0;

  for (const day of formattedDays.slice(0, formattedDays.length - 1)) {
    const data = dataMap[day];
    total = total + data.day_rate;
  }

  return total;
}
