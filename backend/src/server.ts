import express from 'express';

const app = express();


app.get("/", (request, response) => {
    return response.json([
        "Diego",
        "Mike",
        "Luiz",
        "Renan"
    ])
})

app.listen(3333);