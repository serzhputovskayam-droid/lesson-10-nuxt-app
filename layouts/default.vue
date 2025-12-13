<!-- layouts/default.vue -->
<template>
 <div>
 <!-- Навигация, общая для всех страниц -->
 <nav style="padding: 1rem; background: #2c3e50; color:
white;">
 <NuxtLink to="/" style="color: white; margin-right:
1rem;">Главная</NuxtLink>
 <NuxtLink to="/history" style="color:
white;">История</NuxtLink>
<!-- ДОБАВИЛИ: ссылку на новую страницу-->
<NuxtLink to="/about" style="color: 
white;">О прилолжении</NuxtLink>
 </nav>
 <!-- Сюда будут подставляться страницы -->
 <NuxtPage />
 </div>
</template>