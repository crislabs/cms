import { Service, CreateService } from '@/src/interfaces/service';
import { CreatePage, Page } from '@/src/interfaces/page';
import axios from 'axios';

// export async function portfolioCreatePage(input: CreatePage): Promise<Page> {
//   const {
//     data: { portfolioCreateService },
//   } = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//      mutation portfolioCreatePage0($input: CreatePage!) {
//       portfolioCreatePage0(input: $input) {
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
//   return portfolioCreatePage0;
// }

export async function portfolioCreateService(input: CreateService): Promise<Service> {
  const {
    data: {
      data: { portfolioCreateService },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation portfolioCreateService($input: CreateService!) {
        portfolioCreateService(input: $input) {
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  // .then((res) => res.data)
  return portfolioCreateService;
}
