<template>
  <div class="cards">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: { type: Object },
  },
};
</script>

<style>
.card {
  background-color: #fff;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  max-width: 100%;
  width: auto;
  min-height: 100px;
}
.card h6 {
  opacity: 0.6;
  margin: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.card h2 {
  letter-spacing: 1px;
  margin: 10px 0;
}
.card-preview {
  background-color: var(--primary);
  color: #fff;
  padding: 10px;
  min-width: 100px;
  max-width: 100px;
}
.card-info {
  padding: 20px;
  position: relative;
  width: 100%;
}

</style>
