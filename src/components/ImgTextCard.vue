<template>
  <div class="img-text-card">
    <div class="img-text-card-item img-text-card-img">
      <div class="" :style="{backgroundImage: 'url(' + dataImgTextObj.img + ')'}"></div>
    </div>
    <div class="card-drop-down-menu">
      <div class="card-drop-down-menu-content"></div>
    </div>
    <div class="cart-title img-text-card-item prim-text">
      <p class="">{{dataImgTextObj.title}}</p>
    </div>
    <div class="cart-info img-text-card-item common-text">
      <p>{{dataImgTextObj.info}}</p>
      <div class="cart-sub img-text-card-item sub-text">
        <p>{{dataImgTextObj.sub}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ImgTextCard',
    props: {
      dataImgTextObj: Object,
    }
  }
</script>

<style lang="scss" scoped>
  .img-text-card {
    margin: 1rem 0.5rem;
  }

  .card-drop-down-menu {
    width: 16rem;
    height: 100%;
    position: absolute;
    top: 0;
  }

  .card-drop-down-menu-content {
    width: 100%;
    height: 0;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: all 0.5s ease 0.1s;
  }

  .card-drop-down-menu:hover .card-drop-down-menu-content {
    height: 10rem;
    opacity: 1;
  }
</style>
