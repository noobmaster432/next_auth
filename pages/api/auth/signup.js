import connectMongo from "../../../database/conn"
import Users from "../../../model/Schema";
import bcrypt from "bcryptjs"

export default async function handler(req, res){
    connectMongo()
        .catch(error => res.json({
            error: "Connection failed...!"
        }))

    //only post method is accepted
    if (req.method === "POST"){

        if(!req.body) return res.status(404).json({ error: "Don't have form data...!"})

        const{username, email, password} = req.body;

        //check if user already exists
        const checkexisting = await Users.findOne({ email })
        if (checkexisting) return res.status(422).json({ error: "User already exists...!"})

        //hash password
        const hashedPassword = await bcrypt.hash(password, 12)
        Users.create({username,email,password:hashedPassword},(err, data)=>{
            if(err) return res.status(400).json({ error: "Something went wrong...!"})
            res.status(201).json({message: "User created successfully...!",user:data})
        })
    } else {
        res.status(500).json({
            message: "HTTP method not valid only POST Accepted"
        })
    }
}