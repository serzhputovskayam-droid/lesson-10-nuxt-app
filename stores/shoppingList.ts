import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface ShoppingItem {
  id: number
  name: string
  quantity: number
  completed: boolean
  createdAt: Date
}

interface ArchivedItem extends ShoppingItem {
  deletedAt: Date
}

export const useShoppingListStore = defineStore('shoppingList', () => {
  const items = ref<ShoppingItem[]>([
    { id: 1, name: 'Молоко', quantity: 1, completed: false, createdAt: new Date() },
    { id: 2, name: 'Хлеб', quantity: 2, completed: false, createdAt: new Date() }
  ])

  const newItem = ref<{ name: string, quantity: number }>({
    name: '',
    quantity: 1
  })
  
  const sortOption = ref<'name' | 'quantity' | 'completed'>('name')
  const archivedItems = ref<ArchivedItem[]>([])

  const totalItems = computed(() => items.value.length)
  const totalQuantity = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const completedItems = computed(() => items.value.filter(item => item.completed).length)
  const remainingItems = computed(() => totalItems.value - completedItems.value)
  
  const sortedItems = computed(() => [...items.value].sort((a, b) => {
    if (sortOption.value === 'name') return a.name.localeCompare(b.name)
    if (sortOption.value === 'quantity') return a.quantity - b.quantity
    if (sortOption.value === 'completed') return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
    return 0
  }))
  
  const completedList = computed(() => items.value.filter(item => item.completed))

  function addItem() {
    if (newItem.value.name.trim()) {
      const item: ShoppingItem = {
        id: Date.now(),
        name: newItem.value.name.trim(),
        quantity: newItem.value.quantity,
        completed: false,
        createdAt: new Date()
      }
      items.value.push(item)
      resetNewItem()
    }
  }

  function removeItem(id: number) {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      const deletedItem: ArchivedItem = { ...items.value[index], deletedAt: new Date() }
      archivedItems.value.push(deletedItem)
      items.value.splice(index, 1)
    }
  }

  function toggleItem(id: number) {
    const item = items.value.find(item => item.id === id)
    if (item) item.completed = !item.completed
  }

  function increaseQuantity(id: number) {
    const item = items.value.find(item => item.id === id)
    if (item) item.quantity++
  }

  function decreaseQuantity(id: number) {
    const item = items.value.find(item => item.id === id)
    if (item && item.quantity > 1) item.quantity--
  }

  function updateItemName(id: number, newName: string) {
    const item = items.value.find(item => item.id === id)
    if (item && newName.trim()) item.name = newName.trim()
  }

  function setSortOption(option: 'name' | 'quantity' | 'completed') {
    sortOption.value = option
  }

  function resetNewItem() {
    newItem.value = { name: '', quantity: 1 }
  }

  function clearCompleted() {
    items.value = items.value.filter(item => !item.completed)
  }

  function clearAllItems() {
    items.value.forEach(item => {
      archivedItems.value.push({ ...item, deletedAt: new Date() })
    })
    items.value = []
  }

  return {
    items, newItem, sortOption, archivedItems,
    totalItems, totalQuantity, completedItems, remainingItems, sortedItems, completedList,
    addItem, removeItem, toggleItem, increaseQuantity, decreaseQuantity, updateItemName,
    setSortOption, resetNewItem, clearCompleted, clearAllItems
  }
})
