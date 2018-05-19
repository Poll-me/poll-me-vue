<template>
  <div>
    <button :class="{ 'opacity-75': loading }" @click="$refs.fileInput.click()"
      class="btn btn-tertiary" :disabled="loading" >
      <font-awesome-icon :icon="loading ? 'spinner' : 'upload'" :spin="loading" >
      </font-awesome-icon>
      <span v-show="!loading && text" class="ml-1">{{ text }}</span>
    </button>
    <input ref="fileInput" type="file" class="hidden"
      :accept="fileTypes" :multiple="maxFiles > 1"
      @change="filesChange" >
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    text: {
      type: String
    },
    maxFiles: {
      type: Number,
      default: 1
    },
    fileTypes: {
      type: String,
      default: '*'
    },
    maxSize: {
      type: Number,
      default: 1024 * 1024 * 5 // 5MB
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
})
export default class FileUploader extends Vue {
  filesChange() {
    if (this.$refs.fileInput.files.length > 0) {
      const files = Array.from(this.$refs.fileInput.files);
      if (this.areValidFiles(files)) {
        this.$emit('files-ready', files);
      } else {
        this.$emit('not-valid-error', files);
      }
    }
  }

  areValidFiles(files) {
    return !files.some(file => file.size > this.maxSize);
  }
}
</script>
