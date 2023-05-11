<template>
  <div id="diff">
    <div id="diff-editor"></div>
  </div>
</template>
<script lang="ts" setup>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js";
import { onMounted, onUnmounted } from "vue";

import Monokai from "../config/Monokai.json";

monaco.editor.defineTheme('Monokai', Monokai as monaco.editor.IStandaloneThemeData)
monaco.editor.setTheme('Monokai')

// 初始化变量
let fileCounter = 0;
const editorList: any[] = [];

function createModel(value: string, language: string) {
  const model = monaco.editor.createModel(value, language);
  return model;
}

const editorConfigDefault = {
  theme: "vs-dark",
  automaticLayout: true, // 自动布局
  folding: true,
};


function createDiffEditor($container: HTMLElement) {
  const editor = monaco.editor.createDiffEditor($container, {
    foldingStrategy: "indentation",
    autoClosingOvertype: "always",
    autoIndent: "full",
    ...editorConfigDefault,
    theme: "vs-dark",
    diffAlgorithm: "advanced",
    originalEditable: true, // for left pane
    readOnly: false,  // for right pane
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

const code1 = `// 这里是注释
function main() { 
   console.log("Hello world!");
}`;
const code2 = `// 这里是注释
function main() { 
   console.log("Hello World!");
}`;

onMounted(() => {
  console.log('onMounted');
  const originalModel = createModel(code1, "javascript");
  const modifiedModel = createModel(code2, "javascript");
  const $container = document.getElementById("diff-editor") as HTMLElement;
  const editorDiff = createDiffEditor($container);
  editorDiff.setModel({
    original: originalModel,
    modified: modifiedModel,
  });
  addEditor(editorDiff);
  editorDiff.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
    function () {
      console.log('you press down ctrl + s')
    }
  );
});
onUnmounted(() => {
  console.log('onUnmounted')
  editorList.forEach((editor) => {
    editor.dispose();
  });
});
</script>

<style>
#diff-editor {
  width: 100%;
  height: calc(100vh - 30px);
}
</style>