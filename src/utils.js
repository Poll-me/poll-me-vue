import { mixins } from 'vue-class-component';
import { validationMixin } from 'vuelidate';

export const VueWithValidations = mixins(validationMixin);

export default VueWithValidations;
