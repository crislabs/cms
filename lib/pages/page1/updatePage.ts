import { UpdatePage, Page } from '@/src/interfaces/page';
import axios from 'axios';


export async function petUpdatePage1(input: UpdatePage): Promise<Page> {
  const {
    data: {
      data: { petUpdatePage1 },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PetUpdatePage1($input: UpdatePage!) {
        petUpdatePage1(input: $input) {
          _id
            data{
              type {
                slug
              }
              name
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
  // .then((res) => res.data)
  return petUpdatePage1;
}
