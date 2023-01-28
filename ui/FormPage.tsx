'use client';
import { useUI } from '@/src/providers/UIContext';
import {
  CreatePage,
  Page,
  UpdatePage,
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
import {  petCreatePage0 } from '@/lib/pages/page0/createPage';
import { petUpdatePage0 } from '@/lib/pages/page0/updatePage';
import { Error } from '@/src/interfaces/error';
import { usePath } from '@/src/hooks/usePath';


interface Props {
  page?: Page;
}

interface FormValues {
  name: string;
  description: string;
  type: string;
}

export function FormPage(props: Props) {
  const { page } = props;
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
  const createPetPage0 = useMutation({
    mutationFn: async (input: CreatePage) => await petCreatePage0(input),
    onSuccess: async (data) => {
      queryClient.invalidateQueries([
        'pet-get-pages0-with-cursor',
        { first: 256 },
        data.parentId,
      ]);
      await SwalMessage(' Page Created');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageSiteCreateError( err.response.data.errors[0].message);
    },
  });
  const updatePetPage0 = useMutation({
    mutationFn: async (input: UpdatePage) => await petUpdatePage0(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Page>(['pet-get-page0', data._id], data);
      await SwalMessage('Page Updated');
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
    defaultValues: page
      ? {
          name: page?.data.name,
          description: page?.data.description,
          type: page?.data.type.slug,
        }
      : { name: '', description: 'page description', type: 'page' },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const form = {
      ...data,
      name: data.name.trim(),
      description: data.description.trim(),
      siteId: query[3],
      uid: session?.user.sid as string || '123456789',
    };
    // console.log('form', {...form, parentId: query[3]})
    {
      if (page) {
        updatePetPage0.mutate({ ...form, parentId: query[3], id: query[6] })
        if (query.length === 4) {
          // query[2] === 'page0' &&
          //   updatePetPage0({ ...form, id: query[3], parentId: query[3] });
          // query[2] === 'page1' &&
          //   updatePetPage1({ ...form, id: query[3], parentId: query[3] });
          // query[2] === 'page2' &&
          //   updatePetPage2({ ...form, id: query[3], parentId: query[3] });
          // query[2] === 'page3' &&
          //   updatePetPage3({ ...form, id: query[3], parentId: query[3] });
        }
      } else {
        createPetPage0.mutate({ ...form, parentId: query[3] });

        if (query.length === 4) {
          // query[2] === 'page0' &&
          //   createPetPage1({ ...form, parentId: query[3] });
          // query[2] === 'page1' &&
          //   createPetPage2({ ...form, parentId: query[3] });
          // query[2] === 'page2' &&
          //   createPetPage3({ ...form, parentId: query[3] });
        }
        // query.length === 2 &&
        // createPetPage0({
        //   ...form,
        //   parentId: process.env.NEXT_PUBLIC_SITE_URL as string,
        // });
        // console.log('form', { ...form, parentId: process.env.NEXT_PUBLIC_SITE_URL as string })
      }
    }
  };

  const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }
    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('photo_url', file);
        formData.append('parentId', query[3]);
        formData.append('siteId', process.env.NEXT_PUBLIC_SITE_URL as string);
        formData.append('type', 'page');

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/upload/file`,
          formData,
        );
        // updatePortfolioImagePage0({
        //   id: query[3],
        //   type: 'page',
        //   uid: session?.token.sid as string,
        //   images: {
        //     src: data.url,
        //     alt: 'alt from image',
        //   },
        // });
      }
    } catch (error) {
      // const err = error as AxiosError
      // const { message } = err.response?.data as {message: string}
      // Swal.fire({
      //   icon: 'error',
      //   name: 'Oops...',
      //   text: message,
      //   footer: '<a href="">Why do I have this issue?</a>'
      // })
    }
  };
  const uploadURL = async () => {
    toggle();
    const { value: url } = await Swal.fire({
      input: 'url',
      inputAutoTrim: true,
      inputLabel: 'URL Image',
      inputPlaceholder: 'Enter the URL',
      inputAttributes: {
        autocomplete: 'off',
      },
    });
    if (url) {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/upload/file-url`,
          {
            photo_url: url,
            siteId: query[3],
            parentId: query[3],
            type: 'page',
          },
        );
        // updatePortfolioImagePage0({
        //   id: query[3],
        //   type: 'page',
        //   uid: session?.token.sid as string,
        //   images: {
        //     src: data.url,
        //     alt: 'alt from image',
        //   },
        // });
      } catch (error) {
        const err = error as AxiosError;
        const { message } = err.response?.data as { message: string };
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message,
          footer: '<a href="">Why do I have this issue?</a>',
        });
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
            {page ? 'Edit Page' : 'New Page'}
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
                      <label className="label-form">Name</label>
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
                    <div className="col-span-6">
                      <h2 className="contents text-sm font-medium text-gray-700">
                        Type{' '}
                      </h2>
                      <div className="grid grid-cols-2">
                        <React.Fragment>
                          
                          {query[2] === 'pet' &&
                            typePagePet.map((data) => (
                              <div
                                className="flex items-center my-2"
                                key={data.label}
                              >
                                <input
                                  type="radio"
                                  id={data.value}
                                  value={data.value}
                                  {...register('type', { required: true })}
                                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={({ target }) =>
                                    setValue('type', target.value, {
                                      shouldValidate: true,
                                    })
                                  }
                                />
                                <label className="ml-3 label-form">
                                  {data.label}
                                </label>
                              </div>
                            ))}
                        </React.Fragment>
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
            {!page && (createPetPage0.isLoading ? '...Saving' : 'Save')}
            {page && (updatePetPage0.isLoading ? '...Updating' : 'Update')}
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
