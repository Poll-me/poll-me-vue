<template>
  <div class="flex items-center">
    <font-awesome-icon icon="language" size="2x" fixed-width></font-awesome-icon>
    <select
      id="language-selector" v-model="langCode"
      class="flex-1 shadow-none ml-2 text-xs">
      <option v-for="lang in languages" :key="lang.code" :value="lang.code">
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
export default class LangSelector extends Vue {
  languages = [
    {
      code: 'en',
      name: 'English'
    },
    {
      code: 'es',
      name: 'Español'
    }
  ];
  langCode = 'en';
}
</script>

