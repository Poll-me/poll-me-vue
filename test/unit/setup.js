import Vue from 'vue';
import fb from '@/setup/firebase';

Vue.config.productionTip = false;

fb.database = jest.fn();
