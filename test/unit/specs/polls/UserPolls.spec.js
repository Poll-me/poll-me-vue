import storeModule from '@/polls/store';
import Vue from 'vue';

import UserPolls from '@/polls/UserPolls';
import store from '@/store';

const entitiesMock = { a: {}, b: {} };
const actions = {
  fetchPolls: jest
    .fn()
    .mockImplementation(({ commit }) => commit('setEntities', entitiesMock))
};

describe('UserPolls.vue', () => {
  let component;

  beforeAll(() => {
    store.registerModule('polls', {
      ...storeModule,
      actions
    });
  });

  beforeEach(() => {
    const Constructor = Vue.extend(UserPolls);
    component = new Constructor({ store }).$mount();
  });

  it('should dispath the fetch polls action', () => {
    expect(actions.fetchPolls.mock.calls.length).toEqual(1);
  });

  it('should have the polls as array at items property', () => {
    expect(component.items.length).toEqual(Object.keys(entitiesMock).length);
  });
});
