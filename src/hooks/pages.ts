import { petCreatePage0 } from "@/lib/pages/page0/createPage";
import { petGetPages0WithCursor } from "@/lib/pages/page0/getPagesWithCursor";
import { petUpdatePage0 } from "@/lib/pages/page0/updatePage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Error } from "../interfaces/error";
import { CreatePage, ListPage, Page, UpdatePage } from "../interfaces/page";
import { useUI } from "../providers/UIContext";
import { SwalMessage, SwalMessageError } from "../utils";

export const usePetCreatePage0 = () => {
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreatePage) => await petCreatePage0(input),

    onSuccess: async (data) => {
      queryClient.invalidateQueries([
        'pet-get-pages0-with-cursor',
        { first: 256 },
        data.parentId,
      ]);

      await SwalMessage('Page Created');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}
export const usePetUpdatePage0 = () => {
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdatePage) => await petUpdatePage0(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Page>(['pet-get-page0', data._id], data);
      await SwalMessage('Page Updated');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}

export const usePetListPage0 = (listPage: ListPage, parentId: string) => {
  return useQuery({
   queryKey: ['pet-get-pages0-with-cursor', {first: 256}, parentId],
   queryFn: () => petGetPages0WithCursor({first: 256}, parentId),
   initialData: listPage,
 });
}