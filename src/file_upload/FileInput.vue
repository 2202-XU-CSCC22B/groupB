<template>
  <div>
    <label>{{ label }}</label>
    <div>
      <input type="file" multiple @change="handleFileInput" />
      <ul>
        <li v-for="(file, index) in selectedFiles" :key="file.name">
          {{ file.name }}
          <button @click="removeFile(index)">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from '@/../server/axios-config.js';

export default {
  name: "FileInput",
  props: {
    label: {
      type: String,
      required: true,
    },
    passId: {
      type: String,
      required: true,
    },
    onChange: {
      type: Function,
      required: true,
    },
    maxFiles: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      selectedFiles: [],
    };
  },
  methods: {
    async handleFileInput(event) {
      const selectedFiles = Array.from(event.target.files);
      const allowedTypes = [
        "application/pdf",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "image/jpeg",
        "image/png",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const newFiles = selectedFiles.filter((file) =>
        allowedTypes.includes(file.type)
      );
      const invalidFiles = selectedFiles.filter(
        (file) => !allowedTypes.includes(file.type)
      );
      const invalidLength =
        this.selectedFiles.length + newFiles.length > this.maxFiles;
      if (invalidLength) {
        alert(`Please upload no more than ${this.maxFiles} files.`);
      } else if (invalidFiles.length > 0) {
        alert("Invalid file type.");
      } else {
        this.selectedFiles.push(...newFiles);
        const formData = new FormData();
        newFiles.forEach((file) => {
          formData.append('file', file);
        });
        try {
          const response = await axios.post(`/file/upload/${this.passId}`, formData);
          console.log(response.data);
          alert(`Successfully uploaded to pass ${this.passId}!`) // Handle the response from the server
        } catch (error) {
          console.error(error);
          alert('File upload failed.');
        }
        const files = this.selectedFiles.map((file) => file.name);
        this.onChange(files);
      }
    },
    
    removeFile(index) {
      this.selectedFiles.splice(index, 1);
      const files = this.selectedFiles.map((file) => file.name);
      this.onChange(files);
    },
  },
};
</script>
