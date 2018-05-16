<template>
  <div>
    <div class="container py-8">
      <h1 class="font-title  text-center text-3xl font-medium">
        Wellcome to
        <span class="text-primary">PollMe</span>
      </h1>
    </div>
    <div class="bg-primary-lightest">
      <div class="container flex items-center py-6">
        <div class=" flex-1">
          The best place to know your friends oppinion about everything you need.
        </div>
        <font-awesome-icon class="ml-4 text-grey-darkest" icon="users" size="4x" fixed-width ></font-awesome-icon>
      </div>
    </div>
    <div class="bg-tertiary-lightest">
      <div class="container flex items-center py-6">
        <font-awesome-icon class="mr-4 text-grey-darkest" icon="list-alt" size="4x" fixed-width ></font-awesome-icon>
        <div class=" flex-1">
          <p>
            You only need to create a
            <router-link :to="{ name: 'new-poll' }" class="text-tertiary">new poll</router-link>
            and share it with your friends.
          </p>
          <p>
            There are many <b>poll types</b>, from the simple <i>registration</i> to the
            more complex <i>date range</i>.
          </p>
        </div>
      </div>
    </div>
    <div class="bg-secondary-lightest">
      <div class="container flex items-center py-6">
        <div class=" flex-1">
          <p>
            Everybody now can participate and give their opinion.
          </p>
        </div>
        <font-awesome-icon class="ml-4 text-grey-darkest" icon="edit" size="4x" fixed-width ></font-awesome-icon>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
export default class HomePage extends Vue {}
</script>
