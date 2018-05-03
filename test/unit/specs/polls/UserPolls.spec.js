import Vue from 'vue';
import Router from 'vue-router';

import storeModule from '@/polls/store';
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
  let router;

  beforeAll(() => {
    Vue.use(Router);
    router = new Router({ routes: [{ name: 'fill-poll', path: ':key' }] });

    store.registerModule('polls', {
      ...storeModule,
      actions
    });
  });

  beforeEach(() => {
    const Constructor = Vue.extend(UserPolls);
    component = new Constructor({ router, store }).$mount();
  });

  it('should dispath the fetch polls action', () => {
    expect(actions.fetchPolls.mock.calls.length).toEqual(1);
  });

  it('should have the polls as array at items property', () => {
    expect(component.items.length).toEqual(Object.keys(entitiesMock).length);
  });
});
