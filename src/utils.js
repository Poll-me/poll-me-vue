import Vue from 'vue';
import { mixins } from 'vue-class-component';
import { validationMixin } from 'vuelidate';

const strategies = Vue.config.optionMergeStrategies;
strategies.validations = strategies.methods;

export const VueWithValidations = mixins(validationMixin);

export default VueWithValidations;
