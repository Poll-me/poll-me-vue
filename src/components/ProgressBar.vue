<template>
  <div class="rounded-lg overflow-hidden"
    :class="bordered ? `border-2 border-${color}` : ''">
    <div class="text-white h-8 flex items-center"
      :class="`bg-${color}${!bordered ? ' rounded-lg' : ''}`"
      :style="{ width: `${roundedValue}%` }" >
      <div class="text-center truncate px-2 flex-1">{{ visibleValue }}</div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    value: {
      type: Number,
      required: true,
      validator(val) { return val >= 0 && val <= 100; }
    },
    color: {
      type: String,
      default: 'primary'
    },
    bordered: {
      type: Boolean,
      default: true
    }
  }
})
export default class ProgressBar extends Vue {
  maxVisibleValue = 20;

  get roundedValue() {
    const limitedValue = Math.min(Math.max(this.value, 0), 100);
    return Math.round(limitedValue);
  }

  get visibleValue() {
    return this.roundedValue >= this.maxVisibleValue ? `${this.roundedValue} %` : '';
  }
}
</script>
