const express = require("express")
const jwt = require("jsonwebtoken") //dependencies of web token, install with command [yarn add jsonwebtoken]
const app = express()
const SECRET = "secreto"

app.use(express.json())

app.get("/home", (req,res)=> {
    res.send("Page View without authentication")
})

function verifyJWT(req,res,next){
    const token = req.headers['x-access-token']; // in HEADERS of postman, put of your "KEY" like "x-access-token" and "VALUE" the token with was generated in method post
    jwt.verify(token, SECRET,(err, decoded) => {
        if(err) return res.status(401).end()

        else {
        req.userId = decoded.userId
        next()
        }
    })
}

// Verifying token 
app.get("/list", verifyJWT, (req,res) => {
    console.log("Id connected, validated solicitation")
    res.json([{id: 1, name: 'Lima'}])
})


//create your own registration and give you back your token
app.post("/post", (req,res) =>{

    if(req.body.name === 'Lima' && req.body.password === '1000'){
        const token = jwt.sign({userId: 1}, SECRET, {expiresIn: 300})
        return res.status(200).json({auth: true, token})
    }
    else(req.body.name !== 'Lima' && req.body.password !== '1000')
        return res.status(401).json("Wrong user or password, invalid informations")
    
    
})

app.listen(1000, () => {
    console.log("Server Listening on port 1000")
})