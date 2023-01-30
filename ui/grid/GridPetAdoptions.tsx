'use client';

import { SelectionProvider } from '@/src/providers/SelectionContext';
import { Page } from '@/src/interfaces/page';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';

import { usePetGetPage0 } from '@/src/hooks/pages';
import { ListAdoption } from '@/src/interfaces/adoption';
import { usePetListAdoptions } from '@/src/hooks/adoptions';
import { CardAdoption } from '../card/CardAdoption';

interface Props {
  listAdoption: ListAdoption;
  page: Page
}

export function GridPetAdoptions(props: Props) {
  const { data: page } = usePetGetPage0(props.page)
  const { data: listAdoption } = usePetListAdoptions(props.listAdoption, props.page._id)
  return (
    <SelectionProvider ids={listAdoption?.page.edges.map(data => data.node._id)}>
      <HeadingDashboard title={page.data.name} page={page} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {listAdoption?.page.edges.map((data, i) => (
          <CardAdoption key={i} adoption={data.node} />
        ))}
      </div>
      {/* //   
    //   {data.pageData.count > 12 && <PaginationPages pages={data} />} */}

    </SelectionProvider>
  );
}