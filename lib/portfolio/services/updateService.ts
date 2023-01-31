
import { Service, UpdateService } from '@/src/interfaces/service';
import axios from 'axios';

export async function portfolioUpdateService(input: UpdateService): Promise<Service> {
  const {
    data: {
      data: { portfolioUpdateService },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation portfolioUpdateService($input: UpdateService!) {
        portfolioUpdateService(input: $input) {
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
  return portfolioUpdateService;
}
// export async function portfolioUpdateServiceContent(input: UpdateContentService): Promise<Service> {
//   const {
//     data: {
//       data: { portfolioUpdateContentService },
//     },
//   } = await axios({
//     url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
//     method: 'post',
//     data: {
//       query: `
//       mutation portfolioUpdateContentService($input: UpdateContentService!) {
//         portfolioUpdateContentService(input: $input) {
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
//   return portfolioUpdateContentService;
// }
