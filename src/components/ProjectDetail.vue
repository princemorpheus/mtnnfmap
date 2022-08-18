<script>
export default {
  name: "ProjectInfo",
  props: ["info"],
  emits: ["close"],
  //   setup(props) {
  //   },
};
</script>
<template>
  <div
    class="absolute white-90 p-sm-2 p-5"
    style="height: 100%; max-width: 100%; width: 740px; right: 0px"
  >
    <div
      class="p-sm-3 p-4 w3-white relative"
      style="max-height: 100%; width: 100%; overflow: auto"
    >
      <span
        @click="$emit('close')"
        class="cursor w3-button w3-hover-text-red size48 w3-boder absolute"
        style="right: 10px"
        ><font-awesome-icon icon="fa-solid fa-xmark"
      /></span>
      <div
        class="mtn-manner--bg w3-grey background-image background-cover"
        :style="{
          'background-image': 'url(' + info.banner + '?' + info.id + ')',
        }"
        style="width: 100%; height: 250px'"
      ></div>
      <div class="p-4">
        <h3 class="mt-5 mb-4">{{ info.title }}</h3>
        <div v-html="info.description" style="line-height: 24px"></div>
        <div v-html="info.description"></div>
        <div v-html="info.description"></div>
        <div v-html="info.description"></div>
        <div v-html="info.description"></div>
      </div>
    </div>
  </div>
</template>