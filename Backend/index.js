const express = require("express")
const fs = require("fs")
var cors = require('cors');
const { hrtime } = require("process");
const app = express()
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.url ,1)
    const stratTime=process.hrtime()
    
    next()
    const endTime=process.hrtime()
    console.log(endTime[1])
    const time =endTime[0]*1e3+endTime[1]/1e6;
    console.log(time)
    
})

app.use(cors())

app.get("/product" ,  (req , res)=>
{
    fs.readFile("./db.json" , "utf-8" , (err , data)=>
    {1

         res.send(JSON.parse(data))
         
    })
})


app.delete("/deleteproduct/:id", (req, res) => {
    const productId = req.params.id;

    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
             req.send(err)
        }

        let products = JSON.parse(data);
        const filteredProducts = products.product.filter(product => product.id != productId);

        if (products.product.length === filteredProducts.length) {
             req.send(err)
        }

        products.product = filteredProducts;

        fs.writeFile("./db.json", JSON.stringify(products), (err) => {
            if (err) {
                req.send(err)
            }
            res.json({ message: "Product delete" });
        });
    });
});




app.put("/updateproduct/:id", (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;

    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            req.send(err)
        }

        let products = JSON.parse(data);
        let  editproduct = products.product.findIndex(product => product.id == productId);

        if (editproduct === 1) {
            req.send(data)
        }   

        products.product[editproduct] = { ...products.product[editproduct], ...updatedData };

        fs.writeFile("./db.json", JSON.stringify(products), (err) => {
            if (err) {
                req.send(data)
            }
            res.json({ message: "updated", product: products.product[editproduct] });
        });
    });
});


app.post("/addproduct", (req, res) => {
    const newProduct = req.body;

    fs.readFile("./db.json", "utf-8", (err, data) => {

        if (err) {
             req.send(err)
        }

        let products = JSON.parse(data);
        
        newProduct.id = products.product.length > 0 ? products.product[products.product.length - 1].id + 1: 1;
        
        products.product.push(newProduct);

        fs.writeFile("./db.json", JSON.stringify(products), (err) => {
            if (err) {
                 req.send(err)
            }
            res.json({ message: "Product added", product: newProduct });
        });
    });
});

app.listen(8080 , ()=>
{   
    console.log("server is running")
})

