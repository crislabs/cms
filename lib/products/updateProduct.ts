
import { Product, UpdateProduct } from '@/src/interfaces/product';
import axios from 'axios';

export async function petUpdateProduct(input: UpdateProduct): Promise<Product> {
  const {
    data: {
      data: { petUpdateProduct },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PetUpdateProduct($input: UpdateProduct!) {
        petUpdateProduct(input: $input) {
          _id
            data{
              name
              content
              description
              thumbnailUrl
            }
          slug
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  return petUpdateProduct;
}
// export async function petUpdateProductContent(input: UpdateContentProduct): Promise<Product> {
//   const {
//     data: {
//       data: { petUpdateContentProduct },
//     },
//   } = await axios({
//     url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
//     method: 'post',
//     data: {
//       query: `
//       mutation PetUpdateContentProduct($input: UpdateContentProduct!) {
//         petUpdateContentProduct(input: $input) {
//           _id
//             data{
//               name
//               content
//               description
//               thumbnailUrl
//             }
//           slug
//           parentId
//         }
//       }
//         `,
//       variables: { input },
//     },
//   });
//   return petUpdateContentProduct;
// }
