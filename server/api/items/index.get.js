// Получение всех товаров
export default defineEventHandler(async (event) => {
 try {
 // В реальном приложении здесь был бы запрос к БД
 // Для демонстрации используем моковые данные
 const mockItems = [
 { id: 1, name: 'Молоко', quantity: 2, completed: false,
category: 'Молочные' },
 { id: 2, name: 'Хлеб', quantity: 1, completed: true,
category: 'Хлебобулочные' },
 { id: 3, name: 'Яблоки', quantity: 5, completed: false,
category: 'Фрукты' }
 ]
 // Получаем query-параметры из URL
 const query = getQuery(event)
 const { category, completed, search } = query
 let filteredItems = [...mockItems]
 // Фильтрация по категории
 if (category) {
 filteredItems = filteredItems.filter(item => item.category
=== category)
 }
 // Фильтрация по статусу
 if (completed !== undefined) {
 const isCompleted = completed === 'true'
 filteredItems = filteredItems.filter(item => item.completed
=== isCompleted)
 }
 // Поиск по названию
 if (search) {
 filteredItems = filteredItems.filter(item =>
 item.name.toLowerCase().includes(search.toLowerCase())
 )
 }
 // Возвращаем ответ
 return {
 status: 'success',
 data: filteredItems,
 timestamp: new Date().toISOString()
 }
 } catch (error) {
 // Обработка ошибок
 throw createError({
 statusCode: 500,
 statusMessage: 'Ошибка при получении товаров',
 data: { error: error.message }
 })
 }
})
