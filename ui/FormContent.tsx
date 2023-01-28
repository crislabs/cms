'use client'

import { useUI } from "@/src/providers/UIContext";
import { Article, UpdateContentArticle } from "@/src/interfaces/article";

import { SwalMessage, SwalMessageSiteCreateError, typePageEcommerce, typePagePortfolio } from "@/src/utils";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorageState } from "ahooks";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from 'react-hook-form'
import { petUpdateArticleContent } from "@/lib/articles/updateArticle";
import { Error } from "@/src/interfaces/error";
import { usePath } from "@/src/hooks/usePath";


interface Props {
  article?: Article
}

interface FormValues {
  // details: string;
  content: string;
  // type: string;
}


export function FormContent(props: Props) {
  const { article } = props
  const { data: session } = useSession()

  const query = usePath()
  const {
    toggleSlideOversFormArticle: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  const updatePortfolioArticleContent = useMutation({
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
  

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: article
      ? {
        // name: article?.dataProduct.seoProduct.title,
        content: article?.data.content,
        // type: searchParams.get('type') as string,
      }
      : { content: ''}
  });

  setFocus("content", { shouldSelect: false })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const form = {
      content: data.content.trim(),
      uid: session?.user.sid as string || '123456789',
    };
    updatePortfolioArticleContent.mutate({...form, id: query[5]})
    
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
        <div className="flex items-start justify-between">
          <Dialog.Title className="text-lg font-medium text-gray-900">Content</Dialog.Title>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
              onClick={setLeft}
            >
              <span className="sr-only">Close panel</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <div>
              <div className="sm:rounded-md">
                <div className="bg-white">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label className="label-form">Article</label>
                      <div className="mt-1">
                        <textarea
                          rows={30}
                          // value={content}
                          className="input-form"
                          {...register('content', {
                            required: 'Title required!!',
                            minLength: { value: 5, message: 'min 2 characters' },
                          })}
                          // onChange={(e) => setContent(e.target.value)}

                        />
                        {errors.content && (
                          <p className="text-red-600 text-sm">This is required!!</p>
                        )}
                      </div>
                    </div>

                    
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className=" border-t border-gray-200 p-3 bg-gray-200">
        <div className="group-button-form ">
          <button type="submit" className="btn-primary ">
          {updatePortfolioArticleContent.isLoading ? '...Updating' : 'Update'}
            
            {/* {
              isLoading ? '...Saving' : 'Save'
            } */}
          </button>
          <button
            type="button"
            className="btn-default"
            onClick={setLeft}
          // ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>

      </div>

    </form>
  );
}