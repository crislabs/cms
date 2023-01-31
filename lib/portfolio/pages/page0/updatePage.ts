import { UpdatePage, Page } from '@/src/interfaces/page';
import axios from 'axios';

// export async function portfolioUpdatePage(input: UpdatePage): Promise<Page> {
//   const {
//     data: { portfolioUpdatePage0 },
//   } = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//      mutation portfolioUpdatePage0($input: UpdatePage!) {
//       portfolioUpdatePage0(input: $input) {
//         parentId
//       }
//     }
//      `,
//       variables: { input },
//     }),
//   }).then((response) => {
//     console.log('response', response)
//     if (response.status > 400) {
//       throw new Error("Error fetching data");
//     } else {
//       return response.json();
//     }
//   }).then((data) => data.data);
//   //  .then((res)=> res.data)
//   //  .then((result) => result.)
//   return portfolioUpdatePage0;
// }

export async function portfolioUpdatePage0(input: UpdatePage): Promise<Page> {
  const {
    data: {
      data: { portfolioUpdatePage0 },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation portfolioUpdatePage0($input: UpdatePage!) {
        portfolioUpdatePage0(input: $input) {
          _id
            data{
              type {
                slug
              }
              name
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
  // .then((res) => res.data)
  return portfolioUpdatePage0;
}
