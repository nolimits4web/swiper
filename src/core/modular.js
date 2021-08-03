import { extend } from '../shared/utils.js';

export default {
  useParams(instanceParams) {
    const instance = this;
    if (!instance.modules) return;
    instance.modules.forEach((mod) => {
      if (mod.params) {
        extend(instanceParams, mod.params);
      }
    });
  },

  useModules(modulesParams = {}) {
    const instance = this;
    if (!instance.modules) return;
    Object.keys(instance.modules).forEach((moduleName) => {
      const mod = instance.modules[moduleName];
      const moduleParams = modulesParams[moduleName] || {};

      // Add event listeners
      if (mod.on && instance.on) {
        Object.keys(mod.on).forEach((moduleEventName) => {
          instance.on(moduleEventName, mod.on[moduleEventName]);
        });
      }

      // Module create callback
      if (mod.create) {
        mod.create.bind(instance)(moduleParams);
      }
    });
  },
};
