import { Adoption } from "@/src/interfaces/adoption";

export async function petGetAdoption(id: string): Promise<Adoption> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query PetGetAdoption($id: String!){
        petGetAdoption(id: $id){
          _id
            data{
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
    .then((result) => result.petGetAdoption)
}

