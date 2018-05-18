import fontawesome from '@fortawesome/fontawesome';
import { faWhatsapp } from '@fortawesome/fontawesome-free-brands';
import solid from '@fortawesome/fontawesome-free-solid';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import Vue from 'vue';

fontawesome.library.add(solid, faWhatsapp);

Vue.component('font-awesome-icon', FontAwesomeIcon);
