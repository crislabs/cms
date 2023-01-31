import { Page } from "@/src/interfaces/page";


export async function portfolioGetPages1(): Promise<Page[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query portfolioGetPages1{
        portfolioGetPages1{
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
    .then((result) => result.portfolioGetPages1)
}

// export async function portfolioGetPages1BySiteId(siteId: string): Promise<Page[]> {
//   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//       query portfolioGetPages1BySiteId($siteId: String!){
//         portfolioGetPages1BySiteId(siteId: $siteId){
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
//     .then((result) => result.portfolioGetPages1BySiteId)
// }

