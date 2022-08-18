
<script setup>
/* eslint-disable no-undef */
import { computed, ref, onMounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

import Data from "../data/data";
import states from "../data/states";

const Banner_1 =
  "https://www.mtn.ng/wp-content/uploads/2021/07/Market-Doctor.jpg";
const Banner_2 = "https://www.mtn.ng/wp-content/uploads/2021/08/Muson-Web.jpg";
const Banner_3 =
  "https://www.mtn.ng/wp-content/uploads/2020/03/theatreDSC_0503.jpg";

import ProjectDetail from "./ProjectDetail.vue";

const Banners = [Banner_1, Banner_2, Banner_3];
// const $ = window.$;
const center_nigeria = ref({ lat: 9.245162, lng: 8.113939 });
const ngcenter = "9.245162, 8.113939";
const center_state = ref({});
const zoom_country = 6;
const zoom_state = 9;
const zoom = ref(zoom_country);
const target = ref("nigeria");
const Center = computed(() => {
  return target.value == "nigeria" ? center_nigeria.value : center_state.value;
});
const center = ref(Center.value);
const mapState = ref("");
const mapLocation = ref("");
const States = computed(() => {
  const allStates = [];
  const allStatesArray = [];
  Data.forEach((d) => {
    if (!allStates.length || !allStates.includes(d.state_uuid)) {
      allStates.push(d.state_uuid);
      allStatesArray.push(states.filter((s) => s.uuid === d.state_uuid)[0]);
    }
  });
  return allStatesArray;
});
const Lgas = computed(() => {
  return [];
  // if (!mapState.value) return [];
  // const selectedState = States.value.filter(
  //   (state) => state.uuid === mapState.value
  // );
  // return selectedState[0].locations;
});
const selectedProject = ref(null);
const ShowDetail = (marker) => {
  selectedProject.value = marker;
};
const data = computed(() => {
  if (!mapState.value) return Data;
  return Data.filter((d) => d.state === mapState.value);
});

const GOOGLE_MAPS_API_KEY = "AIzaSyBydrAVgBUHolVBPl12Ioog75Nd4Y8LAio";
const MAPID = "cfde23afc57d45bd";

const markers = computed(() => {
  const markers = data.value.map((d) => {
    const marker = d.geolocation.split(",");
    return {
      id: d.id,
      position: {
        lat: parseFloat(marker[0]),
        lng: parseFloat(marker[1]),
      },
      title: d.title,
      banner: Banners[Math.floor(Math.random() * Banners.length)],
      category: d.category_uuid,
      description: d.description,
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
const activeMarkers = ref([]);
// const featureLayer = ref(null);
const bounds = ref(null);
const infoWindow = ref(null);
const setMarkers = () => {
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
          var div = document.createElement("div");
          div.innerHTML = infoBox(markers.value[i]);
          div.onclick = function () {
            ShowDetail(markers.value[i]);
          };
          infoWindow.value.setContent(div);
          infoWindow.value.open(map.value, marker);
        };
      })(marker, i)
    );

    // Automatically center the map fitting all markers on the screen
    activeMarkers.value.push(marker);
    map.value.fitBounds(bounds.value);
  }
  new MarkerClusterer({ map: map.value, markers: activeMarkers.value });
  // const markerCluster = new MarkerClusterer({ map: map.value, markers: markers.value });
};
const reloadMarkers = () => {
  // Loop through markers and set map to null for each
  for (var i = 0; i < activeMarkers.value.length; i++) {
    activeMarkers.value[i].setMap(null);
  }

  // Reset the markers array
  activeMarkers.value = [];

  // Call set markers to re-add markers
  setMarkers();
};
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
  setMarkers();
});

const ChangeState = () => {
  const selectedState = States.value.filter(
    (state) => state.uuid === mapState.value
  );
  // console.log("selectedState", selectedState);
  let latlng = [];
  if (!mapState.value) {
    zoom.value = zoom_country;
    latlng = ngcenter.split(",");
    // console.log("nont 1: ", latlng);
  } else {
    map.value.setZoom(zoom_country);
    zoom.value = zoom_state;
    latlng = selectedState[0].latlng.split(",");
    // console.log("nont 2: ", latlng);
  }
  reloadMarkers();
  setMarkers();
  // console.log("markers.value", markers.value);
  // map.value.setMarkers(map.value, markers.value);
  map.value.setZoom(zoom.value);
  map.value.setCenter(
    new google.maps.LatLng(
      latlng[0].replace(/\s/g, ""),
      latlng[1].replace(/\s/g, "")
    )
  );
  mapLocation.value = "";
};

const infoBox = (info) => {
  return `<div class="width250 cursor w3-border w3-hover-border-amber hover-effect height350 relative" style="background-image: url(${info.banner}); background-size: cover; background-position: center;">
    <div class="w3-yellow w3-text-black d-inline-block size12 w3-border w3-border-black px-2 py-i mb-2 bold w3-round-large absolute " style="top: 10px; left: 10px">
      ${info.category}</div>
    <div class="bold w3-yellow d-inline-block p-2 absolute" style="bottom: 0px; left: 0px; right: 0px">
      <div class="w3-text-black size24 mb-2">${info.title}</div>
      <div> 
      <button data-id="${info.id}" class="w3-btn readmore w3-theme w3-round-xxlarge w3-border w3-border-white" >
          Read more 
          </button> 
          </div>
          </div>
          </div>`;
};
</script>

<template>
  <div class="w3-content max-width780 pt-3 pb-2 mb-3 w3-white relative">
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
    <div class="w3-cell-row no-gutters">
      <div class="w3-cell w3-mobile p-2 width50p">
        <select
          v-model="mapState"
          @change="ChangeState"
          class="
            rounded
            p-2
            border border-warning
            bg-warning
            text-black
            cursor
            w3-border w3-border-black
          "
          style="width: 100% !important"
        >
          <option value="">All states</option>
          <option v-for="state in States" :key="state.uuid" :value="state.uuid">
            {{ state.name }}
          </option>
        </select>
      </div>
      <div class="w3-cell w3-mobile p-2 width50p">
        <select
          v-model="mapLocation"
          class="
            rounded
            p-2
            border border-warning
            bg-warning
            text-black
            cursor
            w3-border w3-border-black
          "
          style="width: 100% !important"
        >
          <option value="">All locations</option>
          <option v-for="lga in Lgas" :key="lga.uuid" :value="lga.uuid">
            {{ lga.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
  <div
    class="relative"
    style="
      width: 100%;
      height: 95vh;
      /* max-height: 95vh; */
      z-index: -1;
      overflow: hidden;
    "
  >
    <ProjectDetail
      v-if="selectedProject"
      :info="selectedProject"
      style="z-index: 21"
      class="w3-animate-right"
      @close="selectedProject = null"
    />
    <div ref="mtnMap" style="width: 100%; height: 100%; overflow: visible" />
  </div>
</template>