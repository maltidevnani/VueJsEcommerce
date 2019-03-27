<template>
  <v-app>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="mainContainer">
          <!-- <v-list two-line> -->
          <v-container v-if="mode == 'add'">
            <v-layout class="myLayoutClass">
              <v-flex md3>
                <v-card class="myReviewCardClass">
                  <input class="myReviewCardClass" v-model="name" placeholder="Your name">
                </v-card>
              </v-flex>
              <v-flex md3>
                <v-card class="myReviewCardClass">
                  <textarea class="myReviewCardClass" v-model="review" placeholder="add a review"></textarea>
                </v-card>
              </v-flex>
              <v-flex md3>
                <img :src="image" width="50px" height="50px">
                <input type="file" @change="onFileChange">
              </v-flex>
              <v-flex md3>
                <v-btn color="success" @click="addReview()">Add</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-else v-for="review in this.reviewList" :key="review.review_id">
            <v-flex xs12>
              <v-card color="cyan darken-2" class="white--text">
                <v-layout>
                  <v-flex xs5>
                    <v-img
                     :src="review.review_image"
                      height="125px"
                      contain
                    ></v-img>
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
export default {
  name: "commentPage",
  data() {
    return {
      proId: this.$route.params.Pid,
      mode: this.$route.params.mode,
      reviewList: [],
      review: "",
      name: "",
      image: "",
      file: ""
    };
  },
  mounted() {
    var params = new URLSearchParams();
    params.append("productId", this.proId);
    console.log(this.proId);
    axios
      .post(
        "http://localhost:5566/ecommerceassignment1_backend/ecommerceassignment2_backend/api/getReviewList.php",
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
      console.log(this.message + " " + this.name);
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
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    submitFile() {
      let formData = new FormData();
      formData.append("image", this.file);
      formData.append("name", this.name);
      formData.append("comment", this.review);
      formData.append("productId", this.proId);
      console.log("form data is", formData);
      axios
        .post(
          "http://localhost:5566/ecommerceassignment1_backend/ecommerceassignment2_backend/api/addReview.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
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
