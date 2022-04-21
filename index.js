// Import items
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
const uri = `mongodb+srv://dbUser:I67TXOLTG1NNqExC@cluster0.ciohn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const run = async () => {
    try {
        await client.connect();
        const userDb = client.db('useCollection').collection('user');

        app.post('/user', async (req, res) => {
            const user = req.body;
            res.send({status: 'Success'});

            console.log('New user:', user)

            const result = await userDb.insertOne(user)

            console.log(`User inserted with _id: ${result.insertedId}`);
        });

    } finally {
        // await client.close()
    }
};

run().catch(console.dir);

// Get response
app.get('/', (req, res) => {
    res.send('Welcome to user backend database');
});

// Listen to the port
app.listen(port, () => {
    console.log(`Running server at ${port}`);
});
