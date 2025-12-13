// Получение статистики
export default defineEventHandler(async (event) => {
 const mockItems = [
 { id: 1, name: 'Молоко', quantity: 2, completed: false,
category: 'Молочные' },
 { id: 2, name: 'Хлеб', quantity: 1, completed: true, category:
'Хлебобулочные' },
 { id: 3, name: 'Яблоки', quantity: 5, completed: false,
category: 'Фрукты' }
 ]
 // Вычисляем статистику
 const stats = {
 totalItems: mockItems.length,
 totalQuantity: mockItems.reduce((sum, item) => sum +
item.quantity, 0),
 completedItems: mockItems.filter(item =>
item.completed).length,
 remainingItems: mockItems.filter(item => !
item.completed).length,
 // Статистика по категориям
 categories: mockItems.reduce((acc, item) => {
 acc[item.category] = (acc[item.category] || 0) + 1
 return acc
 }, {}),
 // Сводка
 summary: {
 mostCommonCategory: Object.entries(
 mockItems.reduce((acc, item) => {
 acc[item.category] = (acc[item.category] || 0) + 1
 return acc
 }, {})
 ).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Нет данных',
 averageQuantity: Math.round(
 mockItems.reduce((sum, item) => sum + item.quantity, 0) /
mockItems.length * 10
 ) / 10
 }
 }
 return {
 status: 'success',data: stats,
 timestamp: new Date().toISOString()
 }
})