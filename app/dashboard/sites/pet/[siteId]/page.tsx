import { petGetPages0WithCursor } from '@/lib/pages/page0/getPagesWithCursor'
import { petGetSite } from '@/lib/sites/getSite'
import { petGetSites } from '@/lib/sites/getSites'
import { PaginationProvider } from '@/src/providers/PaginationContext'
import { GridPetPages0 } from '@/ui/grid/GridPetPages0'
// import { GridPetPages0 } from '@/ui/GridPetPages0'

interface Props {
  params: { siteId: string }
}

export default async function Page(props: Props) {
  const site = await(petGetSite(props.params.siteId))
  const listPage = await(petGetPages0WithCursor({first: 256}, props.params.siteId))
  return (
    <PaginationProvider>
      <GridPetPages0 listPage={listPage} site={site}/>
    </PaginationProvider>

  )
}

export async function generateStaticParams() {
  const sites = await petGetSites();
  return sites.map((data) => ({
    siteId: data._id,
  }));
}