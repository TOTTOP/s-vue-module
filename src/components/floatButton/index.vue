<script setup>
// left top iconImg iconText
// 增加可选择属性，不止有lef 和 top
import { ref, onMounted } from 'vue';
let topD = ref(0)

// 视口宽|高
// let clientW = ref(document.documentElement.clientWidth)
let clientH = ref(document.documentElement.clientHeight)

const localBegin = () => {
  // clientW = document.documentElement.clientWidth
  clientH = document.documentElement.clientHeight
  topD = (clientH / 2)
  console.log('clientH', clientH);
  console.log('topD', topD);
};
localBegin()

// 监听窗口
const addResice = () => {
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
defineProps({
  iconMsg: {
    type: Object,
    required: true
  },
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
  addResice()
});

</script>

<template>
  <div>
    <div class="button-div" :style="{ top: topD + 'px' }">
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
    margin: 2% 0;
    .text-div{
      color: @tcolor;
      margin-top: 70%;
    }
  }
}
</style>