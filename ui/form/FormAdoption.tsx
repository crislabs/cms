'use client';
import { useUI } from '@/src/providers/UIContext';

import { Dialog } from '@headlessui/react';
import {  XMarkIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { usePath } from '@/src/hooks/usePath';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Adoption, CreateAdoption, UpdateAdoption } from '@/src/interfaces/adoption';
import { usePetCreateAdoption, usePetUpdateAdoption } from '@/src/hooks/adoptions';

interface Props {
  adoption?: Adoption;
}

interface FormValues {
  name: string;
  description: string;
  type: string;
}

export function FormAdoption(props: Props) {
  const { adoption } = props;
  const { data: session } = useSession();
  const path = usePath();
  const { toggleSlideOversForm } = useUI();
  //toggleSlideOversForm.actions.setLeft
  const createPetAdoption = usePetCreateAdoption();
  const updatePetAdoption = usePetUpdateAdoption();

  return (
    <Formik
      initialValues={
        adoption
          ? {
              id: adoption?._id as string,
              name: adoption.data.name,
              description: adoption.data.description,
              siteId: path[3],
              parentId: adoption.parentId,
              type: adoption.data.type.slug,
              uid: (session?.user.sid as string) || '123456789',
            }
          : {
              name: '',
              description: 'Adoption description',
              uid: (session?.user.sid as string) || '123456789',
              siteId: path[3],
              parentId: path[6],
              type: 'adoption'
            }
      }
      onSubmit={(values) => {
        if (adoption) {
          updatePetAdoption.mutate(values as UpdateAdoption);
          // console.log('values', values);
        } else {
          createPetAdoption.mutate(values as CreateAdoption);

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
              {adoption ? 'Edit Adoption' : 'New Adoption'}
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
              {adoption
                ? updatePetAdoption.isLoading
                  ? '...Updating'
                  : 'Update'
                : createPetAdoption.isLoading
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
