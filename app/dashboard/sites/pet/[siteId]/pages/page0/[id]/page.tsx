import { PaginationProvider } from '@/src/providers/PaginationContext';
import { Article, ListArticle } from '@/src/interfaces/article';
import { ListPage, Page } from '@/src/interfaces/page';
import { Product } from '@/src/interfaces/product';

import { petGetPage0 } from '@/lib/pages/page0/getPage';
import { petGetPages0 } from '@/lib/pages/page0/getPages';
import { petGetPages1WithCursor } from '@/lib/pages/page1/getPagesWithCursor';
// import { GridPetPages1 } from '@/ui/GridPetPages1';
// import { GridPetAdoptions } from '@/ui/GridPetAdoptions';
import { petGetAdoptionsWithCursor } from '@/lib/adoptions/getAdoptionsWithCursor';
import { ListAdoption } from '@/src/interfaces/adoption';
// import { GridPetArticles } from '@/ui/GridPetArticles';
import { petGetArticlesWithCursor } from '@/lib/articles/getArticlesWithCursor';
// import { GridPetServices } from '@/ui/GridPetServices';
import { petGetServicesWithCursor } from '@/lib/services/getServicesWithCursor';
import { ListService } from '@/src/interfaces/service';
import { GridPetPages1 } from '@/ui/grid/GridPetPages1';
import { GridPetArticles } from '@/ui/grid';
// import { Grid } from '@/ui/Grid';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
  params: {
    id: string;
    siteId: string;
  };
}

let adoptions: Product[] = [];
let articles: Article[] = [];
let listPage: ListPage;
let listAdoption: ListAdoption;
let listArticle: ListArticle;
let listService: ListService;

export default async function Page0(props: Props) {
  const { searchParams, params } = props;
  // console.log('props', props)
  const page = await petGetPage0(params.id);
  if (page.data.type.slug === 'blog') {
    listArticle = await petGetArticlesWithCursor({ first: 256 }, params.id);
  }
  if (page.data.type.slug === 'category') {
    listPage = await petGetPages1WithCursor({ first: 256 }, params.id);
  }
  if (page.data.type.slug === 'service') {
    listService = await petGetServicesWithCursor({ first: 256 }, params.id);
  }
  if (page.data.type.slug === 'adoption') {
    listAdoption = await petGetAdoptionsWithCursor({ first: 256 }, params.id);
  }

  // console.log('listAdoption', listAdoption)
  return (
    <PaginationProvider>
      {page.data.type.slug === 'page-blank' && <h1>Page Blank</h1>}
      {page.data.type.slug === 'contact' && <h1>Contact</h1>}
      {page.data.type.slug === 'category' && (
        <GridPetPages1 listPage={listPage} page={page} />
      )}
        {page.data.type.slug === 'blog' && (
          <GridPetArticles listArticle={listArticle} page={page} />
        )}
      {/* {page.data.type.slug === 'adoption' && (
        <GridPetAdoptions listAdoption={listAdoption} page={page} />
      )}
      {page.data.type.slug === 'service' && (
        <GridPetServices listService={listService} page={page} />
      )} */}
    </PaginationProvider>
  );
}

export async function generateStaticParams() {
  const pages = await petGetPages0();
  return pages.map((page) => ({
    siteId: page.data.siteId,
    id: page._id,
  }));
}
