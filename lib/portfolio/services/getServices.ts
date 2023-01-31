import { Service } from "@/src/interfaces/service";
import { Page } from "@/src/interfaces/page";


export async function portfolioGetServices(): Promise<Service[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query portfolioGetServices{
        portfolioGetServices{
          _id
          parentId
        }
      }
      `,
      variables: {  },
    }),
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetServices)
}

// export async function portfolioGetServicesBySiteId(siteId: string): Promise<Page[]> {
//   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//       query portfolioGetServicesBySiteId($siteId: String!){
//         portfolioGetServicesBySiteId(siteId: $siteId){
//           _id
//           parentId
//         }
//       }
//       `,
//       variables: { siteId },
//     }),
//   })
//     .then(res => res.json())
//     .then((res) => res.data)
//     .then((result) => result.portfolioGetServicesBySiteId)
// }

