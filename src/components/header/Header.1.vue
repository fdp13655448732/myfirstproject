<!--  -->
<template>
  <div class="header">
<div class="content-wrapper">
  <div class="avatar">
    <img  width="128" height="128" :src="seller.avatar" alt="">
  </div>
<div class="content">
  <div class="title">
    <span class=brand></span>
     <span class=name>{{seller.name}}</span>
  </div>
  <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
  <div v-if="seller.supports" class="support">
    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
    <span class="text"> {{seller.supports[0].description}}</span>
  </div>
</div>
</div>

<!--公告-->
<div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
     type: Object
    }
  },
  //用来接收app.vue在头部组件绑定的数据
  props: {
    seller: {
        type: Object
    }
  },
  created() {
        this.classMap=['decrease','discount','special','invoice','guarantee']
  },

  components: {},

  computed: {},

 // mounted: {},


  methods: {}
}

</script>
<style lang='scss' scoped>
.header {
color:#fff;
background-color: blue;
font-size: 0;
.content-wrapper {
 padding: 48px 24px 36px 48px;
 .avatar {
   display: inline-block;
   font-size: 24px;
  img {
  border-radius: 4px;
  }
 }
 .content {
margin-left: 32px;
display: inline-block;
font-size: 24px;
 }

.title {
  margin: 4px 0 16px 0;
  .brand {
    display: inline-block;
    width: 60px;
    height: 36px;
    background-image: url(./brand@2x.png);
    background-size: 60px 36px;
    background-repeat: no-repeat;
    vertical-align: top
  }
  .name {
    font-size: 32px;
    margin-left: 12px;
    line-height: 36px;
    font-weight: bold;
  }
}
.description {
  margin-bottom: 20px;
  line-height: 24px;
  font-weight: 200;
  font-size: 24px;
}
.support {
    .icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-right: 8px;
     // background-image: url();
      background-size: 24px 24px;
      background-repeat: no-repeat;
      &.decrease {
        background-image: url('')
      }




    }
    .text {
    font-size: 20px;
    font-weight:200;
    line-height: 24px;
    font-size: 20px;

  }
}

}
}
</style>