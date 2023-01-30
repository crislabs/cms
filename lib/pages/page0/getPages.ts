import { Page } from "@/src/interfaces/page";
import axios from "axios";


export async function petGetPages0(): Promise<Page[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // cache: 'force-cache',
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query PetGetPages0{
        petGetPages0{
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
    .then((result) => result.petGetPages0)
}

// export async function petGetPages0(): Promise<Page[]> {
//   const { data: {data: { petGetPages0 }} } = await axios({
//     url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
//     method: 'post',
//     data: {
//       query: `
//       query PetGetPages0 {
//         petGetPages0 {
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
//   return petGetPages0
// }

// export async function petGetPages0BySiteId(siteId: string): Promise<Page[]> {
//   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//       query PetGetPages0BySiteId($siteId: String!){
//         petGetPages0BySiteId(siteId: $siteId){
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
//     .then((result) => result.petGetPages0BySiteId)
// }

