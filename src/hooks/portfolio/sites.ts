import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useUI } from "@/src/providers/UIContext";
import { CreateSite, ListSite, Site, UpdateSite } from "@/src/interfaces/site";
import { SwalMessage, SwalMessageError } from "@/src/utils";
import { Error } from "@/src/interfaces/error";
import { portfolioCreateSite } from "@/lib/portfolio/sites/createSite";
import { portfolioUpdateSite } from "@/lib/portfolio/sites/updateSite";
import { portfolioGetSite } from "@/lib/portfolio/sites/getSite";
import { portfolioGetSitesWithCursor } from "@/lib/portfolio/sites/getSitesWithCursor";

export const usePortfolioCreateSite = () => {
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateSite) => await portfolioCreateSite(input),

    onSuccess: async (data) => {
      queryClient.invalidateQueries([
        'portfolio-get-sites-with-cursor',
        { first: 256 },
      ]);

      await SwalMessage('Site Created');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}
export const usePortfolioUpdateSite = () => {
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateSite) => await portfolioUpdateSite(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Site>(['portfolio-get-site', data._id], data);
      await SwalMessage('Site Updated');
      toggle();
    },
    onError: (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}
export const usePortfolioGetSite = (site: Site) => {
  return useQuery({
    queryKey: ['portfolio-get-site', site._id],
    queryFn: () => portfolioGetSite(site._id),
    initialData: site,
  });
}

export const usePortfolioListSite = (listSite: ListSite) => {
  return useQuery({
   queryKey: ['portfolio-get-sites-with-cursor', {first: 256}],
   queryFn: () => portfolioGetSitesWithCursor({first: 256}),
   initialData: listSite,
 });
}