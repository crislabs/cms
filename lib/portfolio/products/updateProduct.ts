
import { Product, UpdateProduct } from '@/src/interfaces/product';
import axios from 'axios';

export async function portfolioUpdateProduct(input: UpdateProduct): Promise<Product> {
  const {
    data: {
      data: { portfolioUpdateProduct },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation portfolioUpdateProduct($input: UpdateProduct!) {
        portfolioUpdateProduct(input: $input) {
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
  return portfolioUpdateProduct;
}
// export async function portfolioUpdateProductContent(input: UpdateContentProduct): Promise<Product> {
//   const {
//     data: {
//       data: { portfolioUpdateContentProduct },
//     },
//   } = await axios({
//     url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
//     method: 'post',
//     data: {
//       query: `
//       mutation portfolioUpdateContentProduct($input: UpdateContentProduct!) {
//         portfolioUpdateContentProduct(input: $input) {
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
//   return portfolioUpdateContentProduct;
// }
