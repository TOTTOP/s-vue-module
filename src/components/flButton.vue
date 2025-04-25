<template>
	<div>
		<div class="button-div" :style="{ left: left + 'px', top: top + 'px' }">
			<div class="icon-content" :style="{ 'background': 'url(' + tb + ') no-repeat' }">
				<div class="text-div" v-text="text"></div>
				<!-- <img src="img/tb.svg" style="height: 100%"/> -->
				<!-- <el-icon-edit style="width: 80%;height: 80%;" /> -->
			</div>
			<!-- <div class="text-content" v-text="text"></div> -->
		</div>
	</div>
</template>

<script>
import tb from '@/assets/icons/right-button.png';
export default {
	props: {
		text: {
			type: String
		}
	},
	name: 'index',
	data() {
		return {
			tb,
			left: 0,
			top: 0,
			clientW: document.documentElement.clientWidth, // 视口宽
			clientH: document.documentElement.clientHeight, // 视口高
		};
	},
	created() {
		// 初始位置
		this.startLocal();
	},
	beforeUnmount() {
		window.onresize = null;
	},
	mounted() {
		// 根据窗口大小变化重新定位
		window.onresize = () => {
			if (!this.timer) {
				this.timer = true;
				const that = this;
				setTimeout(() => {
					that.startLocal();
					that.timer = false;
				}, 200);
			}
		};
	},
	methods: {
		startLocal() {
			this.clientW = document.documentElement.clientWidth;
			this.clientH = document.documentElement.clientHeight;
			this.left = (this.clientW - 97);
			// this.top = (this.clientH / 2 + 84);
			this.top = (this.clientH / 2 - 33);
		}
	}
};
</script>
<style lang="less" scoped>
.button-div {
	position: fixed;
	width: 96px;
	height: 116px;
	color: #6293fd;
	display: flex;
	flex-wrap: wrap;
	text-align: center;
	font-size: 18px;
	cursor: pointer;

	.icon-content {
		width: 100%;
		height: 100%;
		margin: 2% 0;
		// border-radius: 5px 0px 0px 5px;
		.text-div{
			color: #ffffff;
			margin-top: 80%;
		}
	}

	// .text-content {
	// 	width: 100%;
	// 	height: 40%;
	// }
}

// .button-div:hover {
// 	background: #409eff;
// 	color: #ffffff;
// }
</style>
