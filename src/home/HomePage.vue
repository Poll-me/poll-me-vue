<template>
  <div>
    <div class="container py-8">
      <h1 class="font-title  text-center text-3xl font-medium">
        Wellcome to
        <span class="text-primary">PollMe</span>
      </h1>
    </div>
    <HomeBlock color="primary-lightest" icon="users">
      The best place to know your friends oppinion about everything you need.
    </HomeBlock>
    <HomeBlock color="tertiary-lightest" icon="list-alt" icon-position="left">
      <p>
        You only need to create a
        <router-link :to="{ name: 'new-poll' }" class="text-tertiary">new poll</router-link>
        and share it with your friends.
      </p>
      <p>
        There are many <b>poll types</b>, from the simple <i>registration</i> to the
        more complex <i>date range</i>.
      </p>
    </HomeBlock>
    <HomeBlock color="secondary-lightest" icon="edit">
      Everybody now can participate and give their opinion.
    </HomeBlock>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import HomeBlock from './components/HomeBlock';

@Component({
  components: { HomeBlock }
})
export default class HomePage extends Vue {}
</script>
