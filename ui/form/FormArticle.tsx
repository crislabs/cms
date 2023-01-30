'use client';
import { useUI } from '@/src/providers/UIContext';

import {
  typeCategoryPet,
  typePagePet,
} from '@/src/utils';
import { Dialog } from '@headlessui/react';
import {  XMarkIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import React from 'react';
import { usePath } from '@/src/hooks/usePath';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Article, CreateArticle, UpdateArticle } from '@/src/interfaces/article';
import { usePetCreateArticle, usePetUpdateArticle } from '@/src/hooks/articles';

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
  const path = usePath();
  const { toggleSlideOversForm } = useUI();
  //toggleSlideOversForm.actions.setLeft
  const createPetArticle = usePetCreateArticle();
  const updatePetArticle = usePetUpdateArticle();

  return (
    <Formik
      initialValues={
        article
          ? {
              id: article?._id as string,
              name: article.data.name,
              description: article.data.description,
              siteId: path[3],
              parentId: article.parentId,
              uid: (session?.user.sid as string) || '123456789',
            }
          : {
              name: '',
              description: 'Article description',
              uid: (session?.user.sid as string) || '123456789',
              siteId: path[3],
              parentId: path[6],
            }
      }
      onSubmit={(values) => {
        if (article) {
          updatePetArticle.mutate(values as UpdateArticle);
          // console.log('values', values);
        } else {
          createPetArticle.mutate(values as CreateArticle);

          // console.log('values', values);
        }
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, 'Debe tener 15 caracteres como maximo')
          .required('Required'),
      })}
    >
      <Form
        // onSubmit={handleSubmit}
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
                onClick={toggleSlideOversForm.actions.setLeft}
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
                        <Field name="name" type="text" className="input-form" autoComplete="off" />
                        <ErrorMessage name="name" />
                      </div>

                      <div className="col-span-6">
                        <label className="label-form">Description</label>
                        <div className="mt-1">
                          <Field
                            className="input-form"
                            component="textarea"
                            rows="10"
                            name="description"
                          />
                          <ErrorMessage name="description" />
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
              {article
                ? updatePetArticle.isLoading
                  ? '...Updating'
                  : 'Update'
                : createPetArticle.isLoading
                ? '...Saving'
                : 'Save'}
            </button>
            <button
              type="button"
              className="btn-default"
              onClick={toggleSlideOversForm.actions.setLeft}
            >
              Cancel
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
