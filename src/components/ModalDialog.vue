<template>
  <transition name="modal-dialog" :duration="{ enter: 300, leave: 150 }">
    <div v-if="open" role="alertdialog"
      class="modal-dialog fixed pin z-50 flex items-center justify-center">
      <div class="modal-dialog-backdrop w-full h-full absolute bg-black opacity-75"
        @click="close"></div>
      <div class="modal-dialog-container container z-10">
        <div class="rounded overflow-hidden">
          <div class="bg-secondary text-white font-bold py-4 text-center">
            <slot name="header">
              <span v-t="'modal-dialog.title'"></span>
            </slot>
          </div>
          <div class="bg-white p-4">
            <div class="bg-red-lightest ">
              <slot></slot>
            </div>
            <div class="flex mt-4">
              <button class="flex-1 btn" v-t="'modal-dialog.cancel'" @click="close"></button>
              <button class="flex-1 btn btn-primary ml-4" v-t="'modal-dialog.accept'"
                @click="accept"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
})
export default class ModalDialog extends Vue {
  close() {
    this.$emit('update:open', false);
  }

  accept() {
    this.$emit('confirm');
    this.close();
  }
}
</script>
