import { sql } from "../sqlConnection";
export async function createUserService(id: string, email: string, fullname: string): Promise<string[]> {
  return await sql`
    INSERT INTO Users (id, email, fullname)
    VALUES (
      ${id}, 
      ${email}, 
      ${fullname}
    )
    ON CONFLICT (id) DO NOTHING;
  `
}
