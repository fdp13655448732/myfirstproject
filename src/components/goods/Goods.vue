<!--  -->
<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          :key="index"
          v-for="(item,index) in goods"
          class="menu-item"
          :class="{'current':currentIndex===index}"
          @click="selectMenu(index,$event)"
        >
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li :key="index" v-for="(item,index) in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li
              @click.stop.prevent="selectFood(food,$event)"
              :key="index2"
              v-for="(food,index2) in item.foods"
              class="food-item"
            >
              <div class="icon">
                <img width="114" height="114" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="buyControl-wrapper">
                  <v-buyControl :food="food" @drop="drop"></v-buyControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--配送费 起送费-->
    <div class="shopCar">
      <v-shopCar
        :selectFoods="selectFoods"
        :delivery-price="seller.deliveryPrice"
        :min-price="seller.minPrice"
      ></v-shopCar>
    </div>
    <!-- 加入购入车按钮的小球动画实现 -->
    <div class="ball-container">
      <transition
        v-on:after-enter="afterEnter"
        v-on:enter="enter"
        v-on:before-enter="beforeEnter"
        name="drop"
        v-for="(litterBall,indexBall) in balls"
        :key="indexBall"
      >
        <div v-show="litterBall.show" class="ball">
          <div class="inner" :class="indexBall"></div>
        </div>
      </transition>
    </div>

    <!--单个商品的详细-->
 
    <v-food :food="selectedFood" ref="vFood" ></v-food>

    
  </div>
</template>  

<script>
//引入better-scroll插件
import Velocity from "velocity-animate";
import BScroll from "better-scroll";
import ShopCar from "../shopCar/ShopCar.vue";
//引入按钮组件
import BuyControl from "../buyControl/BuyControl.vue";
//引入单个商品的详情
import Food from "../food/Food.vue";
const ERR_OK = 200;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      menuScroll: {},
      foodScroll: {},
      listHeight: [],
      scrollY: 0,
      balls: [
        //小球
        { show: false, index: 0 },
        { show: false, index: 1 },
        { show: false, index: 2 },
        { show: false, index: 3 },
        { show: false, index: 4 },
        { show: false, index: 5 },
        { show: false, index: 6 },
        { show: false, index: 7 },
        { show: false, index: 8 },
        { show: false, index: 9 },
        { show: false, index: 10 },
        { show: false, index: 11 }
      ],
      dropBall: [],
      selectedFood: {}
    };
  },

  components: {
    "v-shopCar": ShopCar,
    "v-buyControl": BuyControl,
    "v-food": Food
  },

  //mounted: {},
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.$axios.get("api/goods").then(
      response => {
        if (response.status === ERR_OK) {
          this.goods = response.data;
          // this.menu =response.data.name
          // this.food = response.data.foods.name
          this.$nextTick(() => {
            //dom更新
            this.initScroll();
            //计算右侧食品高度
            this.calculateHeight();
          });

          //console.log(response.data);
        }
      },
      error => {
        //  console.log(error);
      }
    );
  },
  //计算属性
  computed: {
    //左侧当前索引应该在哪
    currentIndex() {
      for (let index = 0; index < this.listHeight.length; index++) {
        const height1 = this.listHeight[index];
        const height2 = this.listHeight[index + 1];
        //最后一个会超出数组长度这里判断一下  或者在这个区间内我们就返回 这个区间的索引
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return index;
        }
      }
      return 0;
    },
    //选中的食品
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },

  methods: {
    //dom更新
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      });

      //probeType: 3 希望scroll在滚动的时实时监听滚动位置
      this.foodScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y)); //转正值 小数转整数
      });
    },
    //计算右侧食品高度
    calculateHeight() {
      const foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let index = 0; index < foodList.length; index++) {
        let item = foodList[index];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      //原生的点击事件和触发的这个点击有区别   不然电脑端会打印俩次监听的内容
      if (!event._constructed) {
        return;
      }
      const foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      //console.log(foodList);
      let el = foodList[index];
      this.foodScroll.scrollToElement(el, 300);
    },
    drop(el) {
      //小球动画方法,el就是加号按钮元素
      for (var i = 0; i < this.balls.length; i++) {
        if (!this.balls[i].show) {
          //把小球show为false的变成true，展示出来
          let ball = this.balls[i];
          ball.show = true; //这里这样写他继承的this.balls的值也会变成true

          ball.el = el; //把这个球的位置保留下来

          this.dropBall.push(ball); //把这个已经drop的球放到dropBall中
          console.log(this.dropBall);
          //console.log(this.dropBall,222)
          return; //结束循环和函数，不会让循环再往后执行了
        }
      }
    },
    beforeEnter(els) {
      let nn = this.dropBall;
      let count = this.dropBall.length - 1;
      nn.forEach(el => {
        //console.log(el)
      });
      //while(count--){
      //let ball = this.balls[count];
      let ball = this.dropBall[count];
      //if(ball.show){//ball.el就是前面把点击的元素绑在了ball.el属性上
      let rect = ball.el.getBoundingClientRect(); //getBoundingClientRect()可以获取到元素对象和窗口的相对上下左右的距离
      var rect2 = els.getBoundingClientRect();
      let x = rect.left - 18; //点击元素的左边距离 - 下面购物车左边的距离，就是小球要运动的X轴距离
      let y = -(window.innerHeight - rect.top - 32); //窗口的高度 - 点击元素离窗口的高度 - 购物车底部的padding,margin高度，就是小球要运动的y轴距离，且是向下运动，所以是负值
      //els.style.display ="";
      els.style.opacity = 1;
      els.style.webkitTransform = `translate3d(0,${y}px,0)`;
      els.style.transform = `translate3d(0,${y}px,0)`; //外层做纵轴运动
      //内层做横轴运动
      let inner = els.getElementsByClassName("inner")[0];
      inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
      inner.style.transform = `translate3d(${x}px,0,0)`;
      //}
      //}
    },
    enter(els, done) {
      var _this = this;
      let hh = els.offsetHeight; //手动获取这个值，触发浏览器重绘
      _this.$nextTick(function() {
        //els.style.webkitTransform = 'translate3d(0,0,0)';
        //els.style.transform = 'translate3d(0,0,0)'; //外层做纵轴运动
        //内层做横轴运动
        els.style.opacity = "0";
        let inner = els.getElementsByClassName("inner")[0];
        //inner.style.webkitTransform = 'translate3d(0,0,0)';
        //inner.style.transform = 'translate3d(0,0,0)';
        Velocity(els, { transform: "translate3d(0,0,0)" }, { duration: 600 });
        Velocity(
          inner,
          { transform: "translate3d(0,0,0)" },
          {
            duration: 600,
            complete: function() {
              done();
            }
          }
        );
      });
    },
    afterEnter(els) {
      let ball = this.dropBall.shift();
      if (ball) {
        ball.show = false;
        els.style.display = "none"; //这个很重要
      }
      //els.style.opacity = 0;
    },
    //点击的哪个商品
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      } else {
        this.selectedFood = food;
        this.$refs.vFood.show();
      }
    }
  },
  transition: {
    //定义全局的transition的钩子函数
    drop: {
      //这里的drop是在标签中写的transition的name
    }
  }
};
</script>
<style lang='scss' scoped>
* {
  margin: 0;
  padding: 0;
}
.goods {
  display: flex;
  position: absolute;
  width: 100%;
  top: 322px;
  bottom: 92px;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 160px;
    width: 160px;
    background: #f3f5f7;
    .menu-item {
      display: table;
      height: 100px;
      width: 160px;
      line-height: 28px;

      .text {
        font-size: 22px;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
      }
      .icon {
        vertical-align: top;
        display: inline-block;
        width: 26px;
        height: 24px;
        margin-right: 4px;
        border: 1px solid rgba(7, 17, 27, 0.1);
        &.decrease {
          background-image: url("../header/decrease_2@2x.png");
        }
        &.discount {
          background-image: url("../header/discount_2@2x.png");
        }
        &.special {
          background-image: url("../header/special_2@2x.png");
        }
        &.invoice {
          background-image: url("../header/invoice_2@2x.png");
        }
        &.guarantee {
          background-image: url("../header/guarantee_2@2x.png");
        }
      }
    }
    .current {
      position: relative margin-top： -1px;
      z-index: 10;
      background: #fff;
      font-weight: 700;
      width: 100%;
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 28px;
      height: 52px;
      line-height: 52px;
      border-left: 2px solid #d9dde1;
      font-size: 24px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }
    .food-list {
      list-style: none;
      .food-item {
        display: flex;
        margin: 36px;
        list-style: none;
        padding-bottom: 38px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        &:last-child {
          border-bottom: 0px;
          margin-bottom: 0px;
        }
        .icon {
          flex: 0 0 114px;
          margin-right: 20px;
        }
        .content {
          flex: 1;
          .name {
            margin: 4px 0 8px 0;
            height: 28px;
            line-height: 28px;
            font-size: 28px;
            color: rgb(7, 17, 27);
          }
          .desc {
            margin-bottom: 16px;
            margin-top: 16px;
            line-height: 24px;
            font-size: 20px;
            color: rgb(147, 153, 159);
          }
          .extra {
            line-height: 20px;
            font-size: 20px;
            color: rgb(147, 153, 159);
            margin-bottom: 10px;
            .count {
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
          .buyControl-wrapper {
            position: absolute;
            right: 36px;
            margin-top: -36px;
          }
        }
      }
    }
  }
}

.ball-container {
  .ball {
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 900;
    transform: translate3d(0, 0, 0);
    transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }

  .inner {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    background: rgb(0, 160, 220);
    transition: all 0.6s linear;
    transform: translate3d(0, 0, 0);
  }
}
</style>