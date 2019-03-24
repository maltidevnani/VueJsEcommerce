<template>
<v-app>
  <v-container >
    <v-layout wrap justify-center align-center>
      <v-flex md6 row >
        <h1 class="login_title">Login</h1>
           <v-text-field
            v-model="email"
            ref="email"
            :rules="[rules.required, rules.email]"
            label="E-mail">
           </v-text-field>
          <v-flex>
          <v-text-field
            v-model="password"
            ref="password"
            :append-icon="show1 ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-flex>
          <v-btn color="info" @click="submit">Login</v-btn>
      </v-flex> 
      
    </v-layout>
      <v-alert
      v-model="alert"
      :value="alert"
      type="error"
      transition="scale-transition">
      Wrong email or password
    </v-alert>    
  </v-container>
</v-app>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      title: 'Preliminary report',
      email: null,
      password: null,
      show1: false,
      alert: false,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        email(value) {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
        min: v => (v && v.length >= 8) || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
      },
    };
  },
  computed: {
      form () {
        return {
          email: this.email,
          password: this.password
        }
      }
    },
  methods: {
    submit () {
      console.log("form", this.form);
      let isFormValid = true;
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) {
          this.$refs[f].validate(true);
          isFormValid = false;
        }
      });
      if (isFormValid) {
        this.alert=false;
        console.log(alert);
        this.doLogin();
      }
    },
    doLogin(){
      var params = new URLSearchParams();
      params.append('email', this.form.email);
      params.append('password', this.form.password);
      axios
        .post(
          "http://localhost:5566/ecommerceassignment1_backend/ecommerceassignment2_backend/api/getUserDetail.php",
          params
        )
        .then(response => {
          console.log(response);
           this.$store.commit("signUp",response.data);
           this.$store.state.isLoggedIn=true;
           this.$router.push({ name: 'Products'});
        })
        .catch(error => console.log(error));
        this.alert=true;
    }
  }
};
</script>

<style>
.login_title{
  margin-top: 100px;
}
</style>
