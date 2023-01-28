import { Service, CreateService } from '@/src/interfaces/service';
import { CreatePage, Page } from '@/src/interfaces/page';
import axios from 'axios';

// export async function petCreatePage(input: CreatePage): Promise<Page> {
//   const {
//     data: { petCreateService },
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

export async function petCreateService(input: CreateService): Promise<Service> {
  const {
    data: {
      data: { petCreateService },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PetCreateService($input: CreateService!) {
        petCreateService(input: $input) {
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  // .then((res) => res.data)
  return petCreateService;
}
