import { ListService } from '@/src/interfaces/service';
import { ConnectionArgs, ListInput } from '@/src/interfaces/site';

export async function portfolioGetServicesWithCursor(
  args: ConnectionArgs,
  parentId: string,
): Promise<ListService> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 86400 },

    body: JSON.stringify({
      query: `
      query portfolioGetServicesWithCursor($args: ConnectionArgs!, $parentId: String!){
        portfolioGetServicesWithCursor(args: $args, parentId:$parentId){
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
    .then((result) => result.portfolioGetServicesWithCursor);
}
