import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import Vue from 'vue';

fontawesome.library.add(solid);

Vue.component('font-awesome-icon', FontAwesomeIcon);
