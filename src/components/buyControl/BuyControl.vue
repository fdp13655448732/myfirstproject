<!-- 复用的按钮组件 -->
<template>
  <div class="buyControl">
    <transition name="move">
      <div class="buy-decrease" v-show="food.count>0">
        <span class="inner">
          <i class="iconfont icon-jian" @click="decrease"></i>
        </span>
        <span></span>
      </div>
    </transition>
    <div class="buy-count" v-show="food.count>0">{{food.count}}</div>
    <div class="buy-add">
      <i class="iconfont icon-jia" @click="add"></i>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//不存在的属性用到vue的别的方法
import Vue from "vue";

export default {
  props: {
    food: {
      type: Object,
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    add(event) {
      //防止点击触发俩次
      if (!event._constructed) {
        return;
      }
      console.log(this.food);
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }

      var el_target = event.currentTarget;
      this.$emit("drop", el_target);
    },
    //减
    decrease(event) {
      //防止点击触发俩次
      if (!event._constructed) {
        return;
      }
      this.food.count--;
      if (this.food.count <= 0) {
        this.food.count = 0;
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
.buyControl {
  .buy-decrease {
    display: inline-block;
    padding: 12px;
    transition: all 0.4s linear;
    .icon-jian {
      font-size: 48px;
      line-height: 48px;
      color: rgb(0, 160, 220);
    }
  }
  .buy-count {
    display: inline-block;
    text-align: center;
    font-size: 24px;
    line-height: 48px;
    padding: 0 16px 0 6px;
    width: 12px;
  }
  .buy-add {
    display: inline-block;
    .icon-jia {
      font-size: 48px;
      line-height: 48px;
      color: rgb(0, 160, 220);
    }
  }
}
//动画
.move-enter,
.move-leave-to {
  //滑动和滚动同时的动画
  transform: translate3d(0, 0, 0) rotate(0);
  opacity: 0;
}
.move-enter-active,
.move-leave-active {
  transition: opacity 2s;
  transform: translate3d(24px, 0, 0) rotate(180deg);
}

</style>