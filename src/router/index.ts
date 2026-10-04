import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import RootLayout from '../layouts/RootLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: RootLayout,
    children: [
      { path: 'splash', name: 'splash', component: () => import('../pages/SplashPage.vue'), meta: { blank: true } },
      { path: 'onboarding', name: 'onboarding', component: () => import('../pages/OnboardingPage.vue'), meta: { blank: true } },
      { path: 'register', name: 'register', component: () => import('../pages/RegisterPage.vue'), meta: { blank: true } },
      { path: '', name: 'home', component: () => import('../pages/HomePage.vue'), meta: { app: true } },
      { path: 'lapor', name: 'lapor', component: () => import('../pages/ReportWizardPage.vue'), meta: { app: true } },
      { path: 'status/:id', name: 'status', component: () => import('../pages/ReportStatusPage.vue'), meta: { app: true } },
      { path: 'riwayat', name: 'riwayat', component: () => import('../pages/HistoryPage.vue'), meta: { app: true } },
      { path: 'profil', name: 'profil', component: () => import('../pages/ProfilePage.vue'), meta: { app: true } },
      { path: 'pengaturan', name: 'pengaturan', component: () => import('../pages/SettingsPage.vue'), meta: { app: true } },
      { path: 'tentang', name: 'tentang', component: () => import('../pages/AboutPage.vue'), meta: { blank: true } },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/NotFoundPage.vue') },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  const onboarded = localStorage.getItem('suar_onboarded') === '1'
  const hasUser = localStorage.getItem('suar_user') === '1'
  if (to.name === 'splash' || to.name === 'not-found') return true
  if (!onboarded && to.name !== 'onboarding') return { name: 'onboarding' }
  if (onboarded && !hasUser && to.name !== 'register') return { name: 'register' }
  if (to.name === 'onboarding' && onboarded) return { name: hasUser ? 'home' : 'register' }
  if (to.name === 'register' && hasUser) return { name: 'home' }
  return true
})

export default router
