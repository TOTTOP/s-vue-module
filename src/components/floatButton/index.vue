<script setup>
// left top iconImg iconText
// 增加可选择属性，不止有lef 和 top
import { ref, onMounted, computed } from 'vue';
let topD = ref(0)

// 视口宽|高
let clientW = ref(document.documentElement.clientWidth)
let clientH = ref(document.documentElement.clientHeight)

// 计算位置样式
const positionStyle = computed(() => {
  const style = {}
  // 左右
  if(props.left !== undefined){
    style.left = `${props.left}px`
    style.right = 'unset'
  } else if (props.right !== undefined){
    style.right = `${props.left}px`
    style.left = 'unset'
  } else {
    style.right = '10px'
  }

  // 上下
  if (props.bottom !== undefined) {
    style.bottom = `${props.bottom}px`
    style.top = 'unset'
  } else if (props.top!== undefined) {
    style.top = `${props.top}px`
    style.bottom = 'unset'
  } else {
    style.top = `${clientH / 2}px`
  }
})

const localBegin = () => {
  clientW = document.documentElement.clientWidth
  clientH = document.documentElement.clientHeight
  // topD = (clientH / 2)
};
localBegin()

// 监听窗口
const addResize = () => {
  window.onresize = () => {
    let timer
    if (!timer) {
      timer = true
      setTimeout(() => {
        localBegin()
        timer = false
      }, 200)
    }
  }
}
// props
// 在setup中不能直接使用props中的值，需先定义一个变量接收defineProps
// eg: const props = defineProps({})  props.xxx
const props = defineProps({
  iconMsg: {
    type: Object,
    required: true
  },
  left: Number,
  right: Number,
  top: Number,
  bottom: Number,
  // iconImg: {
  //   type: String,
  //   required: true,
  // },
  // iconText: {
  //   type: String,
  //   required: true,
  // }
})

onBeforeUnmount(() => {
  window.onresize = null
})

onMounted(() => {
  addResize()
});

</script>

<template>
  <div>
    <div class="button-div" :style="positionStyle">
      <div class="icon-div" :style="{ 'background': `url(iconImg) no-repeat` }">
        <div class="text-div">{{ iconMsg.iconText }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>
// button
@bwidth: 50px;
@bheight: 60px;
@bcolor: #6293fd;
@bsize: 16px;
// text
@tcolor: #ffffff;
.button-div{
  background: @bcolor;
  position: fixed;
  width: @bwidth;
  height: @bheight;
  color: @bcolor;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  font-size: @bsize;
  cursor: pointer;
  right: 10px;
  .icon-div{
    width: 100%;
    height: 100%;
    // margin: 2% 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5% 0;
    .icon-img{
      width: 70%;
      height: 70%;
      margin-bottom: 8px;
    }
    .text-div{
      color: @tcolor;
      // margin-top: 70%;
      margin-top: 0;
    }
  }
}
</style>