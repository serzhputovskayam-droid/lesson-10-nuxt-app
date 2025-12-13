<template>
 <div class="product-card" :class="{ 'completed':
product.completed }">
 <div class="card-content">
 <div class="product-main">
 <div class="product-info">
 <h4 class="product-name" :class="{ 'completed':
product.completed }">
 {{ product.name }}
 </h4>
 <div class="product-meta">
 <span class="product-quantity">Количество:
{{ product.quantity }}</span>
 <span class="product-category" vif="product.category">
 • {{ product.category }}
 </span>
 </div>
 <div class="product-status">
 <span class="status-badge" :class="product.completed ?
'completed' : 'pending'">
 {{ product.completed ? 'Выполнено' : 'В процессе' }}
 </span>
 <span class="product-date" v-if="product.createdAt">
 Добавлен: {{ formatDate(product.createdAt) }}
 </span>
 </div>
 </div>

 <div class="product-actions">
 <button
 @click="$emit('toggle', product)"
 class="action-btn toggle-btn"
 :class="{ 'completed': product.completed }"
 :title="product.completed ? 'Вернуть в список' :
'Отметить как выполненное'"
 >
 {{ product.completed ? 'Назад' : 'Готово' }}
 </button>

 <button
 @click="$emit('edit', product)"
 class="action-btn edit-btn"
 title="Редактировать"
 >
 Редактировать
 </button>

 <button
 @click="$emit('delete', product.id)"
 class="action-btn delete-btn"
 title="Удалить"
 >
 Удалить
 </button>
 </div>
 </div>
 </div>
 </div>
</template>
<script setup>
defineProps({
 product: {
 type: Object,
 required: true
 }
})
defineEmits(['toggle', 'edit', 'delete'])
const formatDate = (dateString) => {
 return new Date(dateString).toLocaleDateString('ru-RU', {
 day: 'numeric',
 month: 'short',
 year: 'numeric'
 })
}
</script>
