
import { Router,Request,Response } from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {z} from "zod"

import { PrismaClient } from "../../prisma/generated/prisma";
const JWT_SECRET_USER = process.env.JWT_SECRET_USER


const client = new PrismaClient()

export const userRouter = Router()

    const signupShema = z.object({
     email:z.string()
    .nonempty({ message: "Email is required" })
        .min(6, { message: "Email must be at least 6 characters long" })
        .max(320, { message: "Email must be less than 320 characters" })
        .email({ message: "Please enter a valid email address" }),

        password: z.string()
             .nonempty({ message: "Password is required" })
        .min(5, { message: "Password must be at least 5 characters long"})
        .max(20, { message: "Password must be less than 20 characters" }) 
        .refine(
            (value) => /[A-Z]/.test(value), 
            { message: "Password must contain at least one uppercase letter" }
          )
          .refine(
            (value) => /[a-z]/.test(value), 
            { message: "Password must contain at least one lowercase letter" }
          )
          .refine((value) => /[0-9]/.test(value), {
            message: "Password must contain at least one number"
        })

    })

        const signInSchema = z.object({
     email:z.string()
    .nonempty({ message: "Email is required" })
        .min(6, { message: "Email must be at least 6 characters long" })
        .max(320, { message: "Email must be less than 320 characters" })
        .email({ message: "Please enter a valid email address" }),

        password: z.string()
             .nonempty({ message: "Password is required" })
        .min(5, { message: "Password must be at least 5 characters long"})
        .max(20, { message: "Password must be less than 20 characters" }) 
   
         

    })


userRouter.post("/signup",async function (req:Request,res:Response){


        const result = signupShema.safeParse(req.body)

         if (!result.success) {
          res.status(400).send({
            message:"Incorrect Format", 
            error:result.error.issues[0].message
        })

        return
    }

    const {email, password} = result.data

    try {

        const existUser = await client.user.findFirst({
            where:{
                email
            }
        })

        if (existUser) {
            
            res.status(409).send({
                 message:"user is already exists in our database",
                success: false
            })

            return
        }
      
        const hashPassword = await bcrypt.hash(password,10) 

        const user  = await client.user.create({
            data:{
                email,
            password: hashPassword
            }
        })

        // 2. Generate JWT token
  const token = jwt.sign({ id: user.id.toString() }, process.env.JWT_SECRET_USER as string, {
    expiresIn: "7d"
  });

           if (user) {
             res.status(200).send({
                message:"Signed up successfully...",
                token,
                success: true
            })

            return
        }else{

         res.status(500).send({
         message: "Failed to create user",
         success: false
});

        }

        
    } catch (error:any) {
        
           console.error(error);  // Log the error for debugging

       res.status(500).send({
        message:`Internal server error `,
        error: error.message,
        success: false
       }) 

    }}
)



userRouter.post("/signin",async function signin(req:Request,res:Response){

        const result = signInSchema.safeParse(req.body)

         if (!result.success) {
          res.send({
            message:"Incorrect Format", 
            error:result.error.issues[0].message
        })

        return
    }

    const {email, password} = result.data

    try {

        const user = await client.user.findFirst({
           where:{
            email
           } 
        })

        if (!user) {
            
           res.status(400).send({
                message:"User does not exist. Please sign up first."
            })

            return
        }
      
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (passwordMatch) {
          
            const token = jwt.sign({
                id: user.id.toString()
            },JWT_SECRET_USER as string)

             res.status(200).send({
                message:"Successflly signed  in....",
                email: user.email,
                token,
                success:true
            })

        }else{

          res.status(401).send({
                message:"your credentials are incorrect...",
                success: false
            })

            return

        }

        
    } catch (error:any) {
        
           console.error(error);  // Log the error for debugging

       res.status(500).send({
        message:`Internal server error `,
        error: error.message,
        success: false
       }) 

    }
}
)


