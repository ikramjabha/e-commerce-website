import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductDetailClient from "./ProductDetailClient";
import { getProductBySlugParam, getVariantsForProduct } from "@/lib/airtable";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlugParam(slug);
  if (!product) {
    return { title: "منتج غير موجود" };
  }
  return {
    title: `${product.name} | متجرنا`,
    description: `${product.name} — ${product.price}`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlugParam(slug);
  if (!product) notFound();

  const variants = await getVariantsForProduct(product.name);

  return (
    <div className="flex flex-col min-h-screen js-triggerer">
      <Header />
      <main className="flex-1 w-full">
        <ProductDetailClient product={product} variants={variants} />
      </main>
      <Footer />
    </div>
  );
}
