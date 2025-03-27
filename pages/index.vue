<template>
    <div>
      <!-- 左右の画像表示モニター -->
      <div class="monitors">
        <div class="monitor left">
          <h3>左モニター</h3>
          <img
            v-if="leftImage"
            :src="`/images/original/${leftImage}`"
            alt="左に表示する画像"
          />
        </div>
        <div class="monitor right">
          <h3>右モニター</h3>
          <img
            v-if="rightImage"
            :src="`/images/original/${rightImage}`"
            alt="右に表示する画像"
          />
        </div>
      </div>
  
      <!-- 下部のサムネイルギャラリー -->
      <div class="thumbnail-galleries">
        <!-- 左側用サムネイルギャラリー -->
        <div class="slider-gallery">
          <ThumbnailGallery
            :images="images"
            :selectedChecks="selectedChecks"
            @imageClick="handleLeftImageClick"
            @toggleCheck="toggleCheck"
          />
        </div>
        <!-- 右側用サムネイルギャラリー -->
        <div class="slider-gallery">
          <ThumbnailGallery
            :images="images"
            :selectedChecks="selectedChecks"
            @imageClick="handleRightImageClick"
            @toggleCheck="toggleCheck"
          />
        </div>
      </div>
  
      <!-- チェック済み画像をエクスポートするボタン -->
      <button @click="exportImages">チェック済み画像をエクスポート</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ThumbnailGallery from '~/components/ThumbnailGallery.vue';
  
  const images = ref([]);
  const leftImage = ref(null);
  const rightImage = ref(null);
  const selectedChecks = ref({});
  
  // API から画像一覧を取得
  const fetchImages = async () => {
    try {
      const res = await $fetch('/api/images');
      images.value = res;
    } catch (error) {
      console.error('画像の取得に失敗:', error);
    }
  };
  fetchImages();
  
  // 左のサムネイルギャラリーから画像選択時のハンドラー
  const handleLeftImageClick = (image) => {
    leftImage.value = image;
  };
  
  // 右のサムネイルギャラリーから画像選択時のハンドラー
  const handleRightImageClick = (image) => {
    rightImage.value = image;
  };
  
  // チェックマークの状態を切り替え
  const toggleCheck = (image, color) => {
    if (color) {
      selectedChecks.value[image] = color;
    } else {
      delete selectedChecks.value[image];
    }
  };
  
  // エクスポート処理：チェック済みの画像を別フォルダーにコピー
  const exportImages = async () => {
    const selectedImages = Object.keys(selectedChecks.value);
    if (selectedImages.length === 0) {
      alert('チェック済み画像がありません');
      return;
    }
    try {
      await $fetch('/api/exportImages', {
        method: 'POST',
        body: { selectedImages }
      });
      alert('画像がエクスポートされました');
    } catch (error) {
      console.error('エクスポートに失敗:', error);
      alert('エクスポートに失敗しました');
    }
  };
  </script>
  
  <style scoped>
  .monitors {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  
  .monitor {
    width: 45%;
    text-align: center;
  }
  
  .monitor img {
    max-width: 100%;
    height: auto;
  }
  
  .thumbnail-galleries {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  
  .slider-gallery {
    width: 45%;
  }
  </style>