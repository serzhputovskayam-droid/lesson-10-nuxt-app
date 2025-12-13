// Создание нового товара
export default defineEventHandler(async (event) => {
 try {
 // Получаем тело запроса
 const body = await readBody(event)
 // Валидация данных
 if (!body.name || !body.quantity) {
 throw createError({
 statusCode: 400,
 statusMessage: 'Не заполнены обязательные поля',
 data: { required: ['name', 'quantity'] }
 })
 }
 if (body.quantity <= 0) {
 throw createError({
 statusCode: 400,
 statusMessage: 'Количество должно быть больше 0'
 })
 }
 // В реальном приложении здесь сохраняем в БД
 const newItem = {
 id: Date.now(),
 name: body.name.trim(),
 quantity: parseInt(body.quantity),
 completed: body.completed || false,
 category: body.category || 'Без категории',
 createdAt: new Date().toISOString(),
 updatedAt: new Date().toISOString()
 }
 // Возвращаем созданный товар
 return {
 status: 'success',
 message: 'Товар успешно создан',
 data: newItem,
 timestamp: new Date().toISOString()
 }
 } catch (error) {
 throw error
 }
})
