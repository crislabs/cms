'use client';

import { SelectionProvider } from '@/src/providers/SelectionContext';
import { ListSite } from '@/src/interfaces/site';
import { HeadingDashboard } from '@/ui/HeadingDashboard';
import { HeadingDashboardOption } from '@/ui/HeadingDashboardOptions';
import { CardSite } from '@/ui/card';
import { usePortfolioListSite } from '@/src/hooks/portfolio/sites';


interface Props {
  listSite: ListSite;
}

export function GridPortfolioSites(props: Props) {
  const {data: listSite} = usePortfolioListSite(props.listSite)
  return (
    <SelectionProvider ids={listSite.page.edges?.map(data => data.node._id)}>
      <HeadingDashboard title={"Sites Portfolio"} />
      <HeadingDashboardOption />

      <div className={'grid-sites'}>
        {listSite.page.edges.map((data, i) => (
          <CardSite key={i} site={data.node} />
          ))}
      </div>
    </SelectionProvider>
  );
}