import Vue from 'vue';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

// Brands icons
import faWhatsapp from '@fortawesome/fontawesome-free-brands/faWhatsapp';

// Regular icons
import faFrown from '@fortawesome/fontawesome-free-regular/faFrown';

// Solid icons
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import faUpload from '@fortawesome/fontawesome-free-solid/faUpload';
import faLanguage from '@fortawesome/fontawesome-free-solid/faLanguage';
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faSyncAlt from '@fortawesome/fontawesome-free-solid/faSyncAlt';
import faRedoAlt from '@fortawesome/fontawesome-free-solid/faRedoAlt';
import faUserFriends from '@fortawesome/fontawesome-free-solid/faUserFriends';
import faUserCheck from '@fortawesome/fontawesome-free-solid/faUserCheck';
import faUserSecret from '@fortawesome/fontawesome-free-solid/faUserSecret';
import faListAlt from '@fortawesome/fontawesome-free-solid/faListAlt';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';
import faHome from '@fortawesome/fontawesome-free-solid/faHome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faUndo from '@fortawesome/fontawesome-free-solid/faUndo';
import faArrowUp from '@fortawesome/fontawesome-free-solid/faArrowUp';
import faSignInAlt from '@fortawesome/fontawesome-free-solid/faSignInAlt';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import faEye from '@fortawesome/fontawesome-free-solid/faEye';
import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown';
import faUserPlus from '@fortawesome/fontawesome-free-solid/faUserPlus';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import faChevronUp from '@fortawesome/fontawesome-free-solid/faChevronUp';
import faChevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown';
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp';
import faThumbsDown from '@fortawesome/fontawesome-free-solid/faThumbsDown';

fontawesome.library.add(
  faSpinner,
  faChevronUp,
  faChevronDown,
  faUpload,
  faLanguage,
  faHeart,
  faTimes,
  faBars,
  faSyncAlt,
  faRedoAlt,
  faUserFriends,
  faUserCheck,
  faUserSecret,
  faListAlt,
  faEdit,
  faHome,
  faPlus,
  faUndo,
  faArrowUp,
  faSignInAlt,
  faSignOutAlt,
  faEye,
  faArrowDown,
  faUserPlus,
  faTrashAlt,
  faWhatsapp,
  faFrown,
  faThumbsUp,
  faThumbsDown
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
