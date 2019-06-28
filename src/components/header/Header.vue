<!--  -->
<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="128" height="128" :src="seller.avatar" alt>
      </div>
      <div class="content">
        <div v-if="seller.supports" class="support-count">
          <span class="count">{{seller.supports.length}}个</span>

          <i class="iconfont icon-right"></i>
        </div>
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>

    <!--公告-->
    <div class="bulletin-wrapper">
      <span class=bulletin-title></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
       <span class="icon-rightGg"><i class="iconfont icon-right"></i></span>
    </div>

    <div class="top-background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: Object
    };
  },
  //用来接收app.vue在头部组件绑定的数据
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },

  components: {},

  computed: {},

  // mounted: {},

  methods: {}
};
</script>

<style lang='scss' scoped>

.header {
  position: relative;
  color: #fff;
  background-color: rgba(7, 17, 27, 0.5);
  font-size: 0;
  .content-wrapper {
    position: relative;
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

    .support-count {
     position: absolute;
     right: 24px;
     bottom:36px;
     padding: 0 16px;
     height: 48px;
     line-height: 48px;
     font-size: 20px;
     background-color: rgba(7,17,27,0.2);
     border-radius: 28px;
     text-align: center;
     .count {
       padding-right: 8px;
      }
    }

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
        vertical-align: top;
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
        vertical-align: top;
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-right: 8px;
        // background-image: url();
        background-size: 24px 24px;
        background-repeat: no-repeat;

        &.decrease {
          background-image: url("./decrease_2@2x.png");
        }
        &.discount {
          background-image: url("./discount_2@2x.png");
        }
        &.special {
          background-image: url("./special_2@2x.png");
        }
        &.invoice {
          background-image: url("./invoice_2@2x.png");
        }
        &.guarantee {
          background-image: url("./guarantee_2@2x.png");
        }
      }
      .text {
        vertical-align: top;
        font-size: 20px;
        font-weight: 200;
        line-height: 24px;
      }
    }
  }
  .bulletin-wrapper {
    background-color: rgba(7,17,27,0.2);
    position: relative;
     vertical-align: top;
    font-size: 20px;
    font-weight: 200;
    line-height: 56px;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 24px 0 24px;
    text-overflow: ellipsis;
    .bulletin-title {
      vertical-align: top;
      display: inline-block;
      width: 44px;
      height: 22px;
      background-image: url('bulletin@2x.png');
      margin-right: 8px;
      margin-top: 15px;
    }
    .icon-rightGg {
      position:absolute;
      font-size: 20px;
      right:12px;
    }
  }
  .top-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter:blur(10px)

  }
}
</style>