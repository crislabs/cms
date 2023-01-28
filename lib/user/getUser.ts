
import { User } from "@/src/interfaces/user";
import { petCreateUser } from "./createUser";


export async function petGetUserByEmail(email: string, siteId: string):Promise<User> {
   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query HardwareStoreGetUserByEmail($email: String!, $siteId: String!) {
        petGetUserByEmail(email: $email, siteId: $siteId) {
          _id
        data{
          username
          role
          picture
        }
        email
        }
      }
      `,
      variables: {email, siteId},
    }),
  })
  .then(res => res.json())
  .then((res)=> res.data)
  .then((result) => result.petGetUserByEmail) 
}


export const oAUthToDbUser = async( oAuthemail: string, oAuthusername: string, oAuthimage: string, oAuthprovider:string ) => {
  try {
    const user = await petGetUserByEmail(oAuthemail, '63c29c23d15e494f6910e18a')
    if ( user ) {
        const { _id, data, email } = user;
        const { username, role, picture } = data
        
        return { sid: _id, username, email, role, image: picture };
    } 
  } catch (error) {
    console.log(error);
  }

    const newUser = await petCreateUser({ username: oAuthusername, email: oAuthemail, password: '@@@@@@', role: 'USER_ROL', image: oAuthimage, siteId: process.env.NEXT_PUBLIC_SITE_URL as string, oAuth: oAuthprovider})  
    // graphQLClient.request(CREATE_USER, { input: { email: oAuthEmail.toLowerCase(), username: oAuthUserName.toLowerCase(), password: '@@@@@@', role: 'USER_ROL', image: oAuthPicture, site: '1234567', oAuth: aAuthProvider } })
      const { _id, data, email } = newUser;
      const { username, role, picture } = data;
      
    return { sid:_id, username, email, role, image: picture };
}