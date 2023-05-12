<template>
  <div class="form-container">
    <h2 class="form-title">Upload Files</h2>
    <form @submit.prevent="submitForm">
      <div class="form-field">
        <label class="form-label">Choose files to attach:</label>
        <file-input label="Attach files" :onChange="handleFileChange" />
        <p class="form-note">Accepted file types: PDF, Excel, JPG, PNG, Word</p>
      </div>
      <div class="form-field">
        <submit-button label="Submit" />
      </div>
    </form>
  </div>
</template>

<script>
import FileInput from "@/components/FileInput.vue";
import SubmitButton from "@/components/SubmitButton.vue";

export default {
  name: "FormInput",
  components: {
    FileInput,
    SubmitButton,
  },
  methods: {
    handleFileChange(file) {
      // Do something with the file
      console.log(file);
    },
    submitForm() {
      // Submit the form data
      console.log("Form submitted");
      // Redirect to the submission page
      this.$router.push("/submission");
    },
  },
};
</script>

<style>
/* Styles for the form container and header */
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.form-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
}

/* Styles for the form fields */
.form-field {
  margin-bottom: 20px;
}
.form-label {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  display: block;
}
.form-note {
  font-size: 14px;
  color: #888;
  margin-top: 5px;
}
</style>
