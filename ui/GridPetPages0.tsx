'use client';

import { SelectionProvider } from '@/src/providers/SelectionContext';
import { ListPage } from '@/src/interfaces/page';

import { CardPage0 } from './CardPage0';
import { HeadingDashboard } from './HeadingDashboard';
import { HeadingDashboardOption } from './HeadingDashboardOptions';
import { Site } from '@/src/interfaces/site';
import { usePetGetSite } from '@/src/hooks/sites';
import { usePetListPage0 } from '@/src/hooks/pages';

interface Props {
  listPage: ListPage;
  site: Site
}

export function GridPetPages0(props: Props) {
  const { data: site } = usePetGetSite(props.site)
  const { data: listPage0 } = usePetListPage0(props.listPage, props.site._id)
  return (
    <SelectionProvider ids={listPage0?.page.edges.map(data => data.node._id)}>
      <HeadingDashboard title={site.data.name} site={site} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {listPage0?.page.edges.map((data, i) => (
          <CardPage0 key={i} page={data.node} />
        ))}
      </div>
      {/* //   
    //   {data.pageData.count > 12 && <PaginationPages pages={data} />} */}

    </SelectionProvider>
  );
}