'use client';
import { useUI } from '@/src/providers/UIContext';
import {
  CreatePage,
  Page,
} from '@/src/interfaces/page';

import {
  SwalMessage,
  SwalMessageSiteCreateError,
  typePagePet,
} from '@/src/utils';
import { Dialog } from '@headlessui/react';
import { MinusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import {  Article, UpdateArticle } from '@/src/interfaces/article';
import { CreateArticle } from '@/src/interfaces/article';
import { petCreateArticle } from '@/lib/articles/createArticle';
import { petUpdateArticle } from '@/lib/articles/updateArticle';
import { usePath } from '@/src/hooks/usePath';

interface Error {
  response: { data: { errors: [{ message: string }] }};
}

interface Props {
  article?: Article;
}

interface FormValues {
  name: string;
  description: string;
  type: string;
}

export function FormArticle(props: Props) {
  const { article } = props;
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const query = usePath();
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();
  const createPetArticle = useMutation({
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
      SwalMessageSiteCreateError( err.response.data.errors[0].message);
    },
  });
  const updatePetArticle = useMutation({
    mutationFn: async (input: UpdateArticle) => await petUpdateArticle(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Article>(['pet-get-article', data._id], data);
      await SwalMessage('Article Updated');
      toggle();
    },
    onError: (err: Error) => {
      SwalMessageSiteCreateError( err.response.data.errors[0].message);

    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: article
      ? {
          name: article?.data.name,
          description: article?.data.description,
        }
      : { name: '', description: 'article description', type: 'article' },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const create = {
      name: data.name.trim(),
      description: data.description.trim(),
      siteId: query[3],
      uid: session?.user.sid as string || '123456789',
    };
    const update = {
      id: article?._id as string,
      name: data.name.trim(),
      description: data.description.trim(),
      siteId: query[3],
      uid: session?.user.sid as string || '123456789',
    };
    {
      if (article) {
        updatePetArticle.mutate({ ...update, parentId: query[5] });
      } else {
        createPetArticle.mutate({ ...create, parentId: query[6] });
        
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
    >
      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
        <div className="flex items-start justify-between">
          <Dialog.Title className="text-lg font-medium text-gray-900">
            {article ? 'Edit Article' : 'New Article'}
          </Dialog.Title>
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
                      <label className="label-form">Title</label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="input-form"
                        {...register('name', {
                          required: 'Title required!!',
                          minLength: { value: 2, message: 'min 2 characters' },
                        })}
                      />
                      {errors.name && (
                        <p className="text-red-600 text-sm">
                          This is required!!
                        </p>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label className="label-form">Description</label>
                      <div className="mt-1">
                        <textarea
                          rows={3}
                          className="input-form"
                          {...register('description', {
                            required: 'Title required!!',
                            minLength: {
                              value: 2,
                              message: 'min 2 characters',
                            },
                          })}
                        />
                        {errors.description && (
                          <p className="text-red-600 text-sm">
                            This is required!!
                          </p>
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
            {!article && (createPetArticle.isLoading ? '...Saving' : 'Save')}
            {article && (updatePetArticle.isLoading ? '...Updating' : 'Update')}
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
