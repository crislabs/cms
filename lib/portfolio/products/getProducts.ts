import { Product } from "@/src/interfaces/product";
import { Page } from "@/src/interfaces/page";


export async function portfolioGetProducts(): Promise<Product[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query portfolioGetProducts{
        portfolioGetProducts{
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
    .then((result) => result.portfolioGetProducts)
}
