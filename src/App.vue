<template>
<v-app>
<v-toolbar fixed="true" dark color="primary">
  <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="toolbarTitleClass">One Stop Shopping Center</v-toolbar-title>
    <v-spacer></v-spacer>
    <ShoppingCart/>
    <v-toolbar-items class="hidden-sm-and-down">     
      <v-btn flat to="/login" class="white--text">LogIn</v-btn>
      <v-btn flat to="/profile" class="white--text">SignUp</v-btn>
      </v-toolbar-items>
      </v-toolbar>
      <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      absolute
      dark
      temporary>
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click=""
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>


  <router-view></router-view>
</v-app>
</template>

<script>
import Product from '@/components/Products';
import ShoppingCart from '@/components/ShoppingCart';
export default {  
  name: 'App',
   data() {
    return {
      drawer: null,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        mini: false,
        right: null
    };
  },  
  components: {
    Product,
    ShoppingCart,
  }
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
  color: white;
  font-weight: bolder;
}

</style>
