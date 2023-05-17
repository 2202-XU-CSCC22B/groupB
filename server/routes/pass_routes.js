const express = require("express");
const PassForm = require("../models/pass_model");
const app = express();

app.post("/passes/add", async (request, response) => {
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

app.get("/passes/check_approval/:passId", async (request, response) => {
  const passId = request.params.passId;
  try {
    const pass = await PassForm.findById(passId);
    if (!pass) {
      response.status(404).send({ message: "Pass not found" });
      return;
    }

    const isApproved =
      pass.rcv.signed === true &&
      pass.appr.approved === true &&
      pass.gtappr.some(item => item.approved === true) &&
      pass.ver.signed === true;
      
    if (isApproved) {
      if (!pass.done) {
        pass.done = true; // Set the 'done' field to true
        try {
          await pass.save(); // Save the updated pass document
          response.send({ message: "approved" });
        } catch (error) {
          console.log(error); // Log the error for debugging
          response.status(500).send({ message: "An error occurred while saving the pass." });
        }
      } else {
        response.send({ message: "approved" });
      }

    } else {
      const unapprovedItems = [];

      if (pass.appr.approved === false) {
        unapprovedItems.push(`Approver <strong>${pass.appr.name} (${pass.appr.title})</strong> has not signed.`);
      }
      
      if (pass.ver.signed === false) {
        unapprovedItems.push(`Verifier <strong>${pass.ver.name} (${pass.ver.title})</strong> has not signed.`);
      }

      if (pass.rcv.signed === false) {
        unapprovedItems.push(`Receiver <strong>${pass.rcv.name}</strong> has not signed.`);
      }

      const approvedGtapprItems = pass.gtappr.filter(item => item.approved === true);
      if (approvedGtapprItems.length === 0) {
        unapprovedItems.push("<strong>Gate Approval</strong> has not been signed.");
      }

      response.send({ message: "unapproved", unapprovedItems });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
}); 

app.put("/passes/:id", async (request, response) => {
  const { id } = request.params;
  const update = request.body;

  try {
    const pass = await PassForm.findByIdAndUpdate(id, update, { new: true });
    if (!pass) {
      return response.status(404).send({ error: "Pass not found" });
    }
    response.send(pass);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
});

app.delete("/passes/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const pass = await PassForm.findByIdAndDelete(id);
    if (!pass) {
      return response.status(404).send({ error: "Pass not found" });
    }
    response.send({ message: "Pass deleted successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
});

module.exports = app;