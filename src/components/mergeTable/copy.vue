<template>
  <div class="">
    <el-table ref="mutipleTable" border stripe :data="tableData" style="width: 100%" :span-method="objectSpanMethod"
      :cell-style="cellStyle">
      <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"
        :min-width="item.minWidth" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 需要动态合并列的配置（一般是由接口返回来，看自己需要）
      hangLabels: {
        // 要合并的第几行
        hang5: {
          // 要合并的表头，要跟前端对应上
          labels: ['测试3', '测试4', '测试5', '测试6', '测试7'],
          // 要合并的单元格
          subtotals: ['微信小程序小计：', '支付宝小程序小计：'],
          // 要合并的单元格的接口返回字段
          attr: 'a3'
        },
        hang6: {
          labels: ['测试2', '测试3', '测试4', '测试5', '测试6', '测试7'],
          subtotals: ['小合计：', '小合计1：'],
          attr: 'a2'
        },
        hang7: {
          labels: ['测试1', '测试2', '测试3', '测试4', '测试5', '测试6', '测试7'],
          subtotals: ['大合计：'],
          attr: 'a1'
        }
      },
      // 表头配置
      columns: [
        {
          prop: 'a1',
          minWidth: '150px',
          label: '测试1'
        },
        {
          prop: 'a2',
          minWidth: '150px',
          label: '测试2'
        },
        {
          prop: 'a3',
          minWidth: '150px',
          label: '测试3'
        },
        {
          prop: 'a4',
          minWidth: '150px',
          label: '测试4'
        },
        {
          prop: 'a5',
          minWidth: '150px',
          label: '测试5'
        },
        {
          prop: 'a6',
          minWidth: '150px',
          label: '测试6'
        },
        {
          prop: 'a7',
          minWidth: '120px',
          label: '测试7'
        },
        {
          prop: 'a8',
          minWidth: '120px',
          label: '测试8'
        },
        {
          prop: 'a9',
          minWidth: '120px',
          label: '测试9'
        },
        {
          prop: 'a10',
          minWidth: '120px',
          label: '测试10'
        },
        {
          prop: 'a11',
          minWidth: '120px',
          label: '测试11'
        }
      ],
      // 接口返回数据
      tableData: [
        {
          a1: '内容1',
          a2: '内容2',
          a3: '微信小程序',
          a4: 'T000010345',
          a5: 'T1000000148',
          a6: '内容3',
          a7: '220',
          a8: '43'
        },
        {
          a1: '内容1',
          a2: '内容2',
          a3: '微信小程序',
          a4: 'T000010346',
          a5: 'T1000000149',
          a6: '内容4',
          a7: '80',
          a8: '5'
        },
        {
          a1: '内容1',
          a2: '内容2',
          a3: '微信小程序小计：',
          a4: '微信小程序小计：',
          a5: '微信小程序小计：',
          a6: '微信小程序小计：',
          a7: '微信小程序小计：',
          a8: '44'
        },
        {
          a1: '内容1',
          a2: '小合计：',
          a3: '小合计：',
          a4: '小合计：',
          a5: '小合计：',
          a6: '小合计：',
          a7: '小合计：',
          a8: '76'
        },
        {
          a1: '内容1',
          a2: '内容5',
          a3: '支付宝小程序',
          a4: 'T000010188',
          a5: 'T1000000170',
          a6: '内容6',
          a7: '220',
          a8: '43'
        },
        {
          a1: '内容1',
          a2: '内容5',
          a3: '支付宝小程序',
          a4: 'T000010189',
          a5: 'T1000000145',
          a6: '内容7',
          a7: '220',
          a8: '43'
        },
        {
          a1: '内容1',
          a2: '小合计1：',
          a3: '小合计1：',
          a4: '小合计1：',
          a5: '小合计1：',
          a6: '小合计1：',
          a7: '小合计1：',
          a8: '76'
        },
        {
          a1: '大合计：',
          a2: '大合计：',
          a3: '大合计：',
          a4: '大合计：',
          a5: '大合计：',
          a6: '大合计：',
          a7: '大合计：',
          a8: '56'
        }
      ],
      // 统计合并多少行
      needMergeArr: ['a1', 'a2', 'a3'], // 有合并项的列
      rowMergeArrs: {} // 包含需要一个或多个合并项信息的对象
    }
  },
  mounted() {
    // 请求接口
    this.getList()
  },

  updated() {
    // 每次更新会重新对 Table 进行重新布局
    this.$nextTick(() => {
      if (this.$refs.mutipleTable !== undefined) {
        this.$refs.mutipleTable.doLayout()
      }
    })
  },
  methods: {
    // 请求接口
    getList() {
      // 处理合并行数据
      this.rowMergeArrs = this.rowMergeHandle(this.needMergeArr, this.tableData)
    },
    // 单元格样式，主要是针对要合并列的第一个单元格（有其他需要的可自行更改）
    cellStyle({ row, column }) {
      for (const { labels, subtotals, attr } of Object.values(this.hangLabels)) {
        const columnIndex = labels.indexOf(column.label)
        if (columnIndex !== -1 && subtotals.includes(row[attr])) {
          if (columnIndex === 0) {
            return { 'text-align': 'left' }
          }
        }
      }
      return {} // 默认返回空样式
    },
    /**
 * @description 实现合并行或列
 * @param row:Object 需要合并的列name 如:'name' 'id'
 * @param column:Object 当前行的行数，由合并函数传入
 * @param rowIndex:Number 当前列的数据，由合并函数传入
 * @param columnIndex:Number 当前列的数据，由合并函数传入
 *
 * @return 函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，
 * 第二个元素代表colspan。 也可以返回一个键名为rowspan和colspan的对象
 */
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 合并列
      for (const { labels, subtotals, attr } of Object.values(this.hangLabels)) {
        const columnIndex = labels.indexOf(column.label)
        if (columnIndex !== -1 && subtotals.includes(row[attr])) {
          return columnIndex === 0 ? [1, labels.length] : [0, 0]
        }
      }

      // 合并行
      for (const key in this.rowMergeArrs) {
        if (column.property == key) {
          const _row = this.rowMergeArrs[key].rowArr[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return [_row, _col]
        }
      }
    },
    /** 
* @description 根据数组将指定对象转化为相应的数组
* @param arr:Array[String] 必填 必须是字符串形式的数组
* @param data:Array 必填 需要转化的对象
*/
    rowMergeHandle(arr, data) {
      if (!Array.isArray(arr) && !arr.length) return false
      if (!Array.isArray(data) && !data.length) return false
      const needMerge = {}
      arr.forEach(i => {
        needMerge[i] = {
          rowArr: [],
          rowMergeNum: 0
        }
        data.forEach((item, index) => {
          if (index === 0) {
            needMerge[i].rowArr.push(1)
            needMerge[i].rowMergeNum = 0
          } else {
            if (item[i] === data[index - 1][i]) {
              needMerge[i].rowArr[needMerge[i].rowMergeNum] += 1
              needMerge[i].rowArr.push(0)
            } else {
              needMerge[i].rowArr.push(1)
              needMerge[i].rowMergeNum = index
            }
          }
        })
      })
      return needMerge
    }
  }
}
</script>