<template>
  <div>
    <button @click="toggleCenter" class="btn btn-primary">Toggle</button>
    <div>{{ center }}</div>
    <div
      id="mtnf_map"
      class="absolute"
      style="margin-top: 0px; width: 100%; height: 100%; overflow: visible"
    ></div>
  </div>
</template>
<script>
import { Loader } from "@googlemaps/js-api-loader";
import { computed, onMounted, ref } from "vue";
import Data from "../data/data";
export default {
  name: "MTNMap",

  setup() {
    const data = Data;

    const center_nigeria = ref({ lat: 9.37594, lng: 7.876908 });
    const center_kogi = ref({ lat: 7.65699, lng: 6.733794 });
    const zoom = ref(6);
    const target = ref("nigeria");

    const center = computed(() => {
      return target.value == "nigeria"
        ? center_nigeria.value
        : center_kogi.value;
    });
    const toggleCenter = () => {
      target.value = target.value == "nigeria" ? "kogi" : "nigeria";
      zoom.value = target.value == "nigeria" ? 6 : 8;
      map.value.setZoom(zoom.value);
    };

    const loader = new Loader({
      apiKey: "AIzaSyBydrAVgBUHolVBPl12Ioog75Nd4Y8LAio",
      version: "weekly",
      libraries: ["places"],
    });

    const mapOptions = {
      center: center.value,
      zoom: zoom.value,
    };
    const map = ref(null);

    loader
      .load()
      .then((google) => {
        map.value = new google.maps.Map(
          document.getElementById("mtnf_map"),
          mapOptions
        );
        console.log(map.value);
      })
      .catch((e) => {
        console.log(e);
      });

    onMounted(() => {});
    return {
      center,
      zoom,
      data,
      toggleCenter,
    };
  },
};
</script>