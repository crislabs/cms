import { Product, CreateProduct } from '@/src/interfaces/product';
import axios from 'axios';


export async function petCreateProduct(input: CreateProduct): Promise<Product> {
  const {
    data: {
      data: { petCreateProduct },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PetCreateProduct($input: CreateProduct!) {
        petCreateProduct(input: $input) {
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  // .then((res) => res.data)
  return petCreateProduct;
}
