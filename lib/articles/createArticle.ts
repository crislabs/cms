
import { Article, CreateArticle } from '@/src/interfaces/article';
import axios from 'axios';

export async function petCreateArticle(input: CreateArticle): Promise<Article> {
  const {
    data: {
      data: { petCreateArticle },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PetCreateArticle($input: CreateArticle!) {
        petCreateArticle(input: $input) {
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  // .then((res) => res.data)
  return petCreateArticle;
}
