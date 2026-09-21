const express = require('express');
const app = express();

app.use(express.json());
app.use((req, res, next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});


app.get("/", (req,res)=>{
    res.json({"message": "Hey There Iam Aniket"})
});

app.get("/health", (req,res)=>{
    res.json({"status": "OK"});
});

app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})

const articles = [
    {'id': 1, 'title': 'Article 1', 'category': 'Finance', 'content': 'This is the content of Article 1'},
    {'id': 2, 'title': 'Article 2', 'category': 'Finance', 'content': 'This is the content of Article 2'},
    {'id': 3, 'title': 'Article 3', 'category': 'Sports', 'content': 'This is the content of Article 3'},
];

app.get("/articles", (req, res)=>{
    res.json(articles);
});

app.get("/articles/:id", (req, res)=>{
    const articleId = Number(req.params.id);
    const article = articles.find((a)=> a.id === articleId);

    if(!article){
        return res.status(404).json({"message": "Article Not Found"});
    }
    res.json(article);
});

app.get("/articles", (req,res)=>{
    const category = req.query.category;

    if(category){
        const filtered = articles.filter((a)=> a.category.toLowerCase() === category.toLowerCase());
        return res.json(filtered);
    }
    else{
        return res.status(404).json({"message": "Category Not Found"});
    }
    res.json(articles);
});


app.post("/articles", (req, res)=>{
    const {title, category, content} = req.body;

    if(!title || !category || !content){
        return res.status(400).json({"Message": "Title, Category and Content are required"});
    }

    const newArticle = {
        id: articles.length + 1,
        title,
        category,
        content
    };

    articles.push(newArticle);
    res.status(201).json(newArticle);
});