import { Page } from "@/src/interfaces/page";
import axios from "axios";

export async function petGetPage0(id: string): Promise<Page> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // cache: 'force-cache',
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query PetGetPage0($id: String!){
        petGetPage0(id: $id){
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
    .then((result) => result.petGetPage0)
}


// export async function petGetPage0(id: string): Promise<Page> {
//   const { data: {data: { petGetPage0 }} } = await axios({
//     url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
//     method: 'post',
//     data: {
//       query: `
//       query PetGetPage0($id: String!){
//         petGetPage0(id: $id){
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
//       variables: { id }
//     },
//   })
//   return petGetPage0
// }


// export const petGetPage0 = async (id: string): Promise<Page> => await axios({
//   url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
//   method: 'post',
//   data: {
//     query: `
//     query PetGetPage0($id: String!){
//       petGetPage0(id: $id){
//         _id
//           data{
//             type {
//               slug
//             }
//             title
//             description
//             thumbnailUrl
//           }
//         slug
//         parentId
//       }
//     }
//       `,
//     variables: {id}
//   },
  

// })
// .then((res) => res.data)
// .then((res) => res.data)
// .then((result) => result.petGetPage0)