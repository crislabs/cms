import { Article } from "@/src/interfaces/article";

export async function petGetArticle(id: string): Promise<Article> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query PetGetArticle($id: String!){
        petGetArticle(id: $id){
          _id
            data{
              content
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
    .then((result) => result.petGetArticle)
}

