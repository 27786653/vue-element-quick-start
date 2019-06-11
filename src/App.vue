<template>
  <div id="app" class="fillcontain">
    <div id="container">
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>
