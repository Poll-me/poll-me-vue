import create from './create';
import polls from './polls';
import votes from './votes';

export default { ...polls, ...votes, ...create };
