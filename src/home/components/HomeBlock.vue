<template>
  <div :class="`bg-${color}`">
    <div :class="{ 'flex-row-reverse': iconPosition === 'left' }"
      class="container flex items-center py-6">
      <div class="flex-1">
        <slot/>
      </div>
      <slot name="icon">
        <font-awesome-icon :class="iconPosition === 'left' ? 'mr-4' : 'ml-4'"
          class="text-grey-darkest" :icon="icon" size="4x" fixed-width ></font-awesome-icon>
      </slot>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    color: {
      type: String,
      default: 'white'
    },
    icon: {
      type: String
    },
    iconPosition: {
      type: String,
      default: 'right',
      validator(val) { return ['left', 'right'].indexOf(val) >= 0; }
    }
  }
})
export default class HomeBlock extends Vue {}
</script>
