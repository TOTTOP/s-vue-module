<template>
  <div>
    <div class="button-div" :style="{ left: leftD + 'px', top: topD + 'px' }">
      <div class="icon-div" :style="{'background': `url(iconImg) no-repeat`}">
        <div class="text-div">{{ iconText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// left top iconImg iconText
// 增加可选择属性，不止有lef 和 top
import { ref, onMounted } from 'vue';
const leftD = ref(0)
const topD = ref(0)

// 视口宽|高
let clientW = ref(document.documentElement.clientWidth)
let clientH = ref(document.documentElement.clientHeight)

localBegin()
const localBegin = () => {
  clientW = document.documentElement.clientWidth
  clientH = document.documentElement.clientHeight
  leftD = (clientW - 97)
  topD = (clientH/2 - 33)
};

// 监听窗口
const addResice = () => {
  window.onresize = () => {
    if (!timer) {
      time = true
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
  iconImg: {
    type: String,
    required: true,
  },
  iconText: {
    type: String,
    required: true,
  }
})

onBeforeUnmount(() => {
  window.onresize = null
})

onMounted(() => {
  addResice()
});

</script>

<style scoped lang='less'>
// button
@bwidth: 96px;
@bheight: 116px;
@bcolor: #6293fd;
@bsize: 18px;
// text
@tcolor: #ffffff;
.button-div{
  position: fixed;
  width: bwidth;
  height: bheight;
  color: bcolor;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  font-size: bsize;
  cursor: pointer;
  .icon-div{
    width: 100%;
    height: 100%;
    margin: 2% 0;
    .text-div{
      color: tcolor;
      margin-top: 80%;
    }
  }
}
</style>