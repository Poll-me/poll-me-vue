import fontawesome from '@fortawesome/fontawesome';
import { faWhatsapp } from '@fortawesome/fontawesome-free-brands';
import { faFrown } from '@fortawesome/fontawesome-free-regular';
import solid from '@fortawesome/fontawesome-free-solid';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import Vue from 'vue';

fontawesome.library.add(solid, faWhatsapp, faFrown);

Vue.component('font-awesome-icon', FontAwesomeIcon);
