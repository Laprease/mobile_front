<template>
  <div class="my_warp app_content">

    <!-- 导航栏 -->
    <div class="header_body">
      <header-nav :leftArrow="false" titelText="我的"></header-nav>
    </div>

    <!-- 中间 -->
    <div class="warp_body">
      <div class="user-info-box">
        <van-icon name="setting-o" class="mgt-icon" @click="setting" />

        <van-row gutter="20">
          <van-col span="4">
            <van-image
              round
              width="60"
              height="60"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
          <van-col span="20">
            <div class="right-box">
              <div class="name-text">昵称</div>
              <div class="sign-text">签名</div>
            </div>
          </van-col>
        </van-row>
      </div>

      <div style="margin: 10px">
        <van-grid square>
          <van-grid-item
            v-for="(item, index) in data?.orderTab"
            :icon="item.icon"
            :text="item.text"
            :key="index"
          >
          </van-grid-item>
        </van-grid>
      </div>
      <div style="display: flex; ">
        <div @click="goToRouter" style="display: flex;justify-content: center;flex-direction: column; text-align: center;margin: 10px;">
          <van-icon name="newspaper-o" />
          <div style="font-size: 12px;">动态路由配置</div>
        </div>
        <div @click="changeLang" style="display: flex;justify-content: center;flex-direction: column; text-align: center;margin: 10px;">
          <van-icon name="exchange" />
          <div style="font-size: 12px;">切换语言</div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="footer_body">
      <footer-nav></footer-nav>
    </div>
  </div>
</template>

<script setup name="My">
const { locale } = useI18n()
const router = useRouter();
const data = reactive({
  orderTab: [
    {
      icon: "send-gift-o",
      text: "待付款",
    },
    {
      icon: "send-gift-o",
      text: "待发货",
    },
    {
      icon: "todo-list-o",
      text: "待收货",
    },
    {
      icon: "point-gift-o",
      text: "待评价",
    },
  ],
}); // tab
const setting = () => {
  router.push({ name: "setting" });
};

// 跳转动态路由
const goToRouter = () => {
  router.push({ name: "testPage" });
};

// 切换语言
const changeLang = ()=>{
  locale.value = locale.value === 'en' ? 'zh' : 'en'
}

</script>
<style lang="less">
.app_content {
  display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
	background-color: #f4f4f4;
  .user-info-box {
    position: relative;
    margin: 10px;
    padding: 10px 20px 10px 10px;
    background: #fff;
    border-radius: 6px;
    font-size: 14px;
    color: #aaa;
    .right-box {
      display: flex;
      flex-direction: column;
      height: 100%;
      .name-text {
        margin: auto auto auto 10px;
      }
      .sign-text {
        margin: auto auto auto 10px;
      }
    }
    .mgt-icon {
      position: absolute;
      right: 10px;
    }
  }
}
</style>