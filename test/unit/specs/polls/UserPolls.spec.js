import Vue from 'vue';
import Router from 'vue-router';

import '@/setup/font-awesome';
import storeModule from '@/polls/store';
import UserPolls from '@/polls/UserPolls';
import I18n from '@/setup/i18n';
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
    router = new Router({
      routes: [
        { name: 'fill-poll', path: ':key' },
        { name: 'new-poll', path: 'new' }
      ]
    });

    store.registerModule('polls', {
      ...storeModule,
      actions
    });
  });

  beforeEach(() => {
    const Constructor = Vue.extend(UserPolls);
    component = new Constructor({ router, store, i18n: I18n }).$mount();
  });

  it('should dispath the fetch polls action', () => {
    expect(actions.fetchPolls.mock.calls.length).toEqual(1);
  });

  it('should have the polls as array at items property', () => {
    expect(component.items.length).toEqual(Object.keys(entitiesMock).length);
  });
});
