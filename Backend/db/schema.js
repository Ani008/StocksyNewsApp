const { integer } = require("drizzle-orm/gel-core");
const {pgTable, serial, text, timestamp} = require("drizzle-orm/pg-core");

const categories = pgTable("categories",{
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
});

const articles = pgTable("articles",{
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    categoryId: integer("category_id").references(()=>categories.id),
    createdAt: timestamp("created_at").defaultNow(),
});

module.exports={articles, categories};