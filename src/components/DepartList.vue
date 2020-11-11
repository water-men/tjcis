<template>
  <a-card title="学院列表">
    <a-card-grid
      style="
        width: 20%;
        text-align: center;
        font-size: 16px;
        font-weight: bolder;
        color: green;
      "
    >
      电子与信息工程学院
    </a-card-grid>
    <a-card-grid style="width: 20%; text-align: center"> Content </a-card-grid>
    <a-card-grid style="width: 20%; text-align: center"> Content </a-card-grid>
    <a-card-grid style="width: 20%; text-align: center"> Content </a-card-grid>
    <a-card-grid style="width: 20%; text-align: center"> Content </a-card-grid>
    <a-card-grid style="width: 20%; text-align: center"> Content </a-card-grid>
    <a-card-grid style="width: 20%; text-align: center"> Content </a-card-grid>
    <a-card-grid style="width: 20%; text-align: center"> Content </a-card-grid>
    <a-card-grid v-for="(n, key) in [1, 3, 5]" :key="key">
      {{ n }}
    </a-card-grid>
  </a-card>
</template>

<script>
export default {

}
</script>

<style>
</style>