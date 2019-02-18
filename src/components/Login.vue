<template>
<v-app>
  <v-container >
    <v-layout wrap justify-center align-center>
      <v-flex md6 row >
        <h1 class="login_title">Login Page</h1>
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
  </v-container>
</v-app>
</template>
<script>
export default {
  data() {
    return {
      title: 'Preliminary report',
      email: null,
      password: null,
      show1: false,
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
        if (this.email === this.$store.state.userInfo.email && this.password === this.$store.state.userInfo.password) {
          this.$router.push({ name: 'Products'});
        }
      }
    },
  }
};
</script>

<style>
.login_title{
  margin-top: 100px;
}
</style>
