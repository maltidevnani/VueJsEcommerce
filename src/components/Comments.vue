<template>
  <v-app>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="mainContainer">
          <!-- <v-list two-line> -->
          <v-container v-if="mode == 'add'">
            <v-layout>
              <v-flex xs12 sm6>
                <input v-model="name" placeholder="Your name">
                <textarea v-model="review" placeholder="add a review"></textarea>
                <input type="file" @change="onFileChange">
                <img :src="image" width="50px" height="50px">
                <v-btn color="success" @click="addReview()">Add</v-btn>
              </v-flex>
            </v-layout>
          </v-container>

          <div v-for="product in $store.state.productsData" :key="product.id">
            <div v-if="proId == product.id">
              <v-card v-for="review in product.reviews" :key="review.rId">
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{review.rName}}</h3>
                    <div>{{review.review}}</div>
                  </div>
                </v-card-title>
              </v-card>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
export default {
  name: "commentPage",
  data() {
    return {
      proId: this.$route.params.Pid,
      mode: this.$route.params.mode,
      review: "",
      name: "",
      image: ""
    };
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
    }
  }
};
</script>
<style>
.mainContainer {
  margin-top: 130px;
}
</style>
