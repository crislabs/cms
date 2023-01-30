'use client';

import { SelectionProvider } from '@/src/providers/SelectionContext';
import { ListPage, Page } from '@/src/interfaces/page';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';

import { usePetGetPage0, usePetListPage1 } from '@/src/hooks/pages';
import { CardPage1 } from '../card';

interface Props {
  listPage: ListPage;
  page: Page
}

export function GridPetPages1(props: Props) {
  const { data: page } = usePetGetPage0(props.page)
  const { data: listPage0 } = usePetListPage1(props.listPage, props.page._id)
  return (
    <SelectionProvider ids={listPage0?.page.edges.map(data => data.node._id)}>
      <HeadingDashboard title={page.data.name} page={page} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {listPage0?.page.edges.map((data, i) => (
          <CardPage1 key={i} page={data.node} />
        ))}
      </div>
      {/* //   
    //   {data.pageData.count > 12 && <PaginationPages pages={data} />} */}

    </SelectionProvider>
  );
}