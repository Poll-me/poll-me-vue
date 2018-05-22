import { mixins } from 'vue-class-component';
import { validationMixin } from 'vuelidate';

const fillPollTypeMixinConfig = {
  props: {
    poll: {
      required: true,
      type: Object,
      validator: poll => poll.type === 1
    },
    isLogged: {
      required: true,
      type: Boolean
    },
    user: {
      required: true,
      type: String
    },
    config: Object,
    autofocus: {
      type: Boolean,
      default: false
    }
  }
};

export default mixins(validationMixin, fillPollTypeMixinConfig);
