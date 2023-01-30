import { petCreatePage0 } from "@/lib/pages/page0/createPage";
import { petGetPage0 } from "@/lib/pages/page0/getPage";
import { petGetPages0WithCursor } from "@/lib/pages/page0/getPagesWithCursor";
import { petUpdatePage0 } from "@/lib/pages/page0/updatePage";
import { petCreatePage1 } from "@/lib/pages/page1/createPage";
import { petGetPage1 } from "@/lib/pages/page1/getPage";
import { petGetPages1WithCursor } from "@/lib/pages/page1/getPagesWithCursor";
import { petUpdatePage1 } from "@/lib/pages/page1/updatePage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Error } from "../interfaces/error";
import { CreatePage, ListPage, Page, UpdatePage } from "../interfaces/page";
import { useUI } from "../providers/UIContext";
import { SwalMessage, SwalMessageError } from "../utils";

export const usePetCreatePage0 = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
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
export const usePetCreatePage1 = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreatePage) => await petCreatePage1(input),

    onSuccess: async (data) => {
      queryClient.invalidateQueries([
        'pet-get-pages1-with-cursor',
        { first: 256 },
        data.parentId,
      ]);

      await SwalMessage('Category Created');
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
export const usePetUpdatePage1 = () => {
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdatePage) => await petUpdatePage1(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Page>(['pet-get-page1', data._id], data);
      await SwalMessage('Category Updated');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}



export const usePetGetPage0 = (page: Page) => {
  return useQuery({
    queryKey: ['pet-get-page0', page._id],
    queryFn: () => petGetPage0(page._id),
    initialData: page,
 });
}
export const usePetGetPage1 = (page: Page) => {
  return useQuery({
    queryKey: ['pet-get-page1', page._id],
    queryFn: () => petGetPage1(page._id),
    initialData: page,
 });
}

export const usePetListPage0 = (listPage: ListPage, parentId: string) => {
  return useQuery({
   queryKey: ['pet-get-pages0-with-cursor', {first: 256}, parentId],
   queryFn: () => petGetPages0WithCursor({first: 256}, parentId),
   initialData: listPage,
 });
}
export const usePetListPage1 = (listPage: ListPage, parentId: string) => {
  return useQuery({
   queryKey: ['pet-get-pages1-with-cursor', {first: 256}, parentId],
   queryFn: () => petGetPages1WithCursor({first: 256}, parentId),
   initialData: listPage,
 });
}