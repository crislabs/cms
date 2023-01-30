import { petCreateService } from "@/lib/services/createService";
import { petGetService } from "@/lib/services/getService";
import { petGetServicesWithCursor } from "@/lib/services/getServicesWithCursor";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Service, CreateService, ListService, UpdateService } from "../interfaces/service";
import { Error } from "../interfaces/error";
import { useUI } from "../providers/UIContext";
import { SwalMessage, SwalMessageError, SwalMessageSiteCreateError } from "../utils";
import { petUpdateService } from "@/lib/services/updateService";

export const usePetCreateService = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateService) => await petCreateService(input),

    onSuccess: async (data) => {
      queryClient.invalidateQueries([
        'pet-get-services-with-cursor',
        { first: 256 },
        data.parentId,
      ]);

      await SwalMessage('Service Created');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}

export const usePetUpdateService = () => {
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateService) => await petUpdateService(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Service>(['pet-get-service', data._id], data);
      await SwalMessage('Service Updated');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}
// export const usePetUpdateServiceContent = () => {
//   const {
//     toggleSlideOversFormService: {
//       value,
//       actions: { toggle, setLeft },
//     },
//   } = useUI();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (input: UpdateContentService) =>
//       await petUpdateServiceContent(input),
    
//     onSuccess: async (data) => {
//       queryClient.setQueryData<Service>(['pet-get-service', data._id], data)
      
//       await SwalMessage('Service Content Updated');
//       toggle();
//     },
//     onError:  (err: Error ) => {
//       SwalMessageSiteCreateError( err.response.data.errors[0].message);

//     },
//   });
// }

export const usePetGetService = (page: Service) => {
  return useQuery({
    queryKey: ['pet-get-service', page._id],
    queryFn: () => petGetService(page._id),
    initialData: page,
 });
}
export const usePetListServices = (listService: ListService, parentId: string) => {
  return useQuery({
   queryKey: ['pet-get-services-with-cursor', {first: 256}, parentId],
   queryFn: () => petGetServicesWithCursor({first: 256}, parentId),
   initialData: listService,
 });
}