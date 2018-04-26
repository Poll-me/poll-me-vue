import Vue from 'vue';
import store from '@/store';
import HelloWorld from '@/components/HelloWorld';

describe('HelloWorld.vue', () => {
  let component;

  beforeEach(() => {
    const Constructor = Vue.extend(HelloWorld);
    component = new Constructor({ store }).$mount();
  });

  it('should render correct contents', () => {
    expect(component.$el.textContent).toEqual('Hello world!!');
  });
});
