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
  computed: {
    isAuthor() {
      return this.user === this.poll.user;
    },
    hasVoted() {
      return this.poll.answers.some(ans => ans.user === this.user);
    }
  },
  methods: {
    vote(payload) {
      this.$emit('vote', payload);
    },
    removeVote(user = this.user) {
      this.$emit('remove-vote', user);
    }
  }
};

export default mixins(validationMixin, fillPollTypeMixinConfig);
