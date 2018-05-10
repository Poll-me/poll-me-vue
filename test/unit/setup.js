import Vue from 'vue';
import fb from '@/setup/firebase';

Vue.config.productionTip = false;

fb.auth = jest.fn();
fb.database = jest.fn();
