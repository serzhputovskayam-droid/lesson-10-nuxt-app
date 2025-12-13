export default defineNuxtConfig({
 modules: ['@pinia/nuxt'],

 nitro: {
 preset: 'vercel'
 },

 build: {
 transpile: ['pinia']
 },
 app: {
 head: {
 title: 'Список покупок - Nuxt 3 Full-stack',
 meta: [
 { charset: 'utf-8' },
 { name: 'viewport', content: 'width=device-width, initialscale=1' },
 {
 name: 'description',
 content: 'Приложение для управления списком покупок'
},
 { name: 'keywords', content: 'Nuxt, Vue, Pinia, списокпокупок, full-stack' }
 ],
 link: [
 { rel: 'icon', type: 'image/x-icon', href:
'/favicon.ico' }
 ]
 }
 }
})