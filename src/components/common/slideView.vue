<template>
  <transition name="slide-fade" class="box">
    <el-card v-loading="loading"
             class="particulars-common"
             :style="{ 'z-index': zIndex,'border-radius': '0px' }">
      <div slot="header">
        <slot name="header"></slot>
      </div>
      <slot></slot>
    </el-card>
  </transition>
</template>

<script>
  import {getMaxIndex} from '@/util'
  export default {
    components: {},
    mounted() {
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    },
    props: {
      appendToBody: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        zIndex: getMaxIndex(),
        loading:false,
      }
    },
    methods: {
      init(){

      },
      closeBtn() {
        this.$emit('close')
      },
    },
    beforeDestroy() {
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    },
    watch: {}

  };
</script>


<style lang="scss" scoped>
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    will-change: transform;
    transition: all 0.35s ease;
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(100%);
  }

  .display-flex {
    display: flex;
  }

  .particulars-common /deep/ .el-card__body {
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
      padding-bottom: 90px;
  }

  .tip {
    position: fixed;
    right: 0px;
    width: 926px;
    bottom: 0;
    overflow: hidden;
    margin-top: 50px;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #e6e6e6;
    background: #fff;
    color: #999;
    z-index: 9;
    span {
      margin-left: 55px;
    }
  }

  .particulars-common {
    position: fixed;
    top: 39px;
    right: 0px;
    width: 926px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .clear-fix {
      overflow: auto;
    }
  }

</style>
