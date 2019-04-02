<template>
  <v-app>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="mainContainer">
          <!-- <v-list two-line> -->
          <v-container v-if="mode == 'add'">
            <v-text-field
              v-model="name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="review"
              label="Review"
              required
            ></v-text-field>
            <v-flex>
                <img v-if="imageData" :src="imageData" width="50px" height="50px" alt="No Image">
            </v-flex>
            <input type="file" ref="file" @change="onFileChange" accept="image/*"> 
            <v-btn block color="success" dark @click="submitFile()">Add Review</v-btn>           
            <v-alert :value="isReviewAddedSuccessfully" v-model="isReviewAddedSuccessfully" type="success">Review Added Successfully</v-alert>
          </v-container>
          <v-container v-else v-for="review in this.reviewList" :key="review.review_id">
            <v-flex xs12>
              <v-card color="cyan darken-2" class="white--text">
                <v-layout>
                  <v-flex xs5>
                    <v-img :src="review.review_image" height="125px" contain></v-img>
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{review.reviewer_name}}</div>
                        <div>{{review.review_comment}}</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import axios from "axios";
import config from '../config';
export default {
  name: "commentPage",
  data() {
    return {
      proId: this.$route.params.Pid,
      mode: this.$route.params.mode,
      reviewList: [],
      review: "",
      name: "",
      imageData: "",
      file: "",
      isReviewAddedSuccessfully: false,
    };
  },
  mounted() {
    var params = new URLSearchParams();
    params.append("productId", this.proId);
    console.log(this.proId);
    axios
      .post(
        config.apiUrlReviews,
        params
      )
      .then(response => {
        console.log(response);
        this.reviewList = response.data.reviews;
        console.log("review data", this.reviewList);
      })
      .catch(error => console.log(error));
  },
  methods: {
    addReview() {
      this.$store.commit("addReview", {
        id: this.proId,
        name: this.name,
        review: this.review
      });
      this.$forceUpdate();
    },
    onFileChange(e) {
      this.file = this.$refs.file.files[0];
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.imageData = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    submitFile() {
      if (!this.file || !this.name || !this.review || !this.proId) {
        return;
      }
      let formData = new FormData();
      formData.append("image", this.file);
      formData.append("name", this.name);
      formData.append("comment", this.review);
      formData.append("productId", this.proId);
      console.log("form data is", formData);
      axios
        .post(
          config.apiUrlAddReview,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(function() {
         this.isReviewAddedSuccessfully=true;
          console.log("SUCCESS!!");
        })
        .catch(function() {
         // this.isReviewAddedSuccessfully=false;
          console.log("FAILURE!!");
        });
        
    }
  }
};
</script>
<style>
.mainContainer {
  margin-top: 130px;
}
.myLayoutClass {
  padding: 10px;
}
.myReviewCardClass {
  height: 50px;
}
</style>
