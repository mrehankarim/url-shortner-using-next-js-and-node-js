import express from "express"
import { nanoid } from 'nanoid'
import cors from "cors"
const app=express()
app.use(cors())
const PORT=5000
app.use(express.json({limit:"16kb"}))
const URLDB={}

app.post("/short",(req,res)=>{
    
    const {longUrl}=req.body
   
    if(!longUrl)
    {
        return res.status(400).json({
            error:"URL is required"
        })
    }
    const shortUrlID=nanoid(6)

    URLDB[shortUrlID]=longUrl
   return res.json({ shortUrl: `http://localhost:${PORT}/${shortUrlID}` });
})


app.get("/:shortId",(req,res)=>{
    const longURL=URLDB[req.params.shortId]
    if (!longURL) return res.status(404).json({ error: "URL not found" });
    return res.redirect(longURL)
})

app.listen(PORT,()=>{
    console.log("Server is running at port http://localhost:5000")
})