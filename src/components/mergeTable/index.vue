<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({ msg: String, });

let tableData = ref([
  { a1: '内容1', a2: '内容2', a3: '微信小程序', a4: 'T000010345', a5: 'T1000000148', a6: '220' },
  { a1: '内容1', a2: '内容2', a3: '微信小程序', a4: 'T000010346', a5: 'T1000000149', a6: '80' },
  { a1: '内容1', a2: '内容2', a3: '微信小程序', a4: 'T000010347', a5: 'T1000000150', a6: '20' },
  { a1: '内容1', a2: '内容2', a3: '微信小程序', a4: 'T000010348', a5: 'T1000000151', a6: '180' },
]);

let columns = ref([
  { label: '序号', prop: '', minWidth: 70, type: 'index',},
  { label: '测试1', prop: 'a1', align: 'center' },
  { label: '测试2', prop: 'a2', align: 'center' },
  { label: '数值1', prop: 'a3', align: 'center' },
  { label: '数值2', prop: 'a4', align: 'center' },
  { label: '数值3', prop: 'a5', align: 'center' },
  { label: '合计', prop: 'a6', align: 'center' },
])

// 该函数可以返回一个包含两个元素的数组，第一个元素代表 rowspan，第二个元素代表 colspan。 也可以返回一个键名为 rowspan 和 colspan 的对象。
// 合并行 列
const tableMerge = ({ row, column, rowIndex, columnIndex }) => {
  // 上下
  if (rowIndex % 2 === 0) {
    if (columnIndex === 0) {
      return [1, 2];
    } else if (columnIndex === 1) {
      return [0, 0];
    }
  }

  // console.log(row);
  // console.log(rowIndex);

  // 左右
  // if (columnIndex === 0) {
  //   if (rowIndex % 2 === 0) {
  //     return {
  //       rowspan: 2, // 上下
  //       colspan: 1 // 左右
  //     };
  //   } else {
  //     return {
  //       rowspan: 0,
  //       colspan: 0
  //     };
  //   }
  // }
};

// 单元格样式
const cellTableStyle = () => { };

// 处理 table 数据格式
const handleTableData = () => { };

onMounted(() => {
});
</script>

<template>
  <div>
    <el-table :data="tableData" :span-method="tableMerge" :cell-style="cellTableStyle" ref="tableRef" stripe border
      style="width: 100%;">
      <el-table-column v-for="item in columns" :label="item.label" :prop="item.prop" :key="item.prop"
        :min-width="item.minWidth ? item.minWidth : 80" :align="item.align ? item.align : 'left'" :type="item.type ? item.type : ''"></el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang='less'></style>