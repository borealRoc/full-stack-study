// @ts-nocheck
import { ApplyPluginsType } from '/Users/xusp/.config/yarn/global/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.js').default,
    "routes": [
      {
        "path": "/about/about",
        "exact": true,
        "component": require('@/pages/about/about.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('@/pages/index.js').default
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('@/pages/login.js').default
      },
      {
        "path": "/users",
        "routes": [
          {
            "path": "/users",
            "exact": true,
            "component": require('@/pages/users/index.js').default
          },
          {
            "path": "/users/:id",
            "exact": true,
            "component": require('@/pages/users/[id].js').default
          }
        ],
        "component": require('@/pages/users/_layout.js').default
      },
      {
        "path": "/:post/commit",
        "exact": true,
        "component": require('@/pages/[post]/commit.js').default
      },
      {
        "path": "/:post",
        "exact": true,
        "component": require('@/pages/[post]/index.js').default
      }
    ]
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
