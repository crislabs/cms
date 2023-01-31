import { ListAdoption } from '@/src/interfaces/adoption';
import { ConnectionArgs } from '@/src/interfaces/site';

export async function portfolioGetAdoptionsWithCursor(
  args: ConnectionArgs,
  parentId: string,
): Promise<ListAdoption> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 10 },
    body: JSON.stringify({
      query: `
      query portfolioGetAdoptionsWithCursor($args: ConnectionArgs!, $parentId: String!){
        portfolioGetAdoptionsWithCursor(args: $args, parentId:$parentId){
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
                  thumbnailUrl
                }
                slug
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
      variables: { args, parentId },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetAdoptionsWithCursor);
}
