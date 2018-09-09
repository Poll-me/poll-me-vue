export const pollTypes = {
  REGISTRATION: 1,
  YESNO: 2,
  SELECTION: 3
};

export default {
  [pollTypes.REGISTRATION]: {
    name: 'Registration',
    description: 'Take a quick look at who is going to participate in the topic you describe.'
  },
  [pollTypes.YESNO]: {},
  [pollTypes.SELECTION]: {}
};
