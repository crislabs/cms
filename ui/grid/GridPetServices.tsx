'use client';

import { SelectionProvider } from '@/src/providers/SelectionContext';
import { Page } from '@/src/interfaces/page';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';

import { usePetGetPage0 } from '@/src/hooks/pages';
import { ListService } from '@/src/interfaces/service';
import { usePetListServices } from '@/src/hooks/services';
import { CardService } from '../card/CardService';

interface Props {
  listService: ListService;
  page: Page
}

export function GridPetServices(props: Props) {
  const { data: page } = usePetGetPage0(props.page)
  const { data: listService } = usePetListServices(props.listService, props.page._id)
  return (
    <SelectionProvider ids={listService?.page.edges.map(data => data.node._id)}>
      <HeadingDashboard title={page.data.name} page={page} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {listService?.page.edges.map((data, i) => (
          <CardService key={i} service={data.node} />
        ))}
      </div>
      {/* //   
    //   {data.pageData.count > 12 && <PaginationPages pages={data} />} */}

    </SelectionProvider>
  );
}