import { pollTypes } from '@/polls/store/state/types';
import RegistrationPoll from './RegistrationPoll';
import YesNoPoll from './YesNoPoll';
import SelectionPoll from './SelectionPoll';

export default {
  [pollTypes.REGISTRATION]: RegistrationPoll,
  [pollTypes.YESNO]: YesNoPoll,
  [pollTypes.SELECTION]: SelectionPoll
};
