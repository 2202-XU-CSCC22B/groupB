const PassForm = require("../models/pass_model");
const fieldNames = require("../fieldNames");

// Create a new pass
exports.createPass = async (req, res) => {
  try {
    const pass = new PassForm(req.body);
    await pass.save();
    res.status(201).send(pass);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create pass", message: error.message });
  }
};

// Get all passes
exports.getAllPasses = async (req, res) => {
  try {
    const passes = await PassForm.find({});
    res.send(passes);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch passes", message: error.message });
  }
};

// Check pass approval status
exports.checkPassApproval = async (req, res) => {
  const passId = req.params.passId;

  try {
    const pass = await PassForm.findById(passId);
    if (!pass) {
      res.status(404).send({ message: "Pass not found" });
      return;
    }

    const isApproved =
      pass.rcv.signed === true &&
      pass.appr.approved === true &&
      pass.gtappr.some((item) => item.approved === true) &&
      pass.ver.signed === true &&
      pass.reqs_uploaded === true;

    if (isApproved) {
      if (!pass.done) {
        pass.done = true; // Set the 'done' field to true
        await pass.save(); // Save the updated pass document
      }
      res.send({ message: "approved" });
    } else {
      const unapprovedItems = [];

      if (!pass.reqs_uploaded) {
        unapprovedItems.push(`Missing document: <strong>${fieldNames[pass.nature._reqs]}</strong>.`);
      }

      if (!pass.appr.approved) {
        unapprovedItems.push(`Approver <strong>${pass.appr.name} (${pass.appr.title})</strong> has not signed.`);
      }

      if (!pass.ver.signed) {
        unapprovedItems.push(`Verifier <strong>${pass.ver.name} (${pass.ver.title})</strong> has not signed.`);
      }

      if (!pass.rcv.signed) {
        unapprovedItems.push(`Receiver <strong>${pass.rcv.name}</strong> has not signed.`);
      }

      const approvedGtapprItems = pass.gtappr.filter((item) => item.approved === true);
      if (approvedGtapprItems.length === 0) {
        unapprovedItems.push("<strong>Gate Approval</strong> has not been signed.");
      }

      res.send({ message: "unapproved", unapprovedItems });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while checking pass approval status", message: error.message });
  }
};

// Update a pass
exports.updatePass = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const pass = await PassForm.findByIdAndUpdate(id, update, { new: true });
    if (!pass) {
      res.status(404).send({ error: "Pass not found" });
      return;
    }
    res.send(pass);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update pass", message: error.message });
  }
};

// Delete a pass
exports.deletePass = async (req, res) => {
  const { id } = req.params;

  try {
    const pass = await PassForm.findByIdAndDelete(id);
    if (!pass) {
      res.status(404).send({ error: "Pass not found" });
      return;
    }
    res.send({ message: "Pass deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to delete pass", message: error.message });
  }
};
