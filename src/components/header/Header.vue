<!--  -->
<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="128" height="128" :src="seller.avatar" alt>
      </div>
      <div class="content">
        <div v-if="seller.supports" class="support-count" @click="detailShow">
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
    <div class="bulletin-wrapper" @click="detailShow">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-rightGg">
        <i class="iconfont icon-right"></i>
      </span>
    </div>

    <div class="top-background">
      <img :src="seller.avatar" alt width="100%" height="100%">
    </div>
    <div v-show="detailShowFlag" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
           <h1 class="name">{{seller.name}}</h1>
           <div class="star"><v-star size=48 :score="seller.score"></v-star></div>
           <div class="title">
<div class="line"></div>
<div class="text">优惠信息</div>
<div class="line"></div>
            
           </div>
        </div>
      </div>
<!--关闭按钮图片-->
      <div class="detail-close" >
        <i class="iconfont icon-guanbi" @click="closeDetailShow" ></i>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '../star/Star.vue'
export default {
  data() {
    return {
      detailShowFlag: false
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

  components: {
    "v-star":Star
  },

  computed: {},

  // mounted: {},

  methods: {
    detailShow() {
      this.detailShowFlag = true;
    },
    //关闭浮层
    closeDetailShow() {
      this.detailShowFlag = false;
    }
  }
};
</script>

<style lang='scss' scoped>
.clearfix {
  display: inline-block;
  &:after {
    content: ".";
    display: block;
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
}

.header {
  position: relative;
  overflow: hidden;
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
        bottom: 36px;
        padding: 0 16px;
        height: 48px;
        line-height: 48px;
        font-size: 20px;
        background-color: rgba(7, 17, 27, 0.2);
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
    background-color: rgba(7, 17, 27, 0.2);
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
      background-image: url("bulletin@2x.png");
      margin-right: 8px;
      margin-top: 16px;
    }
    .icon-rightGg {
      position: absolute;
      font-size: 20px;
      right: 12px;
    }
  }
  .top-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7, 17, 27, 0.8);

    .detail-wrapper {
      min-height: 100%;
      width: 100%;
      .detail-main {
        
        margin-top: 64px;
        padding-bottom: 64px;
        .name {
         font-size: 32px;
         line-height: 32px;
         font-weight: 700px;
         text-align: center;
        }
        .star {
          font-size: 24px;
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .title {
          display: flex;
          width: 80%;
        
          font-weight: 700px;
          line-height: 28px;
          margin: 30px auto 24px auto;
          .line{
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }
          .text
          {
            padding: 0 24px;
            font-size: 28px;

          }

        }
      }
    }
    .detail-close {
      position: relative;
      width: 64px;
      height: 64px;
      margin: -128px auto 0 auto;
      clear: both;
      font-size: 32px;
      .icon-guanbi {
        font-size: 40px;
      }
    }
  }
}
</style>