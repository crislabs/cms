import { ConnectionArgs, ListSite, Site } from "@/src/interfaces/site";
// import fetch from 'node-fetch';
export async function petGetSitesWithCursor(args: ConnectionArgs):Promise<ListSite> {
   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    next: { revalidate: 10 },
    body: JSON.stringify({
      query: `
      query PetGetSitesWithCursor($args: ConnectionArgs!) {
        petGetSitesWithCursor(args: $args) {
          page {
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
            edges {
              cursor
              node {
                _id
                data{
                  name
                  description
                  images{
                    logo{
                      src
                    }
                  }
                  type{
                    slug
                  }
                }
                
              }
            }
          }
          pageData {
            count
            limit
            offset
          }
        }
      }
      `,
      variables: {args},
    }),
  })
  .then(res => res.json())
  .then((res)=> res.data)
  .then((result) => result.petGetSitesWithCursor) 
}

