import { shallowMount, createLocalVue } from '@vue/test-utils';

import '@/setup/font-awesome';
import storeModule from '@/polls/store';
import UserPolls from '@/polls/UserPolls';
import I18n from '@/setup/i18n';
import store from '@/store';

const actions = {
  fetchPolls: jest.fn(),
  fetchVotes: jest.fn()
};

describe('UserPolls.vue', () => {
  let localVue;

  beforeAll(() => {
    localVue = createLocalVue();

    store.registerModule('polls', {
      ...storeModule,
      actions
    });
  });

  beforeEach(() => {
    shallowMount(UserPolls, {
      localVue,
      store,
      i18n: I18n,
      stubs: ['router-link', 'router-view']
    });
  });

  it('should dispath the fetch polls action', () => {
    expect(actions.fetchPolls.mock.calls.length).toEqual(1);
  });

  it('should dispath the fetch votes action', () => {
    expect(actions.fetchVotes.mock.calls.length).toEqual(1);
  });
});
