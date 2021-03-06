<template>
  <div :class="`w-${sizeData.size} h-${sizeData.size} border-${sizeData.border}`"
    :style="photoBackground"
    class="inline-block rounded-full border-primary overflow-hidden bg-cover bg-center">
    <div v-if="!profile.photoUrl" :class="`text-${sizeData.font}`"
      :style="{ 'background-color': bgColor }"
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
      type: Object
    },
    size: {
      type: String,
      default: 'sm',
      validator(val) { return typeof avatarSizesMap[val] === 'object'; }
    }
  }
})
export default class UserAvatar extends Vue {
  get photoBackground() {
    return this.profile.photoUrl ? `background-image: url('${this.profile.photoUrl}')` : '';
  }

  get avatarLetter() {
    return (typeof this.profile.displayName === 'string' && this.profile.displayName.length > 0) ?
      this.profile.displayName[0].toUpperCase() :
      'A';
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
