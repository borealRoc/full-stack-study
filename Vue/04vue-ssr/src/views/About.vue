<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>num:{{$store.state.count}}</h2>
    <button @click="$store.commit('add')">add</button>
  </div>
</template>
