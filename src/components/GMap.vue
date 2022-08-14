<template>
  <div>
    <GMapMap
      ref="mtnMap"
      :center="center"
      :zoom="zoom"
      map-type-id="terrain"
      style="width: 100%; height: 100vh; overflow: hidden"
    >
      <!-- <GMapCluster :zoomOnClick="true" :styles="cluster_styles"> -->
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="openMarker(m)"
        :icon="{
          // url: Icons[m.icon],
          scaledSize: { width: 48, height: 48 },
          // labelOrigin: { x: 16, y: -10 },
        }"
      >
        <GMapInfoWindow
          @closeclick="closeMarker"
          :opened="openedMarkerID === m.id"
        >
          <InfoWindow :info="m" />
        </GMapInfoWindow>
      </GMapMarker>
      <!-- </GMapCluster> -->
      <!-- <GMapPolyline :path="path" :editable="true" ref="polyline" /> -->
    </GMapMap>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import Data from "../data/data";
import InfoWindow from "./InfoWindow.vue";
import CMarker from "../assets/location-marker.png";
import YouthDevelopment from "../assets/youth-development.png";
import NationalPriority from "../assets/national-priority.png";

export default {
  name: "MTNMap",
  components: {
    InfoWindow,
  },
  setup() {
    const data = Data;
    const mtnMap = ref(null);
    const center_nigeria = ref({ lat: 9.37594, lng: 7.876908 });
    const center_kogi = ref({ lat: 7.65699, lng: 6.733794 });
    const zoom = ref(7);
    const target = ref("nigeria");

    const Icons = {
      YouthDevelopment,
      NationalPriority,
    };
    const cluster_styles = [
      {
        url: "https://www.mtn.ng/wp-content/themes/mtn-theme/images/mtn-new-logo.svg",
        height: 53,
        width: 53,
        textColor: "#yellow",
        textSize: 72,
      },
    ];
    const Center = computed(() => {
      return target.value == "nigeria"
        ? center_nigeria.value
        : center_kogi.value;
    });
    const center = ref(Center.value);
    // const path = ref([
    //   { lat: 1.33, lng: 103.75 },
    //   { lat: 1.43, lng: 103.85 },
    // ]);
    const markers = computed(() => {
      const markers = data.map((d) => {
        const marker = d.geolocation.split(",");
        console.log(d);
        return {
          id: d.id,
          position: {
            lat: parseFloat(marker[0]),
            lng: parseFloat(marker[1]),
          },
          title: d.title,
          icon: d.icon,
          category: d.category,
        };
      });
      return markers;
    });
    const openedMarkerID = ref(null);
    const openMarker = (m) => {
      closeMarker();
      console.log(m);
      // if (m === null) {
      //   console.log("Null");
      //   openedMarkerID.value = null;
      //   center.value = Center.value;
      // } else {

      // }
      // openedMarkerID.value = null;
      openedMarkerID.value = m.id;
      // zoom.value = 8;
      // center.value = m.position;
    };
    const closeMarker = () => {
      openedMarkerID.value = null;
    };
    return {
      mtnMap,
      center,
      zoom,
      markers,
      openMarker,
      openedMarkerID,
      closeMarker,
      Icons,
      CMarker,
      cluster_styles,
      data,
    };
  },
};
</script>