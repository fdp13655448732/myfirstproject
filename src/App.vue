<template>
  <div id="app">
    <!-- <router-link to="/header">跳转到header</router-link>
    -->
    <div class="header">
      <v-header :seller="seller"></v-header>
    </div>

    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">食品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
    </div>
    <div class="content">
      
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Header from "./components/header/Header.vue";
const ERR_OK = 200;
export default {
  name: "app",
  data () {
    return {
     seller:{}
    }
  },
  components: {
    "v-header": Header
  },
  //   mounted(){

  // this.$axios.get('http://localhost:8081/api/goods')
  //   .then(response => console.log(response))
  //   .catch(error => console.log(error));
  //   }
  created() {
    this.$axios.get("api/seller").then(
      response => {
      
        if (response.status === ERR_OK) {
          this.seller=response.data
         console.log( this.seller);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
};
</script>

<style lang="scss" scoped>
//弹性布局
.tab {
  display: flex;
  width: 100%;
  line-height: 40px;
  height: 40px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  font-size: 28px;

  .tab-item {
    flex: 1;
    text-align: center;
  }
}

</style>
