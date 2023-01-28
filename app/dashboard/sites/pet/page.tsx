
import { petGetSitesWithCursor } from '@/lib/sites/getSitesWithCursor'
import { PaginationProvider } from '@/src/providers/PaginationContext'
import { GridPetSites } from '@/ui/GridPetSites'

export default async function Page() {
  const listSite = await(petGetSitesWithCursor({first: 256}))
  return (
    <PaginationProvider>
        <GridPetSites listSite={listSite} />
    </PaginationProvider>
  )
}
