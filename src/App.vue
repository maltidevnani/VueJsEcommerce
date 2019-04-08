<template>
  <v-app>
    <v-toolbar :fixed="true" dark color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="toolbarTitleClass">One Stop Shopping Center</v-toolbar-title>
      <v-spacer></v-spacer>
      <ShoppingCart/>
      <v-toolbar-items v-if="getLoginStatus" class="hidden-sm-and-down">
        <v-avatar @click="goToProfile()" color="indigo" class="avatarCustomClass">
          <v-icon dark>account_circle</v-icon>
        </v-avatar>
      </v-toolbar-items>
      <v-toolbar-items v-if="!getLoginStatus" class="hidden-sm-and-down">
        <v-btn flat to="/login" class="white--text">LogIn</v-btn>
        <v-btn flat to="/profile" class="white--text">SignUp</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" :mini-variant="mini" absolute dark temporary>
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar tag="div" v-if="getLoginStatus">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{getUser && getUser.name}}</v-list-tile-title>
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

        <v-list-tile>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="getLoginStatus"  @click="logout">
          <v-list-tile-action>
            <v-icon>question_answer</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-app>
</template>
<script>
import Product from "@/components/Products";
import ShoppingCart from "@/components/ShoppingCart";
import {mapGetters, mapActions} from 'vuex';

export default {
  name: "App",
  data() {
    return {
      drawer: null,
      mini: false,
      right: null
    };
  },
  computed: {
    ...mapGetters(['getLoginStatus', 'getUser']),
      form () {
        return {
          email: this.email,
          password: this.password
        }
      },
      userName () {
        console.log("user name in app",this.$store.state.userInfo.name);
        return this.$store.state.userInfo.name;
      },
    },
    methods: {
      ...mapActions(['setLoggedin', 'fetchCartItems']),
      logout() {
        var a = {};
        localStorage.setItem('user', JSON.stringify(a));
        localStorage.setItem('isLoggedin', "false");
        this.setLoggedin(false);
        this.$store.commit("signUp", {});
        this.$router.push({ name: "Products" });
        this.drawer = false;
        this.fetchCartItems();
      },
      goToProfile() {
        this.$router.push({ name: "Profile" , params: { isEditProfile: true }});
      }
    },
    created() {
      this.setLoggedin(localStorage.getItem('isLoggedin'));
      this.$store.commit("signUp", JSON.parse(localStorage.getItem('user')));
    },
  components: {
    Product,
    ShoppingCart
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.toolbarTitleClass {
  font-family: cursive;
  color: white;
  font-weight: bolder;
}
.avatarCustomClass{
  margin-top: 10px;
  margin-left: 20px;
}
</style>
