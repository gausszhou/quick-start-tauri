<template>
  <div id="codec">
    <div id="codec-form">
      <div class="block">
        <el-button color="#626aef" @click="onConvertButtonClick">转换</el-button>
        <el-button type="warning" @click="onClearButtonClick">清空</el-button>
      </div>
      <el-radio-group v-model="radio" @change="onRadioChange">
        <div class="block">
          <div class="row" v-for="option in encodeList" :key="option.value">
            <el-radio :label="option.value">{{ option.label }}</el-radio>
          </div>
          <div class="row" v-for="option in decodeList" :key="option.value">
            <el-radio :label="option.value">{{ option.label }}</el-radio>
          </div>
        </div>
      </el-radio-group>
    </div>
    <div id="codec-editor">
    </div>
  </div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js";
import { onMounted, onUnmounted, ref } from "vue";
import Monokai from "../config/Monokai.json";
import { ElMessage, ElNotification } from "element-plus";
monaco.editor.defineTheme('Monokai', Monokai as monaco.editor.IStandaloneThemeData)
monaco.editor.setTheme('Monokai')

const radio = ref('utf8Encode')

const encodeList = ref([
  {
    label: 'URL编码',
    value: 'utf8Encode'
  },
  {
    label: 'UTF16编码',
    value: 'utf16Encode'
  },
  {
    label: 'Base64编码',
    value: 'base64Encode'
  },
  {
    label: 'Hex编码',
    value: 'hexEncode'
  },
  {
    label: 'Unicode编码',
    value: 'uniEncode'
  },
  {
    label: 'MD5哈希',
    value: 'md5Encode'
  },
  {
    label: 'Sha1哈希',
    value: 'sha1Encode'
  },
])

const decodeList = ref([
  {
    label: 'URL解码',
    value: 'utf8Decode'
  },
  {
    label: 'UTF16编码',
    value: 'utf16Decode'
  },
  {
    label: 'Base64解码',
    value: 'base64Decode'
  },
  {
    label: 'Hex解码',
    value: 'hexDecode'
  },
  {
    label: 'Unicode解码',
    value: 'uniDecode'
  },
  {
    label: 'URL参数解析',
    value: 'urlParamsDecode'
  },
])


// 初始化变量
let fileCounter = 0;
const editorList: any[] = [];

function createModel(value: string, language: string) {
  const model = monaco.editor.createModel(value, language);
  return model;
}

function createContainer() {
  const $container = document.createElement("div");
  $container.id = "container-" + fileCounter.toString(10);
  $container.className = "container";
  fileCounter += 1; // id++
  return $container;
}

function addContainer($parent: HTMLElement, $children: HTMLElement) {
  $parent.appendChild($children)
}

const editorConfigDefault = {
  theme: "vs-dark",
  automaticLayout: true, // 自动布局
  folding: true,
};

function createEditor(
  $container: HTMLElement,
  model: monaco.editor.ITextModel
) {
  const editor = monaco.editor.create($container, {
    ...editorConfigDefault,
    wordWrap: 'on', // 自动换行
    model: model,
  });
  return editor;
}

function addEditor(
  editor:
    | monaco.editor.IStandaloneCodeEditor
    | monaco.editor.IStandaloneDiffEditor
) {
  editorList.push(editor);
}

function addEventListener(editor: monaco.editor.IStandaloneCodeEditor) {
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function () {
    console.log("you press down ctrl + s");
  });
}

function processValue(value1: string, type: string) {
  if (value1 === '') return '';
  let value2 = '';
  if (type === 'utf8Encode') {
    value2 = encodeURI(value1)
  }
  if (type === 'utf8Decode') {
    value2 = decodeURI(value1)
  }
  if (type === 'base64Encode') {
    value2 = window.btoa(value1)
  }
  if (type === 'base64Decode') {
    value2 = window.btoa(value1)
  }
  if (value2 === '') {
    ElNotification.info({
      title: 'Info',
      message: '暂未实现',
      position: 'bottom-right'
    })
  }
  return value2
}

const code1 = `粘贴需要进行转换的字符串`;
const code2 = ``;

const model1 = createModel(code1, "text/plain");
const model2 = createModel(code2, "text/plain");
const $container1 = createContainer();
const $container2 = createContainer();
const editor1 = createEditor($container1, model1);
const editor2 = createEditor($container2, model2);
editor2.updateOptions({ readOnly: true, })
addEventListener(editor1)
addEventListener(editor2)
addEditor(editor1);
addEditor(editor2);

const clear = () => {
  editor1.setValue('')
}

const excute = () => {
  const value1 = editor1.getValue();
  const type = radio.value
  try {
    const value2 = processValue(value1, type)
    editor2.setValue(value2);
    if (value2 ==='') return false;
    ElNotification.success({
      title: 'Succes',
      message: '转换成功',
      position: 'bottom-right'
    })
  } catch (error: any) {
    editor2.setValue(error.message as string);
    ElNotification.error({
      title: 'Error',
      message: '转换错误',
      position: 'bottom-right'
    })
  }
}

onMounted(() => {
  addContainer(document.getElementById("codec-editor") as HTMLElement, $container1)
  addContainer(document.getElementById("codec-editor") as HTMLElement, $container2)
});

onUnmounted(() => {
  editorList.forEach((editor) => {
    editor.dispose();
  });
});

// editor1.onDidChangeModelContent(e => {
//   excute()
// })

const onRadioChange = () => {
  excute()
}
const onConvertButtonClick = () => {
  excute()
}
const onClearButtonClick = () => {
  clear()
}

</script>

<style>
#codec {
  width: 100%;
  height: 100%;
  display: flex;
}

#codec-form {
  height: 100%;
}

#codec-form .block {
  width: 160px;
  border-top: 1px solid #f5f7fa;
}

#codec-form .block:first-of-type {
  border-top: 1px solid transparent;
}

#codec-editor {
  width: calc(100vw - 320px);
  height: calc(100vh - 30px);
  display: flex;
}

#codec-editor .container {
  width: 50%;
  height: 100%;
}
</style>