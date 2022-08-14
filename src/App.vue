<template>
  <div>
    <MapIntro />
    <GMap />
  </div>
</template>

<script setup>
import GMap from "./components/GoogleMap.vue";
import "./assets/css/w3.css";
import "./assets/css/utility.css";
import MapIntro from "./components/MapIntro.vue";
</script>
<style>
.color-yello {
  color: #ffcc01;
}
</style>
