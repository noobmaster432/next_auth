import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // GitHub Provider
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req){
        connectMongo().catch(error => {error: "Connection Failed...!"})

        // check user existance
        const result = await Users.findOne({ email: credentials.email })
        if (!result) throw new Error("User not found...!")

        // check password
        const checkPassword = await bcrypt.compare(credentials.password, result.password)

        if (!checkPassword) throw new Error("Password is incorrect...!")

        return result
      }
    })
  ],
  secret: "XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0="
});