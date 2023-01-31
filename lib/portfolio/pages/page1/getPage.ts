import { Page } from "@/src/interfaces/page";


// export async function portfolioGetPage1(id: string): Promise<Page> {
//   const { data: {data: { portfolioGetPage1 }} } = await axios({
//     url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
//     method: 'post',
    
//     data: {
//       query: `
//       query portfolioGetPage1($id: String!){
//         portfolioGetPage1(id: $id){
//           _id
//             data{
//               type {
//                 slug
//               }
//               name
//               description
//               thumbnailUrl
//             }
//           slug
//           parentId
//         }
//       }
//         `,
//       variables: {id}
//     },
//   })
//   return portfolioGetPage1
// }

export async function portfolioGetPage1(id: string): Promise<Page> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query portfolioGetPage1($id: String!){
        portfolioGetPage1(id: $id){
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
      variables: { id },
    }),
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetPage1)
}