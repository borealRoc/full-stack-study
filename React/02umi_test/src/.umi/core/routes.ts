// @ts-nocheck
import { ApplyPluginsType } from '/Users/xusp/Desktop/studySpace/full-stack-study/React/02umi_test/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.js').default,
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": require('@/pages/404.js').default
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
            "path": "/users/:id",
            "exact": true,
            "component": require('@/pages/users/[id].js').default
          }
        ],
        "component": require('@/pages/users/_layout.js').default,
        "wrappers": [require('@/routes/PrivateRoute').default]
      },
      {
        "path": "/:post/commit",
        "exact": true,
        "component": require('@/pages/[post]/commit.js').default
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
