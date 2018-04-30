import Vue from 'vue';
import store from '@/store';
import storeModule from '@/polls/store';
import UserPolls from '@/polls/UserPolls';

describe('UserPolls.vue', () => {
  let component;

  beforeAll(() => {
    store.registerModule('polls', storeModule);
  });

  beforeEach(() => {
    const Constructor = Vue.extend(UserPolls);
    component = new Constructor({ store }).$mount();
  });

  it('should have the same number of items as the store node', () => {
    const pollsLength = Object.keys(storeModule.state.entities).length;
    expect(component.items.length).toEqual(pollsLength);
  });
});
