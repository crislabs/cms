
import { Adoption, UpdateAdoption } from '@/src/interfaces/adoption';
import axios from 'axios';

export async function petUpdateAdoption(input: UpdateAdoption): Promise<Adoption> {
  const {
    data: {
      data: { petUpdateAdoption },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PetUpdateAdoption($input: UpdateAdoption!) {
        petUpdateAdoption(input: $input) {
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
  return petUpdateAdoption;
}
// export async function petUpdateAdoptionContent(input: UpdateContentAdoption): Promise<Adoption> {
//   const {
//     data: {
//       data: { petUpdateContentAdoption },
//     },
//   } = await axios({
//     url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
//     method: 'post',
//     data: {
//       query: `
//       mutation PetUpdateContentAdoption($input: UpdateContentAdoption!) {
//         petUpdateContentAdoption(input: $input) {
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
//   return petUpdateContentAdoption;
// }
