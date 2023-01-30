
import { PaginationProvider } from '@/src/providers/PaginationContext';
import { Article, ListArticle } from '@/src/interfaces/article';
import { ListPage, Page } from '@/src/interfaces/page';
import { ListProduct, Product } from '@/src/interfaces/product';
// import { petGetPage0, petGetPage0s, petGetPageAxios } from '@/lib/pages/page0/getPage';
// import { petGetPages0 } from '@/lib/pages/page0/getPages';
import { use } from 'react';

import { ListAdoption } from '@/src/interfaces/adoption';
import { petGetPages1 } from '@/lib/pages/page1/getPages';
import { petGetPage1 } from '@/lib/pages/page1/getPage';
import { petGetProductsWithCursor } from '@/lib/products/getProductsWithCursor';
import { GridPetProducts } from '@/ui/grid/GridPetProducts';
// import { Grid } from '@/ui/Grid';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
  params: { 
    siteId: string
    id: string

   }
}

let adoptions: Product[] = []
let articles: Article[] = []
let listPage: ListPage 
let listAdoption: ListAdoption 
let listProduct: ListProduct 
let listArticle: ListArticle 



export default function Page1(props: Props) {
  const { searchParams, params } = props
  const page = use(petGetPage1(params.id))
  // const pageAxios = use(petGetPageAxios(params.page0Id))
  // console.log('pageAxios', pageAxios)
  // const pages = use(petGetPages0BySiteId(props.params.siteId))
  // console.log('pages', pages)
  // console.log('page', page)
  // if (page.dataPage.type === 'adoption') {
  //   adoptions = use(petGetAdoptionsByParentId(params.page0Id))
  // }
  // if (page.dataPage.type === 'blog') {
  //   articles = use(petGetArticlesByParentId(params.page0Id))
  // }
  // if (['page', 'category'].includes(page.data.type.slug)) {
  //   listPage = use(petGetPages1WithCursor({first: 256}, page._id))
  // }
  if (page.data.type.slug === 'product') {
    listProduct = use(petGetProductsWithCursor({first: 256}, params.id))
  }
  // if (page.data.type.slug === 'blog') {
  //   listArticle = use(petGetArticlesWithCursor({first: 256}, page._id))
  // }
  // console.log('listAdoption', listAdoption)
  return (
    <PaginationProvider>
      {
        page.data.type.slug === 'page-blank' && 
        <h1>Page Blank</h1>
      }
      {
        page.data.type.slug === 'category' && 
        <h1>Category</h1>
      }
      {
        page.data.type.slug === 'product' && 
        <GridPetProducts listProduct={listProduct} page={page} />

      }
      {/* {
        page.data.type.slug === 'adoption' && 
        <GridPetAdoptions listAdoption={listAdoption} page={page} />

      }
      {
        page.data.type.slug === 'blog' && 
        <GridPetArticles listArticle={listArticle} page={page} />
      }
      {
        ['page', 'category'].includes(page.data.type.slug)  && 
        <GridPetPages1 listPage={listPage} page={page} />
      } */}
      
    </PaginationProvider>
  )
}

export async function generateStaticParams() {
  const pages = await petGetPages1();
  return pages.map((page) => ({
    siteId: page.data.siteId,
    id: page._id,
  }));
}