const express = require("express");
const PassForm = require("./model");
const app = express();

app.post("/add_pass", async (request, response) => {
    const pass = new PassForm(request.body);
  
    try {
      await pass.save();
      response.send(pass);
    } catch (error) {
      console.log(error);
      response.status(500).send({error: error.message});
    }
})

app.get("/passes", async (request, response) => {
    const pass = await PassForm.find({});
  
    try {
      response.send(pass);
    } catch (error) {
      console.log(error);
      response.status(500).send({error: error.message});
    }
  });

module.exports = app;