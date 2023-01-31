'use client';
import { useUI } from '@/src/providers/UIContext';
import { Site } from '@/src/interfaces/site';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { CreateSite, UpdateSite } from '@/src/interfaces/site';
import { usePath } from '@/src/hooks/usePath';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { usePetCreateSite, usePetUpdateSite } from '@/src/hooks/sites';
import * as Yup from 'yup';
import { usePortfolioCreateSite, usePortfolioUpdateSite } from '@/src/hooks/portfolio/sites';

interface Props {
  site?: Site;
}

interface FormValues {
  name: string;
  description: string;
  type: string;
}

export function FormSite(props: Props) {
  const { site } = props;
  const { data: session } = useSession();
  const path = usePath();
  const { toggleSlideOversForm } = useUI();
  const createPetSite = usePetCreateSite();
  const createPortfolioSite = usePortfolioCreateSite();
  const updatePetSite = usePetUpdateSite();
  const updatePortfolioSite = usePortfolioUpdateSite();

  return (
    <Formik
      initialValues={
        site
          ? {
              id: site?._id as string,
              name: site.data.name,
              uid: (session?.user.sid as string) || '123456789',
            }
          : {
              name: '',
              type: path[2],
              uid: (session?.user.sid as string) || '123456789',
            }
      }
      onSubmit={(values) => {
        if (site) {
          if (path[2]==='pet') updatePetSite.mutate(values as UpdateSite);
          if (path[2]==='portfolio') updatePortfolioSite.mutate(values as UpdateSite);
          
        } else {
          if (path[2]==='pet') createPetSite.mutate(values as CreateSite);
          if (path[2]==='portfolio') createPortfolioSite.mutate(values as CreateSite);
          
        }
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, 'Debe tener 15 caracteres como maximo')
          .required('Required'),
      })}
    >
      <Form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
          <div className="flex items-start justify-between">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              {site ? 'Edit Site' : 'New Site'}
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
                        <label className="label-form">Title</label>
                        <Field name="name" type="text" className="input-form" autoComplete="off" />
                        <ErrorMessage name="name" />
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
              {site
                ? (updatePetSite.isLoading || updatePortfolioSite)
                  ? '...Updating'
                  : 'Update'
                : (createPetSite.isLoading || createPortfolioSite.isLoading)
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
