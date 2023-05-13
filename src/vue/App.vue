<template>
  <el-tabs v-model="activeName" class="js-api-tabs" tab-position="left" style="height: 100vh" @tab-click="onTabClick">
    <el-tab-pane label="文本对比工具" name="diff" class="dark">
      <JsApiDiff v-if="activeName === 'diff'" />
    </el-tab-pane>
    <!-- 代码格式化工具 -->
    
    <!-- 正则表达式工具 -->
    <el-tab-pane label="信息编解码工具" name="codec" class="dark">
      <JsApiCodec v-if="activeName === 'codec'" />
    </el-tab-pane>
    <!-- 实用密码学工具 -->
    <!-- <el-tab-pane label="App" name="app">
      <JsApiApp />
    </el-tab-pane> -->
    <!-- <el-tab-pane label="OS" name="os">
      <JsApiOs />
    </el-tab-pane> -->
    <!-- <el-tab-pane label="Window" name="window">
      <JsApiWindow />
    </el-tab-pane> -->
    <!-- <el-tab-pane label="Notification" name="notification">
      <JsApiNotification />
    </el-tab-pane> -->
    <!-- <el-tab-pane label="GlobalShortcut" name="globalshortcut">
      <JsApiGlobalShortcut />
    </el-tab-pane> -->
    <!-- <el-tab-pane label="Clipboard" name="clipboard">
      <JsApiClipboard />
    </el-tab-pane> -->
    <!-- <el-tab-pane label="Dialog" name="dialog">
      <JsApiDialog />
    </el-tab-pane> -->
    <!-- <el-tab-pane label="Path" name="path">
      <JsApiPath />
    </el-tab-pane> -->
    <!-- <el-tab-pane label="FS" name="fs">
      <JsApiFs />
    </el-tab-pane> -->
    <!-- <el-tab-pane label="Http" name="http">
      <JsApiHttp />
    </el-tab-pane> -->
  </el-tabs>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted, ref } from "vue";
import { ElTabPane, ElTabs} from 'element-plus'
import { toolDefault } from "./config";
// import JsApiClipboard from "./components/JsApiClipboard.vue";
// import JsApiDialog from "./components/JsApiDialog.vue";
import JsApiCodec from "./components/JsApiCodec.vue";
import JsApiDiff from "./components/JsApiDiff.vue";
// import JsApiFs from "./components/JsApiFs.vue";
// import JsApiPath from "./components/JsApiPath.vue";
// import JsApiHttp from "./components/JsApiHttp.vue";
// import JsApiApp from "./components/JsApiApp.vue";
// import JsApiOs from "./components/JsApiOs.vue";
// import JsApiWindow from "./components/JsApiWindow.vue";
// import JsApiNotification from "./components/JsApiNotification.vue";
// import JsApiGlobalShortcut from "./components/JsApiGlobalShortcut.vue";

const activeName = ref(toolDefault);
const isLoading = ref(false);
const onTabClick = () => {
  console.log('click')
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
};
</script>