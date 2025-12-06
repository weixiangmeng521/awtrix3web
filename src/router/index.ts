/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import navList, { getMatchedEventCallback, type NavItem } from '@/config/NavConfig'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})


// match router info from navigation list
function matchRouteInfoFromNavList(path: string): NavItem | undefined {
  let matchedItem: NavItem | undefined = undefined;
  const recur = (navItems: NavItem[]) => {
    navItems.forEach((item) => {
      if (item.link === path) {
        matchedItem = item;
      }
      if (item.children && item.children.length) {
        recur(item.children);
      }
    })
  }
  recur(navList);
  return matchedItem;
}


router.beforeEach((to, from, next) => {
  const toPath = to.path;
  const matchedItem = matchRouteInfoFromNavList(toPath);
  const checkers = matchedItem?.check ?? [];
  for (const index in checkers) {
    const key = checkers[index];
    if (!key) throw new Error("Invalid router check event: " + key)
    const cb = getMatchedEventCallback(key);
    if (cb) {
      const errorMsg = cb();
      if (errorMsg) {
        // valid fail
        console.log(errorMsg);
        next("/");
        return;
      }
    }
  }

  next();
})

export default router
