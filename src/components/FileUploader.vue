<template>
  <div>
    <button :class="{ 'opacity-75': loading }" @click="$refs.fileInput.click()"
      class="btn btn-tertiary" :disabled="loading" >
      <template v-if="!loading">
        <font-awesome-icon icon="upload" class="mr-1" ></font-awesome-icon>
        <span>Upload</span>
      </template>
      <font-awesome-icon v-else icon="spinner" spin ></font-awesome-icon>
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
    maxFiles: {
      type: Number,
      default: 1
    },
    fileTypes: {
      type: String,
      default: '*'
    },
    maxFileSize: {
      type: Number,
      default: 204800 // 200KB
    }
  }
})
export default class FileUploader extends Vue {
  loading = false;

  filesChange() {
    if (this.$refs.fileInput.files.length > 0) {
      const files = Array.from(this.$refs.fileInput.files);
      if (!this.areValidFiles(files)) {
        this.$emit('not-valid-files', files);
      }
    }
  }

  areValidFiles(files) {
    return !files.some(file => file.size > this.maxFileSize);
  }
}
</script>
