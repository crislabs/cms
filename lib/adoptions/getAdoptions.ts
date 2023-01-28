import { Adoption } from "@/src/interfaces/adoption";
import { Page } from "@/src/interfaces/page";


export async function petGetAdoptions(): Promise<Adoption[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query PetGetAdoptions{
        petGetAdoptions{
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
    .then((result) => result.petGetAdoptions)
}

// export async function petGetAdoptionsBySiteId(siteId: string): Promise<Page[]> {
//   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//       query PetGetAdoptionsBySiteId($siteId: String!){
//         petGetAdoptionsBySiteId(siteId: $siteId){
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
//     .then((result) => result.petGetAdoptionsBySiteId)
// }

