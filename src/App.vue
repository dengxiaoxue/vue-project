<script setup>
import HelloWorld from "./components/HelloWorld.vue";
// import KonvaComp from "./components/KonvaComp.vue";
</script>

<template>
  <div class="wrapper">
    <!-- <KonvaComp ruler /> -->
    <HelloWorld></HelloWorld>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
.wrapper {
  width: 100%;
  height: 100vh;
  border: 1px solid yellowgreen;
  box-sizing: border-box;
}
</style>
