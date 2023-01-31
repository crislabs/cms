import { CreateUser, User } from "@/src/interfaces/user";

export async function portfolioCreateUser(input: CreateUser):Promise<User> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
     query: `
     mutation HardwareStoreCreateUser($input: CreateUser!) {
      portfolioCreateUser(input: $input) {
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
     variables: {input},
   }),
 })
 .then(res => res.json())
 .then((res)=> res.data)
 .then((result) => result.portfolioCreateUser) 
}