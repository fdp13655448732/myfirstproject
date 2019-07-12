<!-- 单个商品的详情页 -->

<template>
  <transition name="leftFlayRight">
    <div v-show="showFlag" class="food" ref="foodWrapper">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt>

          <div class="back" @click="colseFoodDetailPage">
            <!--返回标签-->
            <i class="iconfont icon-fanhui"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
        <div class="buyController-wrapper" v-show="food.count>0">
          <v-buyControl :food="food" @drop="drop"></v-buyControl>
        </div>

        <div class="buy" v-show="!food.count||food.count===0" @click="addFirst">
              加入购物车
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//整个商品页面中放一个滚动插件
//引入按钮组件
import BuyControl from "../buyControl/BuyControl.vue";
import BScroll from "better-scroll";
import Vue from "vue";

export default {
  props: {
    food: {
      type: Object
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: {
    "v-buyControl": BuyControl,
  },
  data() {
    //这里存放数据
    return {
      showFlag: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    show() {
      this.showFlag = true;
       this.$nextTick(() => {
         if(!this.scroll){
           this.scroll=new BScroll(this.$refs.foodWrapper, {click :true})
         }else{
           //重新计算容器的高度
           this.scroll.refresh();
         }
             
            })
    },
    colseFoodDetailPage() {
      this.showFlag = false;
    },
    addFirst(event){
      //防止pc多次点击
      if(!event._constructed){
        return
      }else{
        Vue.set(this.food,'count',1);

      }

    }

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
* {
  margin: 0;
  padding: 0;
}
.food {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 95px;
  z-index: 30;
  transition: all 0.2s linear;
  background: #fff;
}
.leftFlayRight-transition {
  transform: translate3d(0, 0, 0);
}
.leftFlayRight-enter,
.leftFlayRight-leave {
  transform: translate3d(100%, 0, 0);
}
.image-header {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .back {
    position: absolute;
    top: 10px;
    left: 0;

    .icon-fanhui {
      display: block;
      padding: 20px;
      font-size: 40px;
      color: #fff;
    }
  }
}
.content {
  padding: 16px;
  .title {
    font-size: 28px;
    margin-bottom: 16px;
    font-weight: 700;
    color: rgb(7, 17, 27);
  }
  .detail {
    margin-bottom: 36px;
    line-height: 20px;
    height: 20px;
    font-size: 0;
    .sell-count,
    .rating {
      font-size: 20px;
      color: rgb(147, 153, 159);
    }
    .sell-count {
      margin-right: 24px;
    }
  }
  .price {
    font-weight: 700;
    line-height: 48px;
    .now {
      font-size: 28px;
      color: rgb(240, 20, 20);
      margin-right: 16px;
    }
    .old {
      font-size: 20px;
      color: rgb(147, 153, 159);
      text-decoration: line-through;
    }
  }
}
.buyController-wrapper {
  position: absolute;
  right: 24px;
  top: 745px;
} 
.buy {
  position: absolute;
  right: 36px;
   top: 760px;
  z-index: 10;
  height: 48px;
  line-height: 48px;
  padding: 0 24px;
  box-sizing:border-box;
  font-size: 20px;
  border-radius: 24px;
  color: #fff;
  background: rgb(0,160,220);
}
</style>