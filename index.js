const http = require("http");
const url= require("url");
const fs= require("fs");


const itemdata= fs.readFileSync("./items.json", "utf-8");
const itemObj= JSON.parse(itemdata);

console.log(itemObj);

const server= http.createServer((req,res)=>{

    const pathname= req.url;

    switch (pathname) {
        case "/home":           
            res.writeHead(200, {
                "Content-type":"text/html"
            })
            res.end("<h1>Homepage</h1>")

            case "/about":           
            res.writeHead(200, {
                "Content-type":"text/html"
            })
            res.end("<h1>AboutPage</h1>")

            case "/items":           
            res.writeHead(200, {
                "Content-type":"application/json"
            })
            res.end(itemdata)
    
        default:
            res.writeHead(200, {
                "Content-type":"text/html"
            })
            res.end("<h1>sending data from shop</h1>")
    }    

})



server.listen(8000,"127.0.0.1", (err)=>{
    console.log("server is up and running")
})