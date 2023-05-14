<template>
  <button @click="onClick">{{ label }}</button>
</template>

<script>
export default {
  name: "SubmitButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
};
</script>
