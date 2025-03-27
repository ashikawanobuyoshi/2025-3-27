<template>
    <div class="thumbnails-container">
      <div v-for="(image, index) in images" :key="image" class="thumbnail">
        <!-- チェックボタン -->
        <div class="check-button-wrapper">
          <button class="check-button" @click.stop="handleCheck(image)">
            <span v-if="selectedChecks[image]" :style="{ color: selectedChecks[image] }">
              &#10003; <!-- チェックアイコン -->
            </span>
            <span v-else>
              &#9744; <!-- 空のチェックボックス -->
            </span>
          </button>
        </div>
        <!-- サムネイル画像 -->
        <img class="thumbnail-image" :src="`/images/thumbnails/${image}`" alt="サムネイル" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    images: {
      type: Array,
      default: () => []
    },
    selectedChecks: {
      type: Object,
      default: () => ({})
    }
  });
  
  const emits = defineEmits(['toggleCheck']);
  
  const handleCheck = (image) => {
    const currentColor = props.selectedChecks[image] || null;
    let newColor;
    if (!currentColor) {
      newColor = 'red';
    } else if (currentColor === 'red') {
      newColor = 'blue';
    } else if (currentColor === 'blue') {
      newColor = 'green';
    } else {
      newColor = null;
    }
    emits('toggleCheck', image, newColor);
  };
  </script>
  
  <style scoped>
  .thumbnails-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .thumbnail {
    position: relative;
    width: 150px;
    padding: 5px;
    border: 1px solid #ddd;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .check-button-wrapper {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
  }
  
  .check-button {
    background: linear-gradient(145deg, #ffffff, #e6e6e6);
    border: 2px solid #d4d4d4;
    border-radius: 50%;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.8);
    cursor: pointer;
    font-size: 20px;
    width: 40px;
    height: 40px;
    transition: all 0.3s ease;
  }
  
  .check-button:hover {
    background: linear-gradient(145deg, #e6e6e6, #ffffff);
    box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.3), -6px -6px 10px rgba(255, 255, 255, 0.9);
    transform: scale(1.1);
  }
  
  .check-button span {
    font-size: 20px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  
  /* サムネイル画像 */
  .thumbnail-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  </style>