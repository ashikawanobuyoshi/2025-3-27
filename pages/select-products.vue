<template>
    <div>
      <h1>商品選択</h1>
      <div class="gallery">
        <img
          v-for="photo in photos"
          :key="photo.id"
          :src="photo.url"
          @click="selectPhoto(photo)"
        />
      </div>
      <div v-if="selectedPhoto">
        <h2>選択された写真</h2>
        <img :src="selectedPhoto.url" />
        <h3>選択可能な商品</h3>
        <div v-for="product in products" :key="product.id">
          <div v-if="product.商品ID === selectedPhoto.id">
            <h4>{{ product.商品名 }}</h4>
            <p>{{ product.商品詳細 }}</p>
            <ul>
              <li>{{ product.データ種類1 }}: {{ product.価格1 }}円</li>
              <li>{{ product.データ種類2 }}: {{ product.価格2 }}円</li>
              <li>{{ product.データ種類3 }}: {{ product.価格3 }}円</li>
              <li>{{ product.データ種類4 }}: {{ product.価格4 }}円</li>
            </ul>
            <button @click="addToCart(product)">カートに追加</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const photos = ref([]);
  const products = ref([]);
  const selectedPhoto = ref(null);
  
  //APIエンドポイントのURL
  const photoApiUrl = '写真ギャラリーのAPIエンドポイント';
  const productApiUrl = 'データ販売商品のAPIエンドポイント';
  
  onMounted(async () => {
    // 写真ギャラリーのAPIから写真データを取得
    const photoResponse = await fetch(photoApiUrl);
    photos.value = await photoResponse.json();
  
    // データ販売商品のAPIから商品データを取得
    const productResponse = await fetch(productApiUrl);
    products.value = await productResponse.json();
  });
  
  const selectPhoto = (photo) => {
    selectedPhoto.value = photo;
  };
  
  const addToCart = (product) => {
    // カートに追加する処理を実装
    console.log('カートに追加:', product);
  };
  </script>
  
  <style scoped>
  .gallery {
    display: flex;
    flex-wrap: wrap;
  }
  .gallery img {
    width: 200px;
    height: auto;
    margin: 10px;
    cursor: pointer;
  }
  </style>