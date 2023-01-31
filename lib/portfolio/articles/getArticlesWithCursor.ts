import { ListAdoption } from '@/src/interfaces/adoption';
import { ListArticle } from '@/src/interfaces/article';
import { ListPage, Page } from '@/src/interfaces/page';
import { ConnectionArgs, ListInput } from '@/src/interfaces/site';

export async function portfolioGetArticlesWithCursor(
  args: ConnectionArgs,
  parentId: string,
): Promise<ListArticle> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 10 },
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query portfolioGetArticlesWithCursor($args: ConnectionArgs!, $parentId: String!){
        portfolioGetArticlesWithCursor(args: $args, parentId:$parentId){
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
    .then((result) => result.portfolioGetArticlesWithCursor);
}
