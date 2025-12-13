<template>
 <div class="shopping-list-app">
 <div class="page-header">
 <h1>Мой список покупок</h1>
 <p>Полноценное full-stack приложение на Nuxt 3</p>
 </div>
 <!-- Панель фильтров -->
 <div class="filters-panel">
 <div class="filter-group">
 <input
 v-model="filters.search"
 @input="loadItems"
 placeholder="Поиск товаров..."
 class="filter-input"
 >

 <select v-model="filters.category" @change="loadItems"
class="filter-select">
 <option value="">Все категории</option>
 <option value="Молочные">Молочные</option>
 <option value="Хлебобулочные">Хлебобулочные</option>
 <option value="Фрукты">Фрукты</option>
 <option value="Овощи">Овощи</option>
 </select>

 <select v-model="filters.completed" @change="loadItems"
class="filter-select">
 <option value="">Все статусы</option>
 <option value="false">Не выполнено</option>
 <option value="true">Выполнено</option>
 </select>
 </div>

 <div class="stats-refresh">
 <button @click="loadStats" class="refresh-btn"
:disabled="loadingStats">
 {{ loadingStats ? 'Обновление...' : 'Обновить статистику' }}
 </button>
 </div>
 </div>
 <!-- Форма добавления товара -->
 <div class="add-item-card">
 <h3>Добавить новый товар</h3>
 <div class="add-item-form">
 <input
 v-model="newItem.name"
 placeholder="Название товара"
 class="form-input"
 :disabled="addingItem"
 >
 <input
 v-model.number="newItem.quantity"
 type="number"
 min="1"
 placeholder="Количество"
 class="form-input"
 :disabled="addingItem"
 >
 <select v-model="newItem.category" class="form-select"
:disabled="addingItem">
 <option value="">Выберите категорию</option>
 <option value="Молочные">Молочные</option>
 <option value="Хлебобулочные">Хлебобулочные</option>
 <option value="Фрукты">Фрукты</option>
 <option value="Овощи">Овощи</option>
 <option value="Бакалея">Бакалея</option>
 </select>
 <button @click="addItem" class="add-btn"
:disabled="addingItem">
 {{ addingItem ? 'Добавление...' : 'Добавить' }}
 </button>
 </div>

 <!-- Сообщения об ошибках/успехе -->
 <div v-if="message" class="message" :class="message.type">
 {{ message.text }}
 </div>
 </div>
 <!-- Основной контент с загрузкой -->
 <div class="content-area">
 <!-- Загрузка -->
 <div v-if="loading" class="loading-state">
 <div class="spinner"></div>
 <p>Загружаем список покупок...</p>
 </div>

 <!-- Ошибка -->
 <div v-else-if="error" class="error-state">
 <p>Ошибка: {{ error }}</p>
 <button @click="loadItems" class="retry-btn">Повторить
попытку</button>
 </div>
 <!-- Пустой список -->
 <div v-else-if="!items.length" class="empty-state">
 <p>Ваш список покупок пуст</p>
 <p>Добавьте первый товар!</p>
 </div>

 <!-- Список товаров -->
 <div v-else class="items-section">
 <div class="section-header">
 <h2>Список товаров ({{ items.length }})</h2>
 <div class="section-actions">
 <button @click="loadItems" class="action-btn"
:disabled="loading">
 {{ loading ? '...' : 'Обновить' }}
 </button>
 </div>
 </div>

 <div class="items-grid">
 <ProductCard
 v-for="item in items"
 :key="item.id"
 :product="item"
 @delete="deleteItem(item.id)"
 @toggle="toggleItem(item)"
 @edit="editItem(item)"
 />
 </div>
 </div>
 </div>
 <!-- Панель статистики -->
 <div class="stats-panel" v-if="stats">
 <div class="stats-header">
 <h3>Статистика</h3>
 <span class="timestamp">Обновлено:
{{ formatTime(stats.timestamp) }}</span>
 </div>

 <div class="stats-grid">
 <div class="stat-card">
 <div class="statvalue">{{ stats.data.totalItems }}</div>
 <div class="stat-label">Всего товаров</div>
 </div>
 <div class="stat-card">
 <div class="statvalue">{{ stats.data.totalQuantity }}</div>
 <div class="stat-label">Общее количество</div>
 </div>
 <div class="stat-card">
 <div class="statvalue">{{ stats.data.completedItems }}</div>
 <div class="stat-label">Выполнено</div>
 </div>
 <div class="stat-card">
 <div class="statvalue">{{ stats.data.remainingItems }}</div>
 <div class="stat-label">Осталось</div>
 </div>
 </div>

 <div class="stats-details">
 <h4>По категориям:</h4>
 <div class="categories-list">
 <span
 v-for="(count, category) in stats.data.categories"
 :key="category"
 class="category-tag"
 >
 {{ category }}: {{ count }}
 </span>
 </div>
 </div>
 </div>

 <!-- Dev Tools Панель -->
 <div class="dev-tools" v-if="isDevelopment">
 <h4>Dev Tools</h4>
 <div class="endpoints-list">
 <p>Доступные API endpoints:</p>
 <ul>
 <li><NuxtLink to="/api/items" target="_blank">GET
/api/items</NuxtLink></li>
 <li><NuxtLink to="/api/stats" target="_blank">GET
/api/stats</NuxtLink></li>
 </ul>
 </div>
 </div>
 </div>
</template>
<script setup>
const { data: items, refresh: refreshItems, pending: loading,
error } = await useFetch('/api/items', {
 lazy: true,
 server: true,
 pick: ['data'],
 query: computed(() => ({
 search: filters.search,
 category: filters.category,
 completed: filters.completed
 }))
})
const filters = reactive({
  search: '',
 category: '',
 completed: ''
})
const newItem = reactive({
 name: '',
 quantity: 1,
 category: ''
})
const message = ref(null)
const addingItem = ref(false)
const loadingStats = ref(false)
const { data: stats, refresh: refreshStats } = await
useFetch('/api/stats', {
 lazy: true,
 server: true
})
const isDevelopment = process.dev
const showMessage = (text, type = 'success') => {
 message.value = { text, type }
 setTimeout(() => {
 message.value = null
 }, 3000)
}
const loadItems = async () => {
 await refreshItems()
 if (!error.value) {
 showMessage('Список обновлен', 'success')
 }
}
const loadStats = async () => {
 loadingStats.value = true
 await refreshStats()
 loadingStats.value = false
 showMessage('Статистика обновлена', 'info')
}
const addItem = async () => {
 if (!newItem.name.trim()) {
 showMessage('Введите название товара', 'error')
 return
 }

 addingItem.value = true

 try {
  const { data: result } = await useFetch('/api/items', {
 method: 'POST',
 body: newItem
 })

 if (result.value?.status === 'success') {
 showMessage('Товар успешно добавлен!', 'success')

 newItem.name = ''
 newItem.quantity = 1
 newItem.category = ''

 await Promise.all([refreshItems(), refreshStats()])
 }
 } catch (err) {
 showMessage('Ошибка при добавлении товара', 'error')
 } finally {
 addingItem.value = false
 }
}
const deleteItem = async (id) => {
 if (!confirm('Удалить этот товар?')) return

 try {
 await $fetch(`/api/items/${id}`, {
 method: 'DELETE'
 })

 showMessage('Товар удален', 'success')
 await Promise.all([refreshItems(), refreshStats()])
 } catch (err) {
 showMessage('Ошибка при удалении товара', 'error')
 }
}
const toggleItem = async (item) => {
 try {
 await $fetch(`/api/items/${item.id}`, {
 method: 'PUT',
 body: {
 ...item,
 completed: !item.completed
 }
 })

 showMessage(`Товар ${!item.completed ? 'выполнен' : 'возвращен в список'}`, 'info')
 await Promise.all([refreshItems(), refreshStats()])
 } catch (err) {
 showMessage('Ошибка при обновлении товара', 'error')
 }
}
 const editItem = async (item) => {
 const newName = prompt('Введите новое название:', item.name)
 if (!newName || newName === item.name) return

 try {
 await $fetch(`/api/items/${item.id}`, {
 method: 'PUT',
 body: {
 ...item,
 name: newName
 }
 })

 showMessage('Название обновлено', 'success')
 await refreshItems()
 } catch (err) {
 showMessage('Ошибка при редактировании товара', 'error')
 }
}
const formatTime = (timestamp) => {
 return new Date(timestamp).toLocaleTimeString('ru-RU', {
 hour: '2-digit',
 minute: '2-digit',
 second: '2-digit'
 })
}
</script>