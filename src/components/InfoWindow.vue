<template>
  <div
    class="width250 height350 relative"
    :style="{
      'background-image': 'url(' + Thumb + ')',
      'background-size': 'cover',
      'background-position': 'center',
    }"
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
      {{ info.category }}
    </div>
    <div
      class="bold w3-yellow d-inline-block p-2 absolute"
      style="bottom: 0px; left: 0px; right: 0px"
    >
      <div class="w3-text-black size24 mb-2">{{ info.title }}</div>
      <div>
        <button
          class="w3-btn w3-theme w3-round-xxlarge w3-border w3-border-white"
        >
          Read more
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Thumb from "../assets/thumb.png";
export default {
  name: "MTNMapInfoWindow",
  props: ["info"],
  setup() {
    return {
      Thumb,
    };
  },
};
</script>