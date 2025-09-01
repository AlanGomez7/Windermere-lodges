import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCreditCardNumber(value: string): string {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
  const matches = v.match(/\d{4,16}/g)
  const match = (matches && matches[0]) || ""
  const parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    return parts.join(" ")
  }
  return value
}

export function formatExpiryDate(value: string): string {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
  
  if (v.length >= 2) {
    const month = v.slice(0, 2)
    const year = v.slice(2)
    if (parseInt(month) > 12) {
      return "12" + (year ? "/" + year : "")
    }
    return month + (year ? "/" + year : "")
  }
  return v
}

export function formatCVC(value: string): string {
  return value.replace(/\s+/g, "").replace(/[^0-9]/gi, "").slice(0, 3)
}

export function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}


export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // Call the parent Error class constructor
    this.name = 'HttpError'; // Set the name of the error for identification
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
      return rel.data.map((r:any) => {
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


