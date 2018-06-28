import { pollTypes } from '../../store/state/types';
import NewBasicPollForm from './NewBasicPollForm';
import NewSelectionPollForm from './NewSelectionPollForm';

export default function (type) {
  let component;

  switch (type) {
    case pollTypes.SELECTION:
      component = NewSelectionPollForm;
      break;

    default:
      component = NewBasicPollForm;
  }

  return component;
}
