
import { portfolioGetSitesWithCursor } from '@/lib/portfolio/sites/getSitesWithCursor'
import { PaginationProvider } from '@/src/providers/PaginationContext'
import { GridPortfolioSites } from '@/ui/grid/portfolio'


export default async function Page() {
  const listSite = await(portfolioGetSitesWithCursor({first: 256}))
  return (
    <PaginationProvider>
      <GridPortfolioSites listSite={listSite} />
    </PaginationProvider>
  )
}
