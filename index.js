const http = require("http");
const url= require("url");
const fs= require("fs");

const homepage= fs.readFileSync(`${__dirname}/templates/Home.html`);
const aboutpage= fs.readFileSync(`${__dirname}/templates/About.html`);
const itemspage= fs.readFileSync(`${__dirname}/templates/items.html`);
const templatecard= fs.readFileSync(`${__dirname}/templates/card.html`);
const individualItem= fs.readFileSync(`${__dirname}/templates/item.html`);
const notfound= fs.readFileSync(`${__dirname}/templates/Notfound.html`);
const itemdata= fs.readFileSync("./items.json", "utf-8");
const itemObj= JSON.parse(itemdata);



const replaceTemplate=(temp,el)=>{
  let output =temp.toString().replace(/{%name%}/g, el.name);
  output = output.toString().replace(/{%image%}/g, el.image);
  output = output.toString().replace(/{%description%}/g, el.description);
  output= output.toString().replace(/{%id%}/g, el.id)
  return output;
}


const replaceindividual=(template,element)=>{

     let output= template.toString().replace(/{%name%}/g, element.name);
     output = output.toString().replace(/{%image%}/g, element.image);
    output = output.toString().replace(/{%description%}/g, element.description);
    output = output.toString().replace(/{%price%}/g, element.price);
    output = output.toString().replace(/{%location%}/g, element.Location);
    output = output.toString().replace(/{%materials%}/g, element.materials);
    return output;

}


const server= http.createServer((req,res)=>{

    const  {query:{id}, pathname} = url.parse(req.url, true);
    console.log(pathname);

    if(pathname==="/" || pathname==="/home"){
        res.writeHead(200, {
            "Content-type":"text/html"
        })
        res.end(homepage)
    } else if ( pathname ==="/about") {
        res.writeHead(200, {
            "Content-type":"text/html"
        })
        res.end(aboutpage)
    } else if (pathname==="/items"){
        res.writeHead(200, {
            "Content-type":"text/html"
        })
        const cardItem= itemObj.map((el)=> replaceTemplate(templatecard,el)).join("");
        
        let output= itemspage.toString().replace(/{%card%}/g,cardItem);

        res.end(output);
    } else if (pathname ==="/item"){
        res.writeHead(200,{
            "Content-type": "text/html"
        })
        const singleItem= itemObj[id];
        let singleoutput= replaceindividual(individualItem,singleItem);
        res.end(singleoutput);
    } else {
        res.writeHead(404,{
            "Content-type": "text/html"
        })
        res.end(notfound);

    }
    
})



server.listen(8000,"127.0.0.1", (err)=>{
    console.log("server is up and running")
})