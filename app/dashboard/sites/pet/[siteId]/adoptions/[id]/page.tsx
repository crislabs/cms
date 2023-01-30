import { petGetAdoption } from "@/lib/adoptions/getAdoption";
import { petGetAdoptions } from "@/lib/adoptions/getAdoptions";
import { AdoptionDetails } from "@/ui/adoption/AdoptionDetail";
import { use } from "react";

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
  params: {
    id: string;
    siteId: string;
  };
}
export default function Page(props: Props) {
  const adoption = use(petGetAdoption(props.params.id))
  return (
    <AdoptionDetails  adoption={adoption} />
  )
}

export async function generateStaticParams() {
  const pages = await petGetAdoptions();
  return pages.map((page) => ({
    siteId: page.parentId,
    id: page._id,
  }));
}