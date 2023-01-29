import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { petGetSitesWithCursor } from "@/lib/sites/getSitesWithCursor";
import { CreateSite, ListSite, Site, UpdateSite } from "../interfaces/site";
import { petGetSite } from "@/lib/sites/getSite";
import { petCreateSite } from "@/lib/sites/createSite";
import { SwalMessage, SwalMessageError } from "../utils";
import { useUI } from "../providers/UIContext";
import { Error } from "../interfaces/error";
import { petUpdateSite } from "@/lib/sites/updateSite";

export const usePetCreateSite = () => {
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateSite) => await petCreateSite(input),

    onSuccess: async (data) => {
      queryClient.invalidateQueries([
        'pet-get-sites-with-cursor',
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
export const usePetUpdateSite = () => {
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateSite) => await petUpdateSite(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Site>(['pet-get-site', data._id], data);
      await SwalMessage('Site Updated');
      toggle();
    },
    onError: (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}
export const usePetGetSite = (site: Site) => {
  return useQuery({
    queryKey: ['pet-get-site', site._id],
    queryFn: () => petGetSite(site._id),
    initialData: site,
  });
}

export const usePetListSite = (listSite: ListSite) => {
  return useQuery({
   queryKey: ['pet-get-sites-with-cursor', {first: 256}],
   queryFn: () => petGetSitesWithCursor({first: 256}),
   initialData: listSite,
 });
}