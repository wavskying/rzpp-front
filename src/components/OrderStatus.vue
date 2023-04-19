<template>
  <div class="order-status">
    <div class="status-name">{{ status }}</div>
    <div class="progress-bar">
      <div class="progress-bar-line"></div>
      <div class="progress-bar-circle" :class="circleClass"></div>
      <div class="progress-bar-line"></div>
      <div class="progress-bar-circle" :class="circleClass"></div>
      <div class="progress-bar-line"></div>
      <div class="progress-bar-circle" :class="circleClass"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderStatus',
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    circleClass() {
      switch (this.status) {
        case '待付款':
          return 'progress-bar-circle-pending';
        case '进行中':
          return 'progress-bar-circle-loading';
        case '已完成':
          return 'progress-bar-circle-completed';
        default:
          return '';
      }
    },
  },
};
</script>

<style>
.order-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.status-name {
  font-weight: bold;
}

.progress-bar {
  display: flex;
  align-items: center;
  height: 40px;
}

.progress-bar-line {
  flex: 1;
  height: 5px;
  background-color: #ccc;
}

.progress-bar-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 5px;
}

.progress-bar-circle-pending {
  background-color: #ccc;
}

.progress-bar-circle-loading {
  background-color: #42b983;
  animation: loading 1s infinite;
}

.progress-bar-circle-completed {
  background-color: #42b983;
}

@keyframes loading {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
