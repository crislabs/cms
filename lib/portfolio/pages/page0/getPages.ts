import { Page } from "@/src/interfaces/page";
import axios from "axios";


export async function portfolioGetPages0(): Promise<Page[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // cache: 'force-cache',
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query portfolioGetPages0{
        portfolioGetPages0{
          _id
          data{
            siteId
          }
        }
      }
      `,
      variables: {  },
    }),
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetPages0)
}

// export async function portfolioGetPages0(): Promise<Page[]> {
//   const { data: {data: { portfolioGetPages0 }} } = await axios({
//     url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
//     method: 'post',
//     data: {
//       query: `
//       query portfolioGetPages0 {
//         portfolioGetPages0 {
//           _id
//             data{
//               siteId
//             }
//         }
//       }
//         `,
//       variables: { }
//     },
//   })
//   return portfolioGetPages0
// }

// export async function portfolioGetPages0BySiteId(siteId: string): Promise<Page[]> {
//   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//       query portfolioGetPages0BySiteId($siteId: String!){
//         portfolioGetPages0BySiteId(siteId: $siteId){
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
//     .then((result) => result.portfolioGetPages0BySiteId)
// }

