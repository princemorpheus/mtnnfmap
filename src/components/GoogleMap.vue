
<script setup>
/* eslint-disable no-undef */
import { computed, ref, onMounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import Data from "../data/data";
import Thumb from "../assets/thumb.png";

const GOOGLE_MAPS_API_KEY = "AIzaSyBydrAVgBUHolVBPl12Ioog75Nd4Y8LAio";
const MAPID = "cfde23afc57d45bd";

const data = Data;
const center_nigeria = ref({ lat: 9.245162, lng: 8.113939 });
const center_kogi = ref({ lat: 7.65699, lng: 6.733794 });
const zoom = ref(6);
const target = ref("nigeria");

const Center = computed(() => {
  return target.value == "nigeria" ? center_nigeria.value : center_kogi.value;
});
const center = ref(Center.value);
const markers = computed(() => {
  const markers = data.map((d) => {
    const marker = d.geolocation.split(",");
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

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  region: "NG",
  libraries: ["drawing"],
});
const mtnMap = ref(null);
const map = ref(null);
const featureLayer = ref(null);
const bounds = ref(null);
const infoWindow = ref(null);
onMounted(async () => {
  await loader.load();

  var mapOptions = {
    fullscreenControl: true,
    scrollwheel: false,
    center: center.value,
    zoom: zoom.value,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    mapId: MAPID,
  };
  map.value = new google.maps.Map(mtnMap.value, mapOptions);
  bounds.value = new google.maps.LatLngBounds();
  infoWindow.value = new google.maps.InfoWindow();
  for (let i = 0; i < markers.value.length; i++) {
    var position = new google.maps.LatLng(
      markers.value[i].position.lat,
      markers.value[i].position.lng
    );
    bounds.value.extend(position);
    const marker = new google.maps.Marker({
      position: position,
      map: map.value,
      //icon: markers.value[i][3],
      title: markers.value[i].title,
    });

    // Allow each marker to have an info window
    google.maps.event.addListener(
      marker,
      "click",
      (function (marker) {
        return function () {
          infoWindow.value.setContent(infoBox(markers.value[i], Thumb));
          infoWindow.value.open(map.value, marker);
        };
      })(marker, i)
    );

    // Automatically center the map fitting all markers on the screen
    map.value.fitBounds(bounds.value);
  }
  //@ts-ignore
  featureLayer.value = map.value.getFeatureLayer("LOCALITY");

  // Define a style with purple fill and border.
  //@ts-ignore
  // const featureStyleOptions = {
  //   strokeColor: "#810FCB",
  //   strokeOpacity: 1.0,
  //   strokeWeight: 3.0,
  //   fillColor: "#810FCB",
  //   fillOpacity: 0.5,
  // };

  // Apply the style to a single boundary.
  //@ts-ignore
  // featureLayer.value.style = (options) => {
  //   if (options.feature.placeId == "ChIJDY2kfa8LThARyAvFaEH-qJk") {
  //     // Hana, HI
  //     return featureStyleOptions;
  //   }
  // };
});

const infoBox = (info, Thumb) => `<div
    class="width250 height350 relative"
    style="background-image: url(${Thumb}); background-size: cover; background-position: center;"
  >
    <div
      class="
        w3-yellow w3-text-black
        d-inline-block
        size12
        w3-border w3-border-black
        px-2
        py-i
        mb-2
        bold
        w3-round-large
        absolute
      "
      style="top: 10px; left: 10px"
    >
      ${info.category}
    </div>
    <div
      class="bold w3-yellow d-inline-block p-2 absolute"
      style="bottom: 0px; left: 0px; right: 0px"
    >
      <div class="w3-text-black size24 mb-2">${info.title}</div>
      <div>
        <button
          class="w3-btn w3-theme w3-round-xxlarge w3-border w3-border-white"
        >
          Read more
        </button>
      </div>
    </div>
  </div>`;
</script>

<template>
  <div ref="mtnMap" style="width: 100%; height: 90vh" />
</template>