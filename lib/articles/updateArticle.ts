
import { Article, UpdateArticle, UpdateContentArticle } from '@/src/interfaces/article';
import axios from 'axios';

export async function petUpdateArticle(input: UpdateArticle): Promise<Article> {
  const {
    data: {
      data: { petUpdateArticle },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PetUpdateArticle($input: UpdateArticle!) {
        petUpdateArticle(input: $input) {
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
  return petUpdateArticle;
}
export async function petUpdateArticleContent(input: UpdateContentArticle): Promise<Article> {
  const {
    data: {
      data: { petUpdateContentArticle },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PetUpdateContentArticle($input: UpdateContentArticle!) {
        petUpdateContentArticle(input: $input) {
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
  return petUpdateContentArticle;
}
