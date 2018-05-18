<template>
  <div :class="`w-${sizeData.size} h-${sizeData.size} border-${sizeData.border}`"
    class="inline-block rounded-full border-primary overflow-hidden">
    <img v-if="profile.photoUrl" :src="profile.photoUrl"
      class="min-w-full min-h-full" >
    <div v-else :class="`text-${sizeData.font}`"
      class="h-full flex items-center justify-center text-white bg-teal font-medium font-title">
      {{ profile.displayName.slice(0, 1) }}
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

const avatarSizesMap = {
  sm: { size: '8', font: 'base', border: '2' },
  md: { size: '12', font: '2xl', border: '4' },
  lg: { size: '24', font: '5xl', border: '4' }
};

@Component({
  props: {
    profile: {
      required: true,
      type: Object,
      validator(val) {
        return (typeof val.displayName === 'string' && val.displayName.length > 0) ||
          (typeof val.photoUrl === 'string' && val.photoUrl.length > 0);
      }
    },
    size: {
      type: String,
      default: 'sm',
      validator(val) { return typeof avatarSizesMap[val] === 'object'; }
    }
  }
})
export default class UserAvatar extends Vue {
  get sizeData() {
    return avatarSizesMap[this.size];
  }
}
</script>
