<template>
  <v-app>
    <v-container>
      <v-layout wrap justify-center align-center>
        <v-flex md6 row>
          <v-card class="profile_page_title" ref="form">
            <v-card-text>
              <v-text-field
                ref="name"
                v-model="name"
                :rules="[() => !!name || 'This field is required']"
                :error-messages="errorMessages"
                label="Full Name"
                placeholder="John Doe"
                required
              ></v-text-field>
              <v-text-field
                ref="email"
                v-model="email"
                :rules="[
              () => !!email || 'This field is required', emailCheck]"
                label="Email"
                placeholder="john@gmail.com"
                counter="25"
                required
              ></v-text-field>
              <v-text-field
                ref="password"
                v-model="password"
                :append-icon="show1 ? 'visibility_off' : 'visibility'"
                :rules="[() => !!password || 'This field is required', passwordCheck]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
                required
              ></v-text-field>
              <v-text-field
                ref="address"
                v-model="address"
                :rules="[
              () => !!address || 'This field is required',
              () => !!address && address.length <= 25 || 
              'Address must be less than 25 characters',
              addressCheck
            ]"
                label="Address Line"
                placeholder="Snowy Rock Pl"
                counter="25"
                required
              ></v-text-field>

              <v-text-field
                ref="city"
                v-model="city"
                :rules="[() => !!city || 'This field is required', addressCheck]"
                label="City"
                placeholder="El Paso"
                required
              ></v-text-field>
            </v-card-text>
            <v-divider class="mt-5"></v-divider>
            <v-card-actions>
              <v-btn flat>Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-slide-x-reverse-transition>
                <v-tooltip v-if="formHasErrors" left>
                  <v-btn slot="activator" icon class="my-0" @click="resetForm">
                    <v-icon>refresh</v-icon>
                  </v-btn>
                  <span>Refresh form</span>
                </v-tooltip>
              </v-slide-x-reverse-transition>
              <v-btn color="primary" flat @click="submit">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import axios from 'axios';
import config from '../config';
import {mapGetters, mapActions} from 'vuex';
export default {
  data() {
    return {
      errorMessages: "",
      name: this.$store.state.userInfo.name || null,
      email: this.$store.state.userInfo.email || null,
      password: null,
      address: this.$store.state.userInfo.address || null,
      city: this.$store.state.userInfo.city || null,
      formHasErrors: false,
      show1: false,
      counter: value => (value && value.length <= 20) || "Max 20 characters",
      min: v => (v && v.length >= 8) || "Min 8 characters",
      isEditProfile: this.$route.params.isEditProfile || false,
    }
  },
  computed: {
    form() {
      return {
        name: this.name,
        email: this.email,
        password: this.password,
        address: this.address,
        city: this.city
      };
    }
  },
  watch: {
    name() {
      this.errorMessages = "";
    }
  },
  methods: {
    ...mapActions(['doLogin']),
    passwordCheck(value) {
      return (value && value.length >= 8) || "Min 8 characters";
    },
    emailCheck(value) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || "Invalid e-mail.";
    },
    addressCheck() {
      this.errorMessages =
        this.address && !this.name ? "Hey! I'm required" : "";
      return true;
    },
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;
      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset();
      });
    },
    submit() {
      this.formHasErrors = false;
      console.log("form", this.form);
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) {
          this.formHasErrors = true;
          this.$refs[f].validate(true);
        }
      });
      if (!this.formHasErrors) {
        this.insertUserInfo();
        if (!this.isEditProfile) {
        this.$router.push({ name: "Login" });
        }
        else {
          this.$router.push({ name: "Products" });
        }
      }
    },
    insertUserInfo() {
      var params = new URLSearchParams();
      var url = config.apiUrlSignup
      params.append('name', this.form.name);
      params.append('email', this.form.email);
      params.append('password', this.form.password);
      params.append('address', this.form.address);
      params.append('city', this.form.city);
      if (this.isEditProfile) {
        params.append('id', this.$store.state.userInfo.id);
        url = config.apiUrlUpdateUser;
        // return console.log('edit profile');
      }
      axios
        .post(
          url,
          params
        )
        .then(response => {
          console.log(response);
          this.doLogin({email: this.form.email, password: this.form.password})
        })
        .catch(error => console.log(error));
    },
  }
};
</script>

<style>
.profile_page_title {
  margin-top: 100px;
}
</style>
