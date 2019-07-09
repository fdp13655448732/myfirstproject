<!--  -->
<template>
  <div>
    <div class="shopCar">
      <div class="content">
        <div class="content-left" @click="toggleList">
          <div class="logo-wrapper">
            <div class="logo" :class="{'heightlight':totalCount>0}">
              <i class="iconfont icon-gouwuche" :class="{'heightlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'heightlight' : totalCount>0}">￥{{totalPrice}}</div>
          <div class="desc">另需要配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click="pay">
          <div class="pay" :class="{'heightlight' : totalPrice>=minPrice}">{{payDesc}}</div>
        </div>
      </div>
      <transition name="fold">
        <div class="shop-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" :key="index" v-for="(food,index) in selectFoods">
                <div class="name">{{food.name}}</div>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="control-wrapper">
                  <v-buyControl :food="food"></v-buyControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>

<transition name="mask"  >
    <div class="list-mask" v-show="listShow" @click="clearAction"></div>
</transition>

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import BuyControl from "../buyControl/BuyControl.vue";
import BScroll from "better-scroll";

export default {
  props: {
    //所有的状态变化都是通过这个属性来的
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 1
          }
        ];
      }
    },
    //配送费
    deliveryPrice: {
      type: Number,
      default: 0
    },

    //多少元起送
    minPrice: {
      type: Number,
      default: 0
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: {
    "v-buyControl": BuyControl
  },
  data() {
    //这里存放数据
    return {
      fold: true
    };
  },
  //监听属性 类似于data概念 （计算属性）
  computed: {
    //所有商品的总价
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    //所有的商品的综合
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    //支付描述
    payDesc() {
      if (this.totalPrice === 0) {
        return "￥" + this.minPrice + "起送";
      } else if (this.totalPrice - this.minPrice < 0) {
        let diff = this.minPrice - this.totalPrice;
        return "还差￥" + diff + "起送";
      } else {
        return "去结算";
      }
    },
    //控制支付详情的显示与隐藏
    listShow() {
      if (!this.totalCount) {
        //没有商品时折叠状态是 true  折叠的
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            //重新计算视口和它的高度
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //购物车点击黑色区域来回 显示隐藏
    toggleList() {
      if (!this.totalCount) {
        return;
      } else {
        this.fold = !this.fold;
      }
    },
    //清空
    empty() {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    //清除动画浮层
    clearAction(){
    this.fold = !this.fold;
    },
    //支付的方法
    pay(){
      if(this.totalPrice<this.minPrice){
        return;
      }else{
        alert("确定支付"+(this.totalPrice+this.deliveryPrice)+"元")
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
  margin: 0px;
  padding: 0px;
}
.shopCar {
  position: fixed;
  width: 100%;
  height: 96px;
  left: 0;
  bottom: 0;
  z-index: 55;

  .content {
    display: flex;
    background: #141d27;
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -20px;
        margin: 0 24px;
        padding: 6px;
        width: 112px;
        height: 112px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background-color: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #2b343c;
          text-align: center;
          &.heightlight {
            background: rgb(0, 160, 220);
          }
          .icon-gouwuche {
            line-height: 96px;
            font-size: 48px;
            color: #80858a;

            &.heightlight {
              color: white;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 48px;
          height: 32px;
          text-align: center;
          border-radius: 32px;
          font-size: 18px;
          font-weight: 700;
          color: white;
          background: red;
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.4);
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        line-height: 96px;
        padding-right: 24px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 32px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        &.heightlight {
          color: white;
        }
      }
      .desc {
        display: inline-block;
        text-align: top;
        line-height: 96px;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.4);
        margin-left: 20px;
      }
    }
    .content-right {
      flex: 0 0 172px;
      width: 172px;
      .pay {
        height: 96px;
        line-height: 96px;
        font-size: 24px;
        text-align: center;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700px;
        background: #2b333b;
        &.heightlight {
          background: green;
          color: white;
        }
      }
    }
  }
  .ball-container {
    .ball {
      //相对于视口做一个动画
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 55;
      .inner {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
      }
    }
  }
}

.shop-list {
  transition: all 0.5s;
  position: fixed;
  bottom: 96px;
  left: 0;
  z-index: 40;
  width: 100%;
  .list-header {
    height: 80px;
    line-height: 80px;
    padding: 0 36px;
    background: #f3f5f7;
    border-bottom: 2px solid rgba(7, 17, 27, 0.1);
    .title {
      float: left;
      font-size: 28px;
      color: rgb(7, 17, 27);
    }
    .empty {
      float: right;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
  }
  .list-content {
    padding: 0 36px;
    max-height: 434px;
    overflow: hidden;
    background: #fff;
    .food {
      list-style-type: none;
      position: relative;
      padding: 30px 0;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    .name {
      line-height: 48px;
      font-size: 28px;
      color: rgb(7, 17, 27);
    }
    .price {
      position: absolute;
      right: 180px;
      bottom: 24px;
      line-height: 48px;
      font-weight: 700;
      font-size: 28px;
      color: red;
    }
    .control-wrapper {
      line-height: 48px;
      position: absolute;
      right: 0;
      bottom: 0px;
    }
  }
}
.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:rgba(7, 17, 27, 0.6);
  backdrop-filter: blur(10px);
  z-index:1;
  transition: all 0.5s;
}
.mask-transition {
  opacity: 1;
  background:rgba(7, 17, 27, 0.6);
}
.mask-enter,.mask-leave-to {
  opacity: 0;
   background:rgba(7, 17, 27, 0);
}

/*
  vue分为入场动画,和离场动画
  v-enter 这是入场动画开始之前的状态,即原状态 到 达到动画效果的时间段的起始点
    v-leave-to 是离场动画结束后的状态 即 动画效果还原到初始状态后的结束点
    注意下面的是类名,不要少写了点
    */

//购物车详情显示动画
.fold-enter,
.fold-leave-to {
  //滑动和滚动同时的动画
  transform: translate3d(0, 0, 0);
  opacity: 0;
}
// .fold-enter-active,
// .fold-leave-active {
//   transition: opacity 2s;
//   transform: translate3d(24px, 0, 0) rotate(180deg);
// }
.fold-transition {
  transition: all 0.5s;
  transform: translate3d(0, -100%, 0);
}
</style>