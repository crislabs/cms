import { petCreateAdoption } from "@/lib/adoptions/createAdoption";
import { petGetAdoption } from "@/lib/adoptions/getAdoption";
import { petGetAdoptionsWithCursor } from "@/lib/adoptions/getAdoptionsWithCursor";
import { petUpdateAdoption } from "@/lib/adoptions/updateAdoption";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Adoption, CreateAdoption, ListAdoption, UpdateAdoption } from "../interfaces/adoption";
import { Error } from "../interfaces/error";
import { useUI } from "../providers/UIContext";
import { SwalMessage, SwalMessageError, SwalMessageSiteCreateError } from "../utils";

export const usePetCreateAdoption = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateAdoption) => await petCreateAdoption(input),

    onSuccess: async (data) => {
      queryClient.invalidateQueries([
        'pet-get-adoptions-with-cursor',
        { first: 256 },
        data.parentId,
      ]);

      await SwalMessage('Adoption Created');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}

export const usePetUpdateAdoption = () => {
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateAdoption) => await petUpdateAdoption(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Adoption>(['pet-get-adoption', data._id], data);
      await SwalMessage('Adoption Updated');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}
// export const usePetUpdateAdoptionContent = () => {
//   const {
//     toggleSlideOversFormAdoption: {
//       value,
//       actions: { toggle, setLeft },
//     },
//   } = useUI();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (input: UpdateContentAdoption) =>
//       await petUpdateAdoptionContent(input),
    
//     onSuccess: async (data) => {
//       queryClient.setQueryData<Adoption>(['pet-get-adoption', data._id], data)
      
//       await SwalMessage('Adoption Content Updated');
//       toggle();
//     },
//     onError:  (err: Error ) => {
//       SwalMessageSiteCreateError( err.response.data.errors[0].message);

//     },
//   });
// }

export const usePetGetAdoption = (page: Adoption) => {
  return useQuery({
    queryKey: ['pet-get-adoption', page._id],
    queryFn: () => petGetAdoption(page._id),
    initialData: page,
 });
}
export const usePetListAdoptions = (listAdoption: ListAdoption, parentId: string) => {
  return useQuery({
   queryKey: ['pet-get-adoptions-with-cursor', {first: 256}, parentId],
   queryFn: () => petGetAdoptionsWithCursor({first: 256}, parentId),
   initialData: listAdoption,
 });
}