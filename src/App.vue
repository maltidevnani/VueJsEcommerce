<template>
<v-app>
<v-toolbar fixed="true">
  <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="toolbarTitleClass">One Stop Shopping Center</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>LogIn</v-btn>
      <v-btn flat>SignUp</v-btn>
      </v-toolbar-items>
      </v-toolbar>
  <router-view></router-view>
</v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  }
.toolbarTitleClass{
  font-family: cursive;
  color: crimson;
  font-weight: bolder;
}
</style>
