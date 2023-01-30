import { petCreateProduct } from "@/lib/products/createProduct";
import { petGetProduct } from "@/lib/products/getProduct";
import { petGetProductsWithCursor } from "@/lib/products/getProductsWithCursor";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product, CreateProduct, ListProduct, UpdateProduct } from "../interfaces/product";
import { Error } from "../interfaces/error";
import { useUI } from "../providers/UIContext";
import { SwalMessage, SwalMessageError, SwalMessageSiteCreateError } from "../utils";
import { petUpdateProduct } from "@/lib/products/updateProduct";

export const usePetCreateProduct = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateProduct) => await petCreateProduct(input),

    onSuccess: async (data) => {
      queryClient.invalidateQueries([
        'pet-get-products-with-cursor',
        { first: 256 },
        data.parentId,
      ]);

      await SwalMessage('Product Created');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}

export const usePetUpdateProduct = () => {
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateProduct) => await petUpdateProduct(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Product>(['pet-get-product', data._id], data);
      await SwalMessage('Product Updated');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}
// export const usePetUpdateProductContent = () => {
//   const {
//     toggleSlideOversFormProduct: {
//       value,
//       actions: { toggle, setLeft },
//     },
//   } = useUI();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (input: UpdateContentProduct) =>
//       await petUpdateProductContent(input),
    
//     onSuccess: async (data) => {
//       queryClient.setQueryData<Product>(['pet-get-product', data._id], data)
      
//       await SwalMessage('Product Content Updated');
//       toggle();
//     },
//     onError:  (err: Error ) => {
//       SwalMessageSiteCreateError( err.response.data.errors[0].message);

//     },
//   });
// }

export const usePetGetProduct = (page: Product) => {
  return useQuery({
    queryKey: ['pet-get-product', page._id],
    queryFn: () => petGetProduct(page._id),
    initialData: page,
 });
}
export const usePetListProducts = (listProduct: ListProduct, parentId: string) => {
  return useQuery({
   queryKey: ['pet-get-products-with-cursor', {first: 256}, parentId],
   queryFn: () => petGetProductsWithCursor({first: 256}, parentId),
   initialData: listProduct,
 });
}