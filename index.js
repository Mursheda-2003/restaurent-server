
const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 5000

app.use(express.json())
app.use(cors())
const uri = "mongodb+srv://db_user:admin123123@cluster0.nncwo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      await client.connect();

      const menuCollection = client.db("restaurant").collection("menu");
      const reviewCollection = client.db("restaurant").collection("reviews");
      const cartCollection = client.db("restaurant").collection("carts");


      app.get('/menu', async(req, res)=>{
        const menuData = await
        menuCollection.find().toArray()
        res.send(menuData);
      });
      app.get('/reviews', async(req, res)=>{
        const result =  await reviewCollection.find().toArray()
        res.send(result)
      })
      // cart add to card api
      app.post('/carts', async(req, res)=>{
        const cart = req.body;
        const result =  await cartCollection.insertOne(cart)
        res.send(result)
      })
      app.get('/carts', async(req, res)=>{
        const email = req.query.email;
        const query = {email:email}
        const result = await cartCollection.find(query).toArray()
        res.send(result)
      })
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Welcome to restaurant backend')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// nameing convention
 app.get('/user')
 app.get('/user/:id')
 app.post('/user')
 app.post('/user/:id')
 app.put('/user/:id')
 app.delete('/user/:id')