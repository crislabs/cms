import { CreatePage, Page } from '@/src/interfaces/page';
import axios from 'axios';

// export async function petCreatePage(input: CreatePage): Promise<Page> {
//   const {
//     data: { petCreatePage0 },
//   } = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//      mutation PetCreatePage0($input: CreatePage!) {
//       petCreatePage0(input: $input) {
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
//   return petCreatePage0;
// }

export async function petCreatePage1(input: CreatePage): Promise<Page> {
  const {
    data: {
      data: { petCreatePage1 },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PetCreatePage1($input: CreatePage!) {
        petCreatePage1(input: $input) {
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  // .then((res) => res.data)
  return petCreatePage1;
}
