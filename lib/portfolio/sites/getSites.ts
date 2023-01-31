import { Site } from "@/src/interfaces/site";

export async function portfolioGetSites():Promise<Site[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
  //  cache: 'force-cache',
  //  next: { revalidate: 10 },
   body: JSON.stringify({
     query: `
     query portfolioGetSites {
       portfolioGetSites {
         _id
       }
     }
     `,
     variables: {},
   }),
 })
 .then(res => res.json())
 .then((res)=> res.data)
 .then((result) => result.portfolioGetSites) 
}