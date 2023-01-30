import { petCreateArticle } from "@/lib/articles/createArticle";
import { petGetArticle } from "@/lib/articles/getArticle";
import { petGetArticlesWithCursor } from "@/lib/articles/getArticlesWithCursor";
import { petUpdateArticle, petUpdateArticleContent } from "@/lib/articles/updateArticle";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Article, CreateArticle, ListArticle, UpdateArticle, UpdateContentArticle } from "../interfaces/article";
import { Error } from "../interfaces/error";
import { useUI } from "../providers/UIContext";
import { SwalMessage, SwalMessageError, SwalMessageSiteCreateError } from "../utils";

export const usePetCreateArticle = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateArticle) => await petCreateArticle(input),

    onSuccess: async (data) => {
      queryClient.invalidateQueries([
        'pet-get-articles-with-cursor',
        { first: 256 },
        data.parentId,
      ]);

      await SwalMessage('Article Created');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}

export const usePetUpdateArticle = () => {
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateArticle) => await petUpdateArticle(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Article>(['pet-get-article', data._id], data);
      await SwalMessage('Article Updated');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}
export const usePetUpdateArticleContent = () => {
  const {
    toggleSlideOversFormArticle: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateContentArticle) =>
      await petUpdateArticleContent(input),
    
    onSuccess: async (data) => {
      queryClient.setQueryData<Article>(['pet-get-article', data._id], data)
      
      await SwalMessage('Article Content Updated');
      toggle();
    },
    onError:  (err: Error ) => {
      SwalMessageSiteCreateError( err.response.data.errors[0].message);

    },
  });
}

export const usePetGetArticle = (page: Article) => {
  return useQuery({
    queryKey: ['pet-get-article', page._id],
    queryFn: () => petGetArticle(page._id),
    initialData: page,
 });
}
export const usePetListArticles = (listArticle: ListArticle, parentId: string) => {
  return useQuery({
   queryKey: ['pet-get-articles-with-cursor', {first: 256}, parentId],
   queryFn: () => petGetArticlesWithCursor({first: 256}, parentId),
   initialData: listArticle,
 });
}