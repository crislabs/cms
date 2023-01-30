'use client';
import { useUI } from '@/src/providers/UIContext';
import { Article } from '@/src/interfaces/article';
import { Page } from '@/src/interfaces/page';
import { Product } from '@/src/interfaces/product';
import { Site } from '@/src/interfaces/site';
import { FolderPlusIcon } from '@heroicons/react/24/solid';
import { SlideOversForm } from './SlideOversForm';
import { useKeyPress } from 'ahooks';



import { SlideOversFormArticle } from './SlideOversFormArticle';
import { usePath } from '@/src/hooks/usePath';
import { FormSite, FormPage, FormCategory, FormArticle, FormContent, FormAdoption, FormProduct, FormService } from './form';
import Option from './button/Option';
import { Adoption } from '@/src/interfaces/adoption';

interface Props {
  title?: string;
  page?: Page;
  article?: Article;
  site?: Site;
  product?: Product;
  adoption?: Adoption;
}

const sortOptionsSite = [
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
const sortOptionsPage = [
  { name: 'Edit', slug: 'edit', current: true },
  // { name: 'Content', slug: 'content', current: false},
  { name: 'Seo', slug: '#', current: false }
]

export function HeadingDashboard(props: Props) {
  const { page, site, article, product, title } = props;
  const query = usePath();
  const {
    childrenDashboard: { childrens, setChildrens },
    toggleSlideOversForm,
    toggleSlideOversFormArticle,
    toggleSlideOversFormComponent: { actions: actionsComponent },
  } = useUI();
  useKeyPress(['ctrl.shift.e'], () => {
    toggleSlideOversFormArticle.actions.toggle();
    // setChildrens(<FormContent article={article} />)
  });
  const handleClickEdit = (slug: string) => {
    if (slug === 'edit' && query.length === 4) {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormSite site={site} />);
    }
    if (slug === 'edit' && query.length === 7) {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormPage page={page} />);
    }
    if (slug === 'edit' && query.length === 6) {
      toggleSlideOversForm.actions.toggle()
      setChildrens(<FormArticle article={article} />);
    }
    if (slug === 'content' && query.length === 6) {
      toggleSlideOversFormArticle.actions.toggle()
      setChildrens(<FormContent article={article} />);
    }
  }
  const handleClickAdd = () => {
    if (query.length === 3) {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormSite />);
    }
    if (query.length === 4) {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormPage />);
    }

    if (
      query[5] === 'page0' && page?.data.type.slug === 'category'
    ) {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormCategory />);
    }
    if (
      query[5] === 'page0' && page?.data.type.slug === 'adoption'
    ) {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormAdoption />);
    }
    if (
      query[5] === 'page0' && page?.data.type.slug === 'blog'
    ) {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormArticle />);
    }
    if (
      query[5] === 'page0' && page?.data.type.slug === 'service'
    ) {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormService />);
    }
    if (
      query[5] === 'page1' && page?.data.type.slug === 'product'
    ) {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormProduct />);
    }
    
  };
  const handleClickUpdateDetails = () => {
    toggleSlideOversForm.actions.toggle();
    // setChildrens(<FormDetails product={product} />)
  };
  const handleClickUpdateSpecs = () => {
    toggleSlideOversForm.actions.toggle();
    // setChildrens(<FormSpecs product={product} />)
  };
  
  return (
    <div>
      <div className="flex lg:items-center justify-between">
        <div className="min-w-0 flex space-x-2">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
          
          {site && (
            <Option onPress={handleClickEdit} options={sortOptionsSite}/>
          )}
          {page && (
            <Option onPress={handleClickEdit} options={sortOptionsPage}/>
            )}
          {article && (
            <Option onPress={handleClickEdit} options={sortOptionsArticle}/>
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
          
        </div>
      </div>

      <SlideOversForm children={childrens} />
      <SlideOversFormArticle children={childrens} />
    </div>
  );
}
