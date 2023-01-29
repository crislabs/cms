'use client';
import { useUI } from '@/src/providers/UIContext';
import { Article } from '@/src/interfaces/article';
import { Page } from '@/src/interfaces/page';
import { Product } from '@/src/interfaces/product';
import { Site } from '@/src/interfaces/site';
import { classNames, } from '@/src/utils';
import { FolderPlusIcon, PencilIcon } from '@heroicons/react/24/solid';
import { SlideOversForm } from './SlideOversForm';
import { useKeyPress } from 'ahooks';
import { FormAdoption } from './FormAdoption';
import { FormArticle } from './FormArticle';
import { FormCategory } from './FormCategory';
import { FormProduct } from './FormProduct';
import { FormService } from './FormService';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'

import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'
import { SlideOversFormArticle } from './SlideOversFormArticle';
import { FormContent } from './FormContent';
import { usePath } from '@/src/hooks/usePath';
import { FormSite } from './form/FormSite';
import { FormPage } from './form/FormPage';

interface Props {
  title?: string;
  page?: Page;
  article?: Article;
  site?: Site;
  product?: Product;
}

const sortOptions = [
  { name: 'Edit', slug: 'edit', current: true },
  { name: 'More information', slug: 'info', current: false },
  { name: 'Content', slug: 'content', current: false},
  { name: 'Images', slug: 'image', current: false },
  { name: 'Seo', slug: '#', current: false }
]
const sortOptionsArticle = [
  { name: 'Edit', slug: 'edit', current: true },
  { name: 'Content', slug: 'content', current: false},
  { name: 'Seo', slug: '#', current: false }
]

export function HeadingDashboard(props: Props) {
  const { page, site, article, product, title } = props;
  const query = usePath();
  // const searchParams = useSearchParams();
  // console.log('query', query)
  const {
    childrenDashboard: { childrens, setChildrens },
    toggleSlideOversForm: {
      actions: { toggle },
    },
    toggleSlideOversFormArticle: { actions },
    toggleSlideOversFormComponent: { actions: actionsComponent },
  } = useUI();
  useKeyPress(['ctrl.shift.e'], () => {
    actions.toggle();
    // setChildrens(<FormContent article={article} />)
  });
  const handleClickEdit = (slug: string) => {
    if (slug === 'edit' && query.length === 4) {
      toggle();
      setChildrens(<FormSite site={site} />);
    }
    if (slug === 'edit' && query.length === 7) {
      toggle();
      setChildrens(<FormPage page={page} />);
    }
    if (slug === 'edit' && query.length === 6) {
      toggle()
      setChildrens(<FormArticle article={article} />);
    }
    if (slug === 'content' && query.length === 6) {
      actions.toggle()
      setChildrens(<FormContent article={article} />);
    }
  }
  const handleClickAdd = () => {
    if (query.length === 3) {
      toggle();
      setChildrens(<FormSite />);
    }
    if (query.length === 4) {
      toggle();
      setChildrens(<FormPage />);
    }

    if (
      query[5] === 'page0' && page?.data.type.slug === 'category'
    ) {
      toggle();
      setChildrens(<FormCategory />);
    }
    if (
      query[5] === 'page0' && page?.data.type.slug === 'adoption'
    ) {
      toggle();
      setChildrens(<FormAdoption />);
    }
    if (
      query[5] === 'page0' && page?.data.type.slug === 'blog'
    ) {
      toggle();
      setChildrens(<FormArticle />);
    }
    if (
      query[5] === 'page0' && page?.data.type.slug === 'service'
    ) {
      toggle();
      setChildrens(<FormService />);
    }
    if (
      query[5] === 'page1' && page?.data.type.slug === 'product'
    ) {
      toggle();
      setChildrens(<FormProduct />);
    }
    
  };
  const handleClickUpdateDetails = () => {
    toggle();
    // setChildrens(<FormDetails product={product} />)
  };
  const handleClickUpdateSpecs = () => {
    toggle();
    // setChildrens(<FormSpecs product={product} />)
  };
  const handleClickUpdateContent = () => {
    actions.toggle();
    // setChildrens(<FormContent article={article} />)
  };
  return (
    <div>
      <div className="flex lg:items-center justify-between">
        <div className="min-w-0 flex space-x-2">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
          
          {site && (
            <span className="block">

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="btn-default">
                  Options
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <div
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm cursor-default'
                            )}
                            onClick= {() => handleClickEdit(option.slug)}
                          >
                            {option.name}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            </span>
            
            
          )}
          {article && (
            <span className="block">

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="btn-default">
                  Options
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptionsArticle.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <div
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm cursor-default'
                            )}
                            onClick= {() => handleClickEdit(option.slug)}
                          >
                            {option.name}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            </span>
          )}
        </div>
        <div className="flex">
          {!['products', 'articles'].includes(query[1]) && (
            <span className="block">
              <button
                className="btn-primary space-x-3"
                onClick={() => handleClickAdd()}
              >
                <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
                <p className="hidden sm:block">
                  {query.length === 3 && 'Add Site'}
                  {query.length === 4 && 'Add Page'}

                  {query[5] === 'page0' && page?.data.type.slug === 'page' && 'Add Page'}
                  {query[5] === 'page0' && page?.data.type.slug === 'category' && 'Add Category'}
                  {query[5] === 'page0' && page?.data.type.slug === 'adoption' && 'Add Adoption'}
                  {query[5] === 'page0' && page?.data.type.slug === 'blog' && 'Add Article'}
                  {query[5] === 'page0' && page?.data.type.slug === 'service' && 'Add Service'}
                  
                  {query[5] === 'page1' && page?.data.type.slug === 'product' && 'Add Product'}
                  
                </p>
              </button>
            </span>
          )}
          {query[1] === 'products' && (
            <span className="block space-x-3">
              <button
                className="btn-primary space-x-3"
                onClick={() => handleClickUpdateDetails()}
              >
                <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
                <p className="hidden sm:block">Add Details</p>
              </button>
              <button
                className="btn-primary space-x-3"
                onClick={() => handleClickUpdateSpecs()}
              >
                <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
                <p className="hidden sm:block">Add Specs</p>
              </button>
            </span>
          )}
          {query[1] === 'articles' && (
            <span className="block space-x-3">
              <button
                className="btn-primary space-x-3"
                onClick={() => handleClickUpdateContent()}
              >
                <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
                <p className="hidden sm:block">Update Content</p>
              </button>
              {/* <button className="btn-primary space-x-3"
              onClick={() => handleClickUpdateSpecs()}
            >
              <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
              <p className="hidden sm:block">
                Add Specs
              </p>
            </button> */}
            </span>
          )}
        </div>
      </div>

      {/* <SlideOversFormComponent children={childrens} />
       */}
      <SlideOversForm children={childrens} />
      <SlideOversFormArticle children={childrens} />
    </div>
  );
}
