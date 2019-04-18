<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:500');

.pornhub
  display flex
  flex-direction  column
  align-items center
.box
    display flex
    align-items center
    justify-content center
    width 400px
    height 400px
    background-color #F4F4F0
    border 0px 
    border-radius 0px
    max-width 100%
    .editarea
        display flex
        align-items center
        justify-content center
        text-align center
        font-size 4px
        .prefix
            //font-family 'Roboto'
            //font-weight lighter 
            letter-spacing 2px
            background-color #96B2B3
            color #fff
            padding-top 10px
            padding-bottom 10px
            padding-left 25px
            padding-right 25px
        .postfix
            //font-family 'Montserrat-ExtraBold'
            font-weight bold
            letter-spacing 2px
            background-color #457FBC
            color #fff
            padding-top 10px
            padding-bottom 10px
            padding-left 25px
            padding-right 25px
            border-radius 0px

// customize things
.customize
  display flex
  justify-content space-around
  width 100%
  margin-bottom 50px
  .customize-color > div,
  .customize-misc > div
    padding 8px 0

// download and share buttons
.download-share
  display flex
  justify-content space-around
  width 80%
  & > div
      width 100px
      height 40px
      border-radius 3px
      line-height 40px
      text-align center
      cursor pointer
  .download
      color #fff
      background #D9581D
      border-radius 10px
  .share
    color #fff
    background #1da1f2
    border-radius 10px
</style>

<template>
  <div class="pornhub">
    <div
      class="box"
      id="cover"
      v-tooltip="{
        content: '试着修改下面的字体部分',
        show: true,
        classes: 'tooltipClasses',
      }"
    >
      <div
        class="editarea"
        id="logo"
        :style="{ 'font-size': fontSize + 'px', 'background-color': transparentBgColor }"
      >
        <template v-if="!reverseHighlight">
          <span class="prefix" :style="{ color: prefixColor, 'background-color': prefixBgColor}" contenteditable spellcheck="false">{{
            prefixText
          }}</span>
          <span
            class="postfix"
            :style="{ color: suffixColor, 'background-color': postfixBgColor }"
            contenteditable
            spellcheck="false"
            >{{ suffixText }}</span
          >
        </template>
        <template v-else>
          <span
            class="postfix"
            :style="{ color: suffixColor, 'background-color': postfixBgColor }"
            contenteditable
            spellcheck="false"
            >{{ prefixText }}</span
          >
          <span class="prefix" :style="{ color: prefixColor }" contenteditable spellcheck="false">{{
            suffixText
          }}</span>
        </template>
      </div>
    </div>

    <div class="customize">
      <div
        class="customize-color"
        id="prefixColor"
        v-tooltip="{ content: '你可以在这改变样式', show: true, classes: 'tooltipClasses' }"
      >
        <div>前 Font 颜色: &nbsp; <input type="color" v-model="prefixColor" /></div>
        <div>后 Font 颜色: &nbsp; <input type="color" v-model="suffixColor" /></div>
        <div>前 Badge 颜色: &nbsp; <input type="color" v-model="prefixBgColor" /></div>
        <div>后 Badge 颜色: &nbsp; <input type="color" v-model="postfixBgColor" /></div>
        <!-- <div>
          Transparent Background: &nbsp;
          <input type="checkbox" value="transparentBg" v-model="transparentBg" />
        </div> -->
      </div>

      <!-- <div class="customize-misc">
        <div>
          Font Size: <input type="range" min="30" max="200" v-model="fontSize" /> {{ fontSize }}px
        </div>
        <div>Reverse Highlight: <input type="checkbox" v-model="reverseHighlight" /></div>
      </div> -->
    </div>

    <div class="download-share">
      <div
        class="download"
        v-tooltip="{ content: 'Click here to export!', show: true, classes: 'tooltipClasses' }"
        @click="download"
      >
        Download
      </div>

      <div class="share" @click="twitter"><i class="iconfont icon-twitter"></i> Tweet</div>
    </div>
  </div>
</template>

<script>
import domtoimage from 'dom-to-image'
const FileSaver = require('file-saver')

export default {
  name: 'pornhub',
  data() {
    return {
      prefixColor: '#ffffff',
      suffixColor: '#ffffff',
      prefixBgColor: '#96B2B3',
      postfixBgColor: '#457FBC',
      fontSize: '10',
      transparentBg: false,
      reverseHighlight: false,
      prefixText: 'Made with',
      suffixText: 'LOVE',
    }
  },
  mounted: function() {
    //   this.$tours['pornhub'].start()
  },
  methods: {
    download() {
      var node = document.getElementById('cover')

      domtoimage.toPng(node).then(function(blob) {
        FileSaver.saveAs(blob, 'WeBadge.png')
      })
    },
    twitter() {
      this.$ga.event('social', 'action', 'twitter', 1)
      let url = 'https://logoly.pro'
      let text = encodeURIComponent(`Built with #WeBadge, by @yiukuenchu ${url}`)
      window.open(`https://twitter.com/intent/tweet?text=${text}`)
    },
  },
  // computed: {
  //   transparentBgColor() {
  //     if (this.transparentBg) {
  //       return 'transparent'
  //     } else {
  //       return '#000000'
  //     }
  //   },
  // },
}
</script>
