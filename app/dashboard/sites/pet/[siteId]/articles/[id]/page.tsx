import { petGetArticle } from "@/lib/articles/getArticle";
import { petGetArticles } from "@/lib/articles/getArticles";
import { Article } from "@/ui/Article";
import { use } from "react";

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
  params: {
    id: string;
    siteId: string;
  };
}

export default function Page(props: Props) {
  const article = use(petGetArticle(props.params.id))
  return (
    <Article article={article} />
  )
}
export async function generateStaticParams() {
  const pages = await petGetArticles();
  return pages.map((page) => ({
    siteId: page.parentId,
    id: page._id,
  }));
}