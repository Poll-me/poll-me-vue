import { mixins } from 'vue-class-component';
import { validationMixin } from 'vuelidate';
import { required, requiredIf, requiredUnless } from 'vuelidate/lib/validators';

import NewPollFormBase from './components/NewPollFormBase';

export function getBaseValidations() {
  return {
    name: {
      required
    },
    author: {
      required: requiredUnless('isLogged')
    },
    description: {
      required: requiredIf('hasDescription')
    }
  };
}

const newPollFormMixinConfig = {
  components: { NewPollFormBase },
  props: {
    isLogged: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      name: '',
      author: '',
      description: '',
      hasDescription: false
    };
  },
  methods: {
    getFormBaseData() {
      const { name, author, description, hasDescription } = this;
      return {
        name,
        author,
        description: hasDescription ? description : ''
      };
    },
    getFormData() {
      return {};
    },
    getSubmitData() {
      return {
        ...this.getFormBaseData(),
        ...this.getFormData()
      };
    },
    submit() {
      if (!this.$v.$invalid) {
        this.$emit('submit', this.getSubmitData());
      }
    }
  },
  validations: getBaseValidations()
};

export default mixins(validationMixin, newPollFormMixinConfig);
