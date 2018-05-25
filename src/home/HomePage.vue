<template>
  <div>
    <div class="container py-8">
      <i18n path="home.title" tag="h1"
        class="font-title  text-center text-3xl font-medium">
        <span place="name" class="text-primary">PollMe</span>
      </i18n>
    </div>
    <HomeBlock color="primary-lightest" icon="user-friends">
      <i18n path="home.friends"></i18n>
    </HomeBlock>
    <HomeBlock color="tertiary-lightest" icon="list-alt" icon-position="left">
      <i18n path="home.polls.create-message" tag="p">
        <router-link place="new-poll" v-t="'home.polls.new-poll'"
          :to="{ name: 'new-poll' }" class="text-primary"></router-link>
      </i18n>
      <i18n path="home.polls.types-message" tag="p">
        <b place="types" v-t="'home.polls.poll-types'" ></b>
        <i place="registration" v-t="'polls.types.1.name'"></i>
      </i18n>
    </HomeBlock>
    <HomeBlock color="secondary-lightest" icon="edit">
      <i18n path="home.edit"></i18n>
    </HomeBlock>
    <HomeBlock color="primary-lightest" icon="user-secret" icon-position="left" >
      <i18n path="home.no-login.message">
        <b place="everyone" v-t="'home.no-login.for-everyone'" ></b>
        <b place="related" v-t="'home.no-login.device-related'"></b>
      </i18n>
    </HomeBlock>
    <HomeBlock color="tertiary-lightest" icon="user-check" >
      <i18n path="home.login.message">
        <router-link place="create" v-t="'home.login.create-link'"
          :to="{ name: 'register' }" class="text-primary"></router-link>
        <b place="device" v-t="'home.login.from-device'"></b>
        <router-link place="login" v-t="'home.login.login-link'"
          :to="{ name: 'login' }" class="text-primary"></router-link>
      </i18n>
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
