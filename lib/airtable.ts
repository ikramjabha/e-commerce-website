const AIRTABLE_BASE = "appPNGhHIntf8vSoG";
export const PRODUCTS_TABLE = "tbl2V5avQ8IhreFq7";
export const VARIANTS_TABLE = "tbltcZA9EF5jiSm7R";

/** Linked record field on variants → products (rename here if your Airtable column differs) */
const VARIANT_PRODUCT_FIELD = "Product référence";

export type Product = {
  id: string;
  name: string;
  price: string;
  priceValue: number | null;
  image: string;
};

export type Variant = {
  id: string;
  color: string;
  size: string;
  stock: number;
};

function mapProductRecord(record: {
  id: string;
  fields: Record<string, unknown>;
}): Product {
  const fields = record.fields;
  const imgs = fields["Product Image"] as { url?: string }[] | undefined;
  const imageUrl =
    imgs?.[0]?.url ||
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80";
  const priceNum =
    typeof fields["Price"] === "number"
      ? fields["Price"]
      : fields["Price"] != null
        ? Number(fields["Price"])
        : null;
  const name = (fields["Product Name"] as string) || "بدون اسم";

  return {
    id: record.id,
    name,
    price: priceNum != null && !Number.isNaN(priceNum) ? `${priceNum} درهم` : "السعر غير متوفر",
    priceValue: priceNum != null && !Number.isNaN(priceNum) ? priceNum : null,
    image: imageUrl,
  };
}

function authHeaders(): HeadersInit {
  const token = process.env.AIRTABLE_API_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE}/${PRODUCTS_TABLE}`,
      {
        headers: authHeaders(),
        next: { revalidate: 10 },
      }
    );
    if (!res.ok) {
      console.error("Failed to fetch products from Airtable");
      return [];
    }
    const data = await res.json();
    return (data.records as { id: string; fields: Record<string, unknown> }[]).map(mapProductRecord);
  } catch (e) {
    console.error(e);
    return [];
  }
}

/** Airtable formula strings use doubled single quotes for a literal quote. */
function escapeFormulaString(s: string): string {
  return s.replace(/'/g, "''");
}

async function getProductByName(name: string): Promise<Product | null> {
  const products = await getProducts();
  const trimmed = name.trim();
  return products.find((p) => p.name === trimmed) ?? null;
}

/** Slug segment is encodeURIComponent(product name). */
export async function getProductBySlugParam(slug: string): Promise<Product | null> {
  try {
    const name = decodeURIComponent(slug);
    return (await fetchProductByExactName(name)) ?? (await getProductByName(name));
  } catch {
    return null;
  }
}

/** Prefer formula filter for a single product by exact name (more efficient than full list). */
export async function fetchProductByExactName(name: string): Promise<Product | null> {
  try {
    const formula = `{Product Name}='${escapeFormulaString(name.trim())}'`;
    const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${PRODUCTS_TABLE}`);
    url.searchParams.set("filterByFormula", formula);
    const res = await fetch(url.toString(), {
      headers: authHeaders(),
      next: { revalidate: 10 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const records = data.records as { id: string; fields: Record<string, unknown> }[];
    if (!records?.length) return null;
    return mapProductRecord(records[0]);
  } catch {
    return null;
  }
}

export async function getVariantsForProduct(productRecordId: string): Promise<Variant[]> {
  try {
    const formula = `{${VARIANT_PRODUCT_FIELD}}='${productRecordId}'`;
    const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${VARIANTS_TABLE}`);
    url.searchParams.set("filterByFormula", formula);

    const res = await fetch(url.toString(), {
      headers: authHeaders(),
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      console.error("Variants fetch failed", res.status);
      return [];
    }
    const data = await res.json();
    return (data.records as { id: string; fields: Record<string, unknown> }[]).map((record) => {
      const f = record.fields;
      const stockRaw = f["Stock"];
      const stock =
        typeof stockRaw === "number"
          ? stockRaw
          : stockRaw != null
            ? Number(stockRaw)
            : 0;
      return {
        id: record.id,
        color: String(f["Color"] ?? "").trim() || "—",
        size: String(f["Size"] ?? "").trim() || "—",
        stock: Number.isFinite(stock) ? stock : 0,
      };
    });
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function productPathFromName(name: string): string {
  return `/product/${encodeURIComponent(name.trim())}`;
}
