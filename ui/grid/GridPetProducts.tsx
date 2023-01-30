'use client';

import { SelectionProvider } from '@/src/providers/SelectionContext';
import { Page } from '@/src/interfaces/page';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';

import { usePetGetPage0 } from '@/src/hooks/pages';
import { ListProduct } from '@/src/interfaces/product';
import { usePetListProducts } from '@/src/hooks/products';
import { CardProduct } from '../card/CardProduct';

interface Props {
  listProduct: ListProduct;
  page: Page
}

export function GridPetProducts(props: Props) {
  const { data: page } = usePetGetPage0(props.page)
  const { data: listProduct } = usePetListProducts(props.listProduct, props.page._id)
  return (
    <SelectionProvider ids={listProduct?.page.edges.map(data => data.node._id)}>
      <HeadingDashboard title={page.data.name} page={page} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {listProduct?.page.edges.map((data, i) => (
          <CardProduct key={i} product={data.node} />
        ))}
      </div>
      {/* //   
    //   {data.pageData.count > 12 && <PaginationPages pages={data} />} */}

    </SelectionProvider>
  );
}