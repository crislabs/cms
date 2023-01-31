
import { Adoption, UpdateAdoption } from '@/src/interfaces/adoption';
import axios from 'axios';

export async function portfolioUpdateAdoption(input: UpdateAdoption): Promise<Adoption> {
  const {
    data: {
      data: { portfolioUpdateAdoption },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation portfolioUpdateAdoption($input: UpdateAdoption!) {
        portfolioUpdateAdoption(input: $input) {
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
  return portfolioUpdateAdoption;
}
// export async function portfolioUpdateAdoptionContent(input: UpdateContentAdoption): Promise<Adoption> {
//   const {
//     data: {
//       data: { portfolioUpdateContentAdoption },
//     },
//   } = await axios({
//     url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
//     method: 'post',
//     data: {
//       query: `
//       mutation portfolioUpdateContentAdoption($input: UpdateContentAdoption!) {
//         portfolioUpdateContentAdoption(input: $input) {
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
//   return portfolioUpdateContentAdoption;
// }
