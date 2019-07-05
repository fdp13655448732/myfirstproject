<!--  -->
<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li :key="index" v-for="(item,index) in goods" class="menu-item" :class = "{'current':currentIndex===index}" @click="selectMenu(index,$event)">
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
            <li :key="index2" v-for="(food,index2) in item.foods" class="food-item">
              <div class="icon">
                <img width="114" height="114" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span> 好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="buyControl-wrapper">
                <v-buyControl :food="food" ></v-buyControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--配送费 起送费-->
    <div class="shopCar"><v-shopCar :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopCar></div>
  </div> 
</template>

<script>
//引入better-scroll插件
import BScroll from "better-scroll";
import ShopCar from '../shopCar/ShopCar.vue';
//引入按钮组件
import BuyControl from '../buyControl/BuyControl.vue';
const ERR_OK = 200;
export default {
  props: {
    seller:{
      type: Object 
    }
  },
  data() {
    return {
      goods: {},
      menuScroll: {},
      foodScroll: {},
      listHeight: [],
      scrollY: 0,
    };
  },

  components: {
    "v-shopCar":ShopCar,
    "v-buyControl":BuyControl
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

          console.log(response.data);
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
          if (!height2||(this.scrollY >= height1 && this.scrollY < height2)) {
            return index;
          }
        }
        return 0;
      }
    },

  methods: {
     //dom更新
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodsWrapper, { probeType: 3,click: true});

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
       selectMenu(index,event) {
         
    //原生的点击事件和触发的这个点击有区别   不然电脑端会打印俩次监听的内容 
    if(!event._constructed){
      return;
    }
      const foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      console.log(foodList)
      let el=foodList[index];
      this.foodScroll.scrollToElement(el,300);
  },
 
  },


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
      position: relative
      margin-top： -1px;
      z-index: 10;
      background:#fff;
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
            margin-top: -36px
          }
        }
      }
    }
  }
}
</style>