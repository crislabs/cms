
import { Article, UpdateArticle, UpdateContentArticle } from '@/src/interfaces/article';
import axios from 'axios';

export async function portfolioUpdateArticle(input: UpdateArticle): Promise<Article> {
  const {
    data: {
      data: { portfolioUpdateArticle },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation portfolioUpdateArticle($input: UpdateArticle!) {
        portfolioUpdateArticle(input: $input) {
          _id
            data{
              name
              content
              description
              thumbnailUrl
            }
          slug
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  return portfolioUpdateArticle;
}
export async function portfolioUpdateArticleContent(input: UpdateContentArticle): Promise<Article> {
  const {
    data: {
      data: { portfolioUpdateContentArticle },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation portfolioUpdateContentArticle($input: UpdateContentArticle!) {
        portfolioUpdateContentArticle(input: $input) {
          _id
            data{
              name
              content
              description
              thumbnailUrl
            }
          slug
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  return portfolioUpdateContentArticle;
}
