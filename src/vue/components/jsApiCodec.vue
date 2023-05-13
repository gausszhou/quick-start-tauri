<script setup lang="ts">
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js";
import EncodeUtils from '../../utils/endecode-lib.js';
import he from '../../utils/he.js';
import { onMounted, onUnmounted, ref } from "vue";
import dayjs from "dayjs";

const radio = ref("utf8Encode");

const encodeList = ref([
  {
    label: "URL 编码",
    value: "utf8Encode",
  },
  {
    label: "UTF16 编码",
    value: "utf16Encode",
  },
  {
    label: "Base64 编码",
    value: "base64Encode",
  },
  {
    label: "Hex 编码",
    value: "hexEncode",
  },
  {
    label: "Unicode 编码",
    value: "uniEncode",
  },

]);

const decodeList = ref([
  {
    label: "URL 解码",
    value: "utf8Decode",
  },
  {
    label: "UTF16 解码",
    value: "utf16Decode",
  },
  {
    label: "Base64 解码",
    value: "base64Decode",
  },
  {
    label: "Hex 解码",
    value: "hexDecode",
  },
  {
    label: "Unicode 解码",
    value: "uniDecode",
  },

]);

const otherList = [
  {
    label: "URL 参数解析",
    value: "urlParamsDecode",
  },
  {
    label: "MD5 哈希",
    value: "md5Encode",
  },
  {
    label: "Sha1 哈希",
    value: "sha1Encode",
  },
]

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
  $parent.appendChild($children);
}

const editorConfigDefault = {
  theme: "vs-dark",
  automaticLayout: true, // 自动布局
  folding: true,
};

function createEditor($container: HTMLElement, model: monaco.editor.ITextModel) {
  const editor = monaco.editor.create($container, {
    ...editorConfigDefault,
    wordWrap: "on", // 自动换行
    model: model,
  });
  return editor;
}

function addEditor(editor: monaco.editor.IStandaloneCodeEditor | monaco.editor.IStandaloneDiffEditor) {
  editorList.push(editor);
}

function addEventListener(editor: monaco.editor.IStandaloneCodeEditor) {
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function () {
    console.log("you press down ctrl + s");
  });
}

function processValue(value1: string, type: string) {
  let value2: string = "";
  let flag: string = "success";
  if (value1 === "") return ["", "empty"];
  if (type === "uniEncode") {
    value2 = EncodeUtils.uniEncode(value1);
  } else if (type === "uniDecode") {
    value2 = EncodeUtils.uniDecode(value1.replace(/\\U/g, "\\u"));
  } else if (type === "utf8Encode") {
    value2 = encodeURIComponent(value1);
  } else if (type === "utf8Decode") {
    value2 = decodeURIComponent(value1);
  } else if (type === "utf16Encode") {
    value2 = EncodeUtils.utf8to16(encodeURIComponent(value1));
  } else if (type === "utf16Decode") {
    value2 = decodeURIComponent(EncodeUtils.utf16to8(value1));
  } else if (type === "base64Encode") {
    value2 = EncodeUtils.base64Encode(EncodeUtils.utf8Encode(value1));
  } else if (type === "base64Decode") {
    value2 = EncodeUtils.utf8Decode(EncodeUtils.base64Decode(value1));
  } else if (type === "md5Encode") {
    value2 = EncodeUtils.md5(value1);
  } else if (type === "hexEncode") {
    value2 = EncodeUtils.hexEncode(value1);
  } else if (type === "hexDecode") {
    value2 = EncodeUtils.hexDecode(value1);
  } else if (type === "html2js") {
    value2 = EncodeUtils.html2js(value1);
  } else if (type === "sha1Encode") {
    value2 = EncodeUtils.sha1Encode(value1);
  } else if (type === "htmlEntityEncode") {
    value2 = he.encode(value1, {
      useNamedReferences: true,
      allowUnsafeSymbols: true,
    });
  } else if (type === "htmlEntityFullEncode") {
    value2 = he.encode(value1, {
      encodeEverything: true,
      useNamedReferences: true,
      allowUnsafeSymbols: true,
    });
  } else if (type === "htmlEntityDecode") {
    value2 = he.decode(value1, {
      isAttributeValue: false,
    });
  } else if (type === "urlParamsDecode") {
    let res = EncodeUtils.urlParamsDecode(value1);
    if (res.error) {
      value2 = res.error;
    } else {
      value2 = res;
    }
  } else {
    value2 = "";
    flag = "unrealized";
  }
  return [value2, flag];
}

const code1 = `粘贴需要进行转换的字符串`;
const code2 = ``;
const code3 = ``;
const model1 = createModel(code1, "text/plain");
const model2 = createModel(code2, "text/plain");
const model3 = createModel(code3, "text/plain");
const $container1 = createContainer();
const $container2 = createContainer();
const $container3 = createContainer();
const editor1 = createEditor($container1, model1);
const editor2 = createEditor($container2, model2);
const editor3 = createEditor($container3, model3);
editor2.updateOptions({ readOnly: true });
editor3.updateOptions({
  readOnly: true,
  scrollBeyondLastColumn: 1,
  minimap: {
    // 关闭代码缩略图
    enabled: false, // 是否启用预览图
  },
});
addEventListener(editor1);
addEventListener(editor2);
addEventListener(editor3);
addEditor(editor1);
addEditor(editor2);
addEditor(editor3);

window.oncontextmenu = (e) => {
  e.preventDefault();
};

function addConsole(message: string) {
  const originMessage = editor3.getValue();
  const now = dayjs().format("hh:mm:ss");
  editor3.setValue(now + message + "\n" + originMessage);
}

function excute() {
  const value1 = editor1.getValue();
  const type = radio.value;
  try {
    const [value, flag] = processValue(value1, type);
    editor2.setValue(value as string);
    if (flag === "unrealized") {
      addConsole("\t[WARN]\t" + "Unrealized");
    }
    if (flag === "success") {
      addConsole("\t[INFO]\t" + "Success");
    }
  } catch (error: any) {
    editor2.setValue("");
    addConsole("\t[Error]\t" + error.message);
  }
}

onMounted(() => {
  addContainer(document.getElementById("codec-editor") as HTMLElement, $container1);
  addContainer(document.getElementById("codec-editor") as HTMLElement, $container2);
  addContainer(document.getElementById("codec-console") as HTMLElement, $container3);
});

onUnmounted(() => {
  editorList.forEach((editor) => {
    editor.dispose();
  });
});

editor1.onDidChangeModelContent((e) => {
  excute();
});

const onRadioChange = () => {
  excute();
};

const onRadioClick = (value: string) => {
  radio.value = value;
  onRadioChange();
};
</script>

<template>
  <div id="codec">
    <div id="codec-form">
      <div class="g-menu">
        <div class="g-menu-item" tabindex="0" :class="{ 'is-active': option.value === radio }"
          v-for="option in encodeList" :key="option.value" @click="onRadioClick(option.value)">
          <span class="label">{{ option.label }}</span>
        </div>
        <div class="g-divider"></div>
        <div class="g-menu-item" tabindex="0" :class="{ 'is-active': option.value === radio }"
          v-for="option in decodeList" :key="option.value" @click="onRadioClick(option.value)">
          <span class="label">{{ option.label }}</span>
        </div>
        <div class="g-divider"></div>
        <div class="g-menu-item" tabindex="0" :class="{ 'is-active': option.value === radio }"
          v-for="option in otherList" :key="option.value" @click="onRadioClick(option.value)">
          <span class="label">{{ option.label }}</span>
        </div>
      </div>
    </div>
    <div>
      <div id="codec-editor"></div>
      <div id="codec-console"></div>
    </div>
  </div>
</template>

<style>
#codec {
  width: 100%;
  height: 100%;
  display: flex;
}

#codec-form {
  width: 150px;
  height: 100%;
}

#codec-editor {
  width: calc(100vw - 300px);
  height: calc(100vh - var(--terminal-height));
  display: flex;
}

#codec-console {
  width: calc(100vw - 300px);
  height: var(--terminal-height);
}

#codec-editor .container {
  width: 50%;
  height: 100%;
}

#codec-console .container {
  width: 100%;
  height: 100%;
}
</style>
