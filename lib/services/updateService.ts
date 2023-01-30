
import { Service, UpdateService } from '@/src/interfaces/service';
import axios from 'axios';

export async function petUpdateService(input: UpdateService): Promise<Service> {
  const {
    data: {
      data: { petUpdateService },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PetUpdateService($input: UpdateService!) {
        petUpdateService(input: $input) {
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
  return petUpdateService;
}
// export async function petUpdateServiceContent(input: UpdateContentService): Promise<Service> {
//   const {
//     data: {
//       data: { petUpdateContentService },
//     },
//   } = await axios({
//     url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
//     method: 'post',
//     data: {
//       query: `
//       mutation PetUpdateContentService($input: UpdateContentService!) {
//         petUpdateContentService(input: $input) {
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
//   return petUpdateContentService;
// }
