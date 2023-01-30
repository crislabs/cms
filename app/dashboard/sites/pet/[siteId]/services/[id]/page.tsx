import { petGetProducts } from "@/lib/products/getProducts";
import { petGetServices } from "@/lib/services/getServices";
import { PetProductOverview } from "@/ui/adoption/PetProductOverview";

export default function Page() {
  return (
    <h1>Service</h1>
  )
}
export async function generateStaticParams() {
  const pages = await petGetServices();
  return pages.map((page) => ({
    siteId: page.parentId,
    id: page._id,
  }));
}