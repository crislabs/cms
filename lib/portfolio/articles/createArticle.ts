
import { Article, CreateArticle } from '@/src/interfaces/article';
import axios from 'axios';

export async function portfolioCreateArticle(input: CreateArticle): Promise<Article> {
  const {
    data: {
      data: { portfolioCreateArticle },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation portfolioCreateArticle($input: CreateArticle!) {
        portfolioCreateArticle(input: $input) {
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  // .then((res) => res.data)
  return portfolioCreateArticle;
}
