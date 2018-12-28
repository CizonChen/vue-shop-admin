/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const statisticsRouter = {
  path: '/statistics',
  component: Layout,
  redirect: 'noredirect',
  name: 'Charts',
  meta: {
    title: 'statistics',
    icon: 'chart',
    permission: ['admin']
  },
  children: [
    {
      path: 'coupon',
      component: () => import('@/views/statistics/coupon'),
      name: 'CouponStatistics',
      meta: { title: 'couponStatistics', noCache: true, permission: ['admin'] }
    },
    {
      path: 'fightGroup',
      component: () => import('@/views/statistics/fightGroup'),
      name: 'fightGroupStatistics',
      meta: { title: 'fightGroupStatistics', noCache: true, permission: ['admin'] }
    },
    {
      path: 'integral',
      component: () => import('@/views/statistics/integral'),
      name: 'integralStatistics',
      meta: { title: 'integralStatistics', noCache: true, permission: ['admin'] }
    }
  ]
}

export default statisticsRouter