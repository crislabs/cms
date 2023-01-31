import { Product, CreateProduct } from '@/src/interfaces/product';
import axios from 'axios';


export async function portfolioCreateProduct(input: CreateProduct): Promise<Product> {
  const {
    data: {
      data: { portfolioCreateProduct },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation portfolioCreateProduct($input: CreateProduct!) {
        portfolioCreateProduct(input: $input) {
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  // .then((res) => res.data)
  return portfolioCreateProduct;
}
