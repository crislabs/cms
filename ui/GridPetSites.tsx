'use client';

import { SelectionProvider } from '@/src/providers/SelectionContext';
import { HeadingDashboard } from './HeadingDashboard';
import { HeadingDashboardOption } from './HeadingDashboardOptions';
import { ListSite } from '@/src/interfaces/site';
import { CardSite } from './CardSite';
import { usePetListSite } from '@/src/hooks/sites';

interface Props {
  listSite: ListSite;
}

export function GridPetSites(props: Props) {
  const {data: listSite} = usePetListSite(props.listSite)
  return (
    <SelectionProvider ids={listSite.page.edges?.map(data => data.node._id)}>
      <HeadingDashboard title={"Sites Pet"} />
      <HeadingDashboardOption />

      <div className={'grid-sites'}>
        {listSite.page.edges.map((data, i) => (
          <CardSite key={i} site={data.node} />
          ))}
      </div>
    </SelectionProvider>
  );
}