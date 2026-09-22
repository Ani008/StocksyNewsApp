const express = require('express');
const {db} = require("./db");
const {articles} = require("./db/schema");
const {eq} = require("drizzle-orm");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json());


app.get("/", (req,res)=>{
    res.json({"message": "Hey There Iam Aniket"})
});

app.get("/health", (req,res)=>{
    res.json({"status": "OK"});
});

app.listen(PORT,()=>{
    console.log(`Server is running on port - ${PORT}`);
})

app.get("/articles", async(req, res, next)=>{
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    try{
        const allArticles = await db.select().from(articles).limit(limit).offset(offset);
        res.json(allArticles);
    } catch (err){
        next(err);
    }
});

app.get("/articles/:id", async(req, res, next)=>{
    try{
        const articleId = Number(req.params.id);
        const fetchedArticle = await db.select().from(articles).where(eq(articles.id, articleId));

        if(fetchedArticle.length===0){
            return res.status(404).json({message:"Enter Valid Article Id"});
        }
        res.json(fetchedArticle[0]);
    }
    catch(err){
        next(err);
    }
});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).json({message:"Something Went Wron on our side"});
});