const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/IndexPage.vue') },
      { path: 'populations', name: 'Populations', component: () => import('pages/PopulationsPage.vue') },
      { path: 'payments', name: 'Payments', component: () => import('pages/PaymentsPage.vue') },
      { path: 'expenses', name: 'Expenses', component: () => import('pages/ExpensesPage.vue') },
      { path: 'manage-population', name: 'ManagePopulation', component: () => import('pages/ManagePopulationPage.vue') },
      { path: 'manage-payments', name: 'ManagePayments', component: () => import('pages/ManagePaymentsPage.vue') },
      { path: 'manage-expenses', name: 'ManageExpenses', component: () => import('pages/ManageExpensesPage.vue') },
      { path: 'login', name: 'Login', component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/IndexPage.vue')
  }
]

export default routes
