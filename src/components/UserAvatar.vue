<template>
  <div :class="`w-${sizeData.size} h-${sizeData.size} border-${sizeData.border}`"
    class="inline-block rounded-full border-primary overflow-hidden">
    <img v-if="profile.photoUrl" :src="profile.photoUrl"
      class="min-w-full min-h-full" >
    <div v-else :class="`text-${sizeData.font}`" :style="{ 'background-color': bgColor }"
      class="h-full flex items-center justify-center text-white font-medium font-title">
      {{ avatarLetter }}
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
  get avatarLetter() {
    return (typeof this.profile.displayName === 'string' && this.profile.displayName.length > 0) ?
      this.profile.displayName[0].toUpperCase() :
      '';
  }

  get sizeData() {
    return avatarSizesMap[this.size];
  }

  get bgColor() {
    let color = '#';
    if (this.avatarLetter.length > 0) {
      const letterCode = this.avatarLetter.charCodeAt(0);
      const variance = ((letterCode % 8) + 1) * 15;
      for (let i = 0; i < 3; i += 1) {
        const letterFlag = ((letterCode + i) % 2 || ((letterCode + i) % 3) === 0);
        color += (letterFlag ? Math.min(128 + variance, 200) : 128 - variance).toString(16);
      }
    }
    return color;
  }
}
</script>
