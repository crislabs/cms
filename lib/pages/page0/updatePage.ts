import { UpdatePage, Page } from '@/src/interfaces/page';
import axios from 'axios';

// export async function petUpdatePage(input: UpdatePage): Promise<Page> {
//   const {
//     data: { petUpdatePage0 },
//   } = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//      mutation PetUpdatePage0($input: UpdatePage!) {
//       petUpdatePage0(input: $input) {
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
//   return petUpdatePage0;
// }

export async function petUpdatePage0(input: UpdatePage): Promise<Page> {
  const {
    data: {
      data: { petUpdatePage0 },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PetUpdatePage0($input: UpdatePage!) {
        petUpdatePage0(input: $input) {
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
  return petUpdatePage0;
}
