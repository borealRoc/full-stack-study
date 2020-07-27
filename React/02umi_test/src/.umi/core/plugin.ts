// @ts-nocheck
import { Plugin } from '/Users/xusp/Desktop/studySpace/full-stack-study/React/02umi_test/node_modules/@umijs/runtime';

const plugin = new Plugin({
  validKeys: ['patchRoutes','rootContainer','render','onRouteChange','dva','getInitialState','request',],
});
plugin.register({
  apply: require('/Users/xusp/Desktop/studySpace/full-stack-study/React/02umi_test/src/.umi/plugin-dva/runtime.tsx'),
  path: '/Users/xusp/Desktop/studySpace/full-stack-study/React/02umi_test/src/.umi/plugin-dva/runtime.tsx',
});
plugin.register({
  apply: require('../plugin-initial-state/runtime'),
  path: '../plugin-initial-state/runtime',
});
plugin.register({
  apply: require('../plugin-model/runtime'),
  path: '../plugin-model/runtime',
});

export { plugin };
