<template>
  <div class="flex items-center">
    <font-awesome-icon icon="language" size="2x" fixed-width></font-awesome-icon>
    <select
      id="language-selector" :value="lang" @change.prevent="languageSelected($event)"
      class="flex-1 shadow-none ml-2 text-xs">
      <option v-for="lang in languages" :key="lang.code" :value="lang.code">
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import Component from 'vue-class-component';

@Component({
  computed: mapState(['lang']),
  methods: mapActions(['changeLanguage'])
})
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

  languageSelected(event) {
    const selectedLang = event.target.value;
    this.changeLanguage({ lang: selectedLang });
  }
}
</script>

