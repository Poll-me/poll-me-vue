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
    loading: {
      type: Boolean,
      default: false
    },
    config: Object
  },
  methods: {
    vote(payload) {
      this.$emit('vote', payload);
    },
    removeVote() {
      this.$emit('remove-vote');
    }
  }
};

export default mixins(validationMixin, fillPollTypeMixinConfig);
