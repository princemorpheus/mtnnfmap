<template>
  <div
    class="w3-content max-width780 pt-3 pb-2 mb-3 w3-white"
    style="z-index: 111"
  >
    <h2 class="color-yello bold size48 text-shadow-black">Y'ello!</h2>
    <p class="bold text-lg mtn-p">
      Welcome to MTN Nigeria Foundation Projects Map.
    </p>
    <p class="text-black mtn-p">
      Kindly click on a location marker on the map to see the project
      implemented at that location within the state.
    </p>
    <p class="pb-0 mtn-p">
      You can also use the search button to search for projects carried out
      within any State or the Federal Capital Territory.
    </p>
    <p class="my-3 pt-3 mnt-p mtn-p">Use the form to select your location</p>
    <div class="w3-grey w3-round-large">
      <MapForm />
    </div>
  </div>
</template>

<script setup>
import MapForm from "./MapForm.vue";
</script>