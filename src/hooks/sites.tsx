'use client'
import { useQuery } from "@tanstack/react-query";
import { petGetSitesWithCursor } from "@/lib/sites/getSitesWithCursor";
import { ListSite } from "../interfaces/site";

export const useListSite = (listSite: ListSite) => {

  return useQuery({
   queryKey: ['pet-get-sites-with-cursor', {first: 256}],
   queryFn: () => petGetSitesWithCursor({first: 256}),
   initialData: listSite,
 });
}