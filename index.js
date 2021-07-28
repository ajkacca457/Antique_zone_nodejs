const http = require("http");
const url= require("url");
const fs= require("fs");

const homepage= fs.readFileSync(`${__dirname}/templates/Home.html`);
const aboutpage= fs.readFileSync(`${__dirname}/templates/About.html`);
const itemspage= fs.readFileSync(`${__dirname}/templates/items.html`);
const templatecard= fs.readFileSync(`${__dirname}/templates/card.html`);
const individualItem= fs.readFileSync(`${__dirname}/templates/item.html`);
const itemdata= fs.readFileSync("./items.json", "utf-8");
const itemObj= JSON.parse(itemdata);


const replaceTemplate=(temp,el)=>{
  let output =temp.toString().replace(/{%name%}/g, el.name);
  output = output.toString().replace(/{%image%}/g, el.image);
  output = output.toString().replace(/{%description%}/g, el.description);
  return output;
}



const server= http.createServer((req,res)=>{

    const pathname= req.url;

    switch (pathname) {
        case "/home":           
            res.writeHead(200, {
                "Content-type":"text/html"
            })
            res.end(homepage)

            case "/about":           
            res.writeHead(200, {
                "Content-type":"text/html"
            })
            res.end(aboutpage)

            case "/items":           
            res.writeHead(200, {
                "Content-type":"text/html"
            })
            const cardItem= itemObj.map((el)=> replaceTemplate(templatecard,el)).join("");
            
            let output= itemspage.toString().replace(/{%card%}/g,cardItem);

            res.end(output);
    
        default:
            res.writeHead(200, {
                "Content-type":"text/html"
            })
            res.end(homepage)
    }    

})



server.listen(8000,"127.0.0.1", (err)=>{
    console.log("server is up and running")
})