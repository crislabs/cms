'use client'

import { useSelection } from '@/src/providers/SelectionContext';

import { TrashIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { petDeleteSites } from '@/lib/sites/deleteSite';
import { petDeletePages0 } from '@/lib/pages/page0/deletePage';
import { petDeleteProducts } from '@/lib/products/deleteProduct';
import { usePath } from '@/src/hooks/usePath';

interface Props {
  type?: string
}

export function HeadingDashboardOption(props: Props) {
  // console.log('props', props)
  const { selected, allSelected, toggleAll, unSelectAll } = useSelection();
  const query = usePath();
  // const { connectionArgs } = usePagination()

  const queryClient = useQueryClient();
  // const searchParams = useSearchParams();

  const { mutate: deletePetProducts } = useMutation(
    {
      mutationFn: async (ids: string[]) => await petDeleteProducts(ids),
      onSuccess:  (ids) => {
        queryClient.invalidateQueries(['pet-get-products-with-cursor', {first: 256}, query[6]])
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        })
        unSelectAll()
      },
      onError: (error: { response: { errors: [{ message: string }] } }) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.errors[0].message,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      },
    }
  );
  const { mutate: deletePetSites } = useMutation(
    {
      mutationFn: async (ids: string[]) => await petDeleteSites(ids),
      onSuccess:  (ids) => {
        queryClient.invalidateQueries(['pet-get-sites-with-cursor', {first: 256}])
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        })
        unSelectAll()
      },
      onError: (error: { response: { errors: [{ message: string }] } }) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.errors[0].message,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      },
    }
  );
  const { mutate: deletePetPages0 } = useMutation(
    {
      mutationFn: async (ids: string[]) => await petDeletePages0(ids),
      onSuccess:  (ids) => {
        // queryClient.setQueryData<Page[]>(['portfolio-get-pages0', process.env.NEXT_PUBLIC_SITE_URL as string], (old) => old?.filter(data => !ids.includes(data._id)))
        queryClient.invalidateQueries(['pet-get-pages0-with-cursor', {first: 256}, query[3]])
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        })
        unSelectAll()
      },
      onError: (error: { response: { errors: [{ message: string }] } }) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.errors[0].message,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      },
    }
  );


  const deleteHandle = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        {
          query.length === 3 && deletePetSites(selected)
        }
        {
          query.length === 4 && deletePetPages0(selected)
        }
        {
          query.length === 7 && props.type === 'product' && deletePetProducts(selected)
        }
        
        
      }
    });
  };
  return (
    <div
      className={` ${
        selected.length !== 0 ? 'opacity-100' : 'hidden  -translate-y-6 '
      } `}
    >
      <div className="mx-auto max-w-7xl pt-3 ">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
          <input
            type="checkbox"
            className="h-5 w-5  rounded border-gray-400 text-indigo-600 focus:ring-indigo-500 bg-white"
            onChange={() => toggleAll}
            checked={allSelected}
            onClick={toggleAll}
          />
            
            <p className="ml-2 text-sm font-medium">Select All</p>
          </div>

          <span
            className={`block opacity-100 transition ease-in-out delay-150`}
            >
            <button className="btn-default" onClick={() => deleteHandle()}>
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
              <p className="">({selected.length})</p>
            </button>
          </span>
        </div>
      </div>
      </div>

  );
}