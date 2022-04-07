<template>
  <!-- TODO 为什么在div直接使用@scroll绑定事件，事件虽然绑定成功了，但是scroll无法触发
    该问题已经解决。scroll绑定的元素不正确，不应该绑定在.scroll的div上，该div高度定死了
   -->
  <!-- <div
    ref="scrollDivRef"
    :style="{ height: scrollViewHeight + 'px' }"
    class="scroll"
  > -->
  <div :style="{ height: scrollViewHeight + 'px' }">
    <div class="wrap" @scroll.stop="handleScroll($event)">
      <div
        :style="{
          marginTop: scrollViewOffset + 'px',
          height: scrollViewHeight - scrollViewOffset + 'px',
        }"
      >
        <template v-for="item of currentViewList">
          <div class="product" :key="item.index">
            <div>
              <img
                class="product__image"
                src="https://img01.yzcdn.cn/vant/ipad.jpeg"
                alt="商品卡片"
              />
            </div>
            <div class="product__info">
              <div class="product__info__top">
                <div class="product__info__top__title">
                  商品信息-----{{ item.id }}
                </div>
                <div class="product__info__top__tag">规格：一件/500g</div>
              </div>
              <div class="product__info__bottom">
                <div class="card__price">
                  <div>
                    <span class="card__price-currency">¥</span>
                    <span class="card__price-integer">2</span>
                    .
                    <span class="card__price-decimal">00</span>
                  </div>
                </div>
                <div class="product__info__bottom__count">x2</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirtualList',

  data: () => ({
    id: 0,
    /** @name 页面容器高度 */
    SCROLL_VIEW_HEIGHT: 500,

    /** @name 列表项高度 */
    ITEM_HEIGHT: 100,

    /** @name 预加载数量 */
    PRE_LOAD_COUNT: 500 / 100,

    // 初始数量
    sourceData: new Array(5000).fill({}),
    showRange: {
      start: 0,
      end: 10,
    },
  }),
  computed: {
    // 获取列表整体高度
    scrollViewHeight() {
      return this.sourceData.length * this.ITEM_HEIGHT
    },
    scrollViewOffset() {
      return this.ITEM_HEIGHT * this.showRange.start
    },
    // 当前要渲染的列表数
    currentViewList() {
      return this.sourceData
        .slice(this.showRange.start, this.showRange.end)
        .map((el, index) => ({
          data: el,
          index,
          id: this.id++,
        }))
    },
  },
  created() {
    // console.log('this.currentViewList(): ', this.currentViewList)
    // console.log('scrollViewHeight: ', this.scrollViewHeight)
  },
  mounted() {
    // this.handleScroll()
  },

  methods: {
    // 事件监听的回调函数
    // scrollCallback(event) {
    //   console.log('current.scrollTop', event)
    //   console.log('event: ', event)
    // },

    // 滚动事件监听
    handleScroll(event) {
      // TODO绑定scroll事件时，必须指定第三个参数为true，因为利用事件捕获，将本来绑定在父元素的事件绑定到了子元素上。
      // const scrollDivRef = this.$refs['scrollDivRef']
      // scrollDivRef.addEventListener('scroll', this.scrollCallback, true)
      // 已经移除可视区的在上部的item有多少个
      const offset = Math.floor(event.target.scrollTop / this.ITEM_HEIGHT)
      // console.log('offset: ', offset)
      // console.log('event: ', event.target.scrollTop)
      // 可视区的高度
      const viewHeight = event.target?.clientHeight
      // 可视区可以容纳的item数量
      const viewItemSize = Math.ceil(viewHeight / this.ITEM_HEIGHT) + 1
      this.showRange.start =
        offset - this.PRE_LOAD_COUNT > 0 ? offset - this.PRE_LOAD_COUNT : 0
      // console.log('this.showRange.start: ', this.showRange.start)
      this.showRange.end = viewItemSize + offset + this.PRE_LOAD_COUNT
      // console.log('this.showRange.end: ', this.showRange.end)
      // this.currentViewList()
      // console.log('this.currentViewList(): ', this.currentViewList)
      // console.log('scrollViewOffset: ', this.scrollViewOffset)

      // console.log('viewItemSize: ', viewItemSize)
      // console.log('clientHeight: ', event.target.clientHeight)
    },
  },

  beforeDestroy() {
    // const scrollDivRef = this.$refs['scrollDivRef']
    // scrollDivRef.removeEventListener('scroll', this.scrollCallback)
  },
}
</script>

<style scoped>
/* TODO 绑定scroll的元素必须有高度, */
.wrap {
  width: 100%;
  height: 600px;
  overflow: scroll;
}
.product {
  position: relative;
  box-sizing: border-box;
  padding: 8px 16px;
  margin-bottom: 10px;
  color: #323233;
  font-size: 12px;
  background-color: #fafafa;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100px;
}

.product__image {
  display: block;
  width: 88px;
  height: 88px;
}

.product__info {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product__info__top__title {
  max-height: 32px;
  font-weight: 500;
  line-height: 16px;
}

.product__info__top__tag {
  max-height: 20px;
  color: #646566;
  line-height: 20px;
}

.product__info__bottom {
  display: flex;
  justify-content: space-between;
}

.product__info__bottom__count {
  color: #969799;
}

.card__price {
  display: inline-block;
  color: #323233;
  font-weight: 500;
  font-size: 12px;
}

.card__price-currency {
}

.card__price-integer {
  font-size: 16px;
}

.card__price-decimal {
}
</style>
