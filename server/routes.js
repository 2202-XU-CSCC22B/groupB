const express = require("express");
const PassForm = require("./model");
const app = express();

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

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

app.get("/check_approval/:passId", async (request, response) => {
  const passId = request.params.passId;
  try {
    const pass = await PassForm.findById(passId);
    if (!pass) {
      response.status(404).send({ message: "Pass not found" });
      return;
    }

    const isApproved =
      pass.rcv.signed === true &&
      pass.appr.signed === true &&
      pass.gappr.some(item => item.approved === true) &&
      pass.ver.signed === true;
      
    if (isApproved) {
      pass.done = true; // Set the 'done' field to true
      await pass.save(); // Save the updated pass document

      response.send({ message: "The pass is approved" });
    } else {
      const unapprovedItems = [];
      if (pass.rcv.signed === false) {
        unapprovedItems.push("rcv");
      }
      pass.gappr.forEach((item, index) => {
        if (item.approved === false) {
          unapprovedItems.push(`appr[${index}]`);
        }
      });
      if (pass.ver.signed === false) {
        unapprovedItems.push("ver");
      }
      response.send({ message: "The pass is not fully approved", unapprovedItems });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
});  

module.exports = app;