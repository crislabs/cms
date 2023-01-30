'use client';

import { SelectionProvider } from '@/src/providers/SelectionContext';
import { Page } from '@/src/interfaces/page';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';

import { usePetGetPage0 } from '@/src/hooks/pages';
import { ListArticle } from '@/src/interfaces/article';
import { usePetListArticles } from '@/src/hooks/articles';
import { CardArticle } from '../card/CardArticle';

interface Props {
  listArticle: ListArticle;
  page: Page
}

export function GridPetArticles(props: Props) {
  const { data: page } = usePetGetPage0(props.page)
  const { data: listArticle } = usePetListArticles(props.listArticle, props.page._id)
  return (
    <SelectionProvider ids={listArticle?.page.edges.map(data => data.node._id)}>
      <HeadingDashboard title={page.data.name} page={page} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {listArticle?.page.edges.map((data, i) => (
          <CardArticle key={i} article={data.node} />
        ))}
      </div>
      {/* //   
    //   {data.pageData.count > 12 && <PaginationPages pages={data} />} */}

    </SelectionProvider>
  );
}