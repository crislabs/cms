import { petGetProducts } from "@/lib/products/getProducts";
import { PetProductOverview } from "@/ui/adoption/PetProductOverview";

export default function Page() {
  return (
    <PetProductOverview/>
  )
}
export async function generateStaticParams() {
  const pages = await petGetProducts();
  return pages.map((page) => ({
    siteId: page.parentId,
    id: page._id,
  }));
}