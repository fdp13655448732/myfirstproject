<!--  -->
<template>
  <div class="shopCar">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'heightlight':totalCount>0}">
            <i class="iconfont icon-gouwuche" :class="{'heightlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'heightlight' : totalCount>0}">￥{{totalPrice}}</div>
        <div class="desc">另需要配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{'heightlight' : totalPrice>=minPrice}">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

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
  components: {},
  data() {
    //这里存放数据
    return {};
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
       if(this.totalPrice===0) {
          return '￥'+this.minPrice+'起送';
       }else if (this.totalPrice-this.minPrice<0){
         let diff = this.minPrice-this.totalPrice
         return '还差￥'+ diff+'起送'
       }else{
         return "去结算";
       }
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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
  z-index: 50;

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
          color:white;
        }
      }
    }
  }
}
</style>