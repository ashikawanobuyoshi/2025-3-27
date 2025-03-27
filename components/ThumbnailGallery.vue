<template>
  <div class="thumbnails-container">
    <div
      v-for="(image, index) in images"
      :key="image"
      class="thumbnail"
    >
      <!-- 絶対配置のチェックボタンラッパー -->
      <div class="check-button-wrapper">
        <button class="check-button" @click.stop="handleCheck(image)">
          <!-- 選択済みならチェックアイコン（立体的ボタンで色が変わる） -->
          <span v-if="selectedChecks[image]" :style="{ color: selectedChecks[image] }">
            &#9745;
          </span>
          <span v-else>
            &#9744;
          </span>
        </button>
      </div>
      <!-- サムネイル画像 -->
      <img
        class="thumbnail-image"
        :src="`/images/thumbnails/${image}`"
        @click="handleClick(image)"
        alt="サムネイル"
      />
      <!-- 画像番号 -->
      <div class="image-number">{{ index + 1 }}</div>
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

const emits = defineEmits(['imageClick', 'toggleCheck']);

// 画像クリックイベントを通知
const handleClick = (image) => {
  emits('imageClick', image);
};

// チェック状態の切替処理（未選択 → red → blue → yellow → 未選択）
// 例：チェック状態の切替処理（未選択 → red → blue → green → 未選択）
const handleCheck = (image) => {
  const currentColor = props.selectedChecks[image] || null;
  let newColor;
  if (!currentColor) {
    newColor = 'red';
  } else if (currentColor === 'red') {
    newColor = 'blue';
  } else if (currentColor === 'blue') {
    newColor = 'green';  // yellowの代わりにgreenを使用
  } else {
    newColor = null;
  }
  emits('toggleCheck', image, newColor);
};
</script>

<style scoped>
.thumbnails-container {
  display: flex;
  flex-wrap: nowrap;   /* 横スクロールの場合 */
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.thumbnail {
  position: relative;
  flex: 0 0 auto;
  width: 150px;
  padding: 5px;
  border: 1px solid #ddd;
  overflow: hidden;
}

/* チェックボタンラッパー（絶対配置） */
.check-button-wrapper {
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 10;
  width: 32px;
  height: 32px;
}

/* 立体感のあるチェックボタン */
.check-button {
  background: linear-gradient(145deg, #fafafa, #eaeaea);
  border: 2px solid #ff5722; /* お好みで色を調整 */
  border-radius: 0%;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.2),
              -4px -4px 5px rgba(255, 255, 255, 0.8);
  cursor: pointer;
  font-size: 26px;
  line-height: 32px;
  padding: 0;
  transition: transform 0.2s, box-shadow 0.2s;
}

.check-button:hover {
  transform: scale(1.1);
  box-shadow: 6px 6px 8px rgba(0, 0, 0, 0.3),
              -6px -6px 8px rgba(255, 255, 255, 0.9);
}

/* サムネイル画像 */
.thumbnail-image {
  display: block;
  width: 100%;
  height: auto;
}

/* 画像番号 */
.image-number {
  text-align: center;
  margin-top: 4px;
  font-size: 12px;
  color: #666;
}
</style>