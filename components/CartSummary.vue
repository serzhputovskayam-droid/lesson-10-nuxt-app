<template>
 <div class="cart-summary">
 <p>Всего товаров: {{ totalItems }}</p>
 <p>Общее количество: {{ totalQuantity }}</p>
 <p>Куплено: {{ completedItems }}</p>
 <p>Осталось: {{ remainingItems }}</p>
 </div>
</template>
<script setup>
defineProps(['totalItems', 'totalQuantity', 'completedItems',
'remainingItems'])
</script>

