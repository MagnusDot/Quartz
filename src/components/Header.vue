<template>
<nav class="flex items-center justify-between flex-wrap bg-backgroundSecondary drag">
  <div class="w-full flex justify-end">
    <div>
      <a v-on:click="minimize" class="inline-block text-sm px-4 py-2 leading-none text-gray-500 hover:text-white hover:bg-gray-600 lg:mt-0 no-drag"><MinimizeIcon/></a>
      <a v-on:click="maximize" class="inline-block text-sm px-4 py-2 leading-none text-gray-500 hover:text-white hover:bg-gray-600 lg:mt-0 no-drag">
        <ResizeIcon v-if="maximized"/>
        <Fullscreen v-if="maximized === false"/>
      </a>
      <a v-on:click="close" class="inline-block text-sm px-4 py-2 leading-none text-gray-500 hover:text-white hover:bg-red-800 lg:mt-0 no-drag"><CloseIcon/></a>
    </div>
  </div>
</nav>
</template>


<script setup>
  import {ipcRenderer} from 'electron';
  import CloseIcon from 'vue-material-design-icons/Close.vue';
  import MinimizeIcon from 'vue-material-design-icons/Minus.vue';
  import ResizeIcon from 'vue-material-design-icons/Resize.vue';
  import Fullscreen from 'vue-material-design-icons/CheckboxBlankOutline.vue';

  import { ref } from 'vue'

  let maximized = ref(false);

  function close(){
    ipcRenderer.send('hide-me')
  }

  function minimize()
  {
    ipcRenderer.send('minimize-me')
  }

  function maximize()
  {
    ipcRenderer.send('maximize-me');
    maximized.value = !maximized.value;
    console.log(maximized.value);
  }
</script>