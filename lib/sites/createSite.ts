import { CreateSite, Site } from "@/src/interfaces/site";

export async function petCreateSite(input: CreateSite):Promise<Site> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     query: `
     mutation PetCreateSite($input: CreateSite!) {
      petCreateSite(input: $input) {
        _id
      }
    }
     `,
     variables: {input},
   }),
 })
 .then(res => res.json())
 .then((res)=> res.data)
 .then((result) => result.petCreateSite) 
}