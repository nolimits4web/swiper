/* eslint-disable no-param-reassign */
import { extend, now } from './utils';
import EventEmitter from './event-emitter-class';

function installClassModule(Class, module) {
  if (!Class.prototype.modules) Class.prototype.modules = {};
  const name = module.name || `${Object.keys(Class.prototype.modules).length}_${now()}`;
  Class.prototype.modules[name] = module;
}

class Modular extends EventEmitter {
  constructor(params = {}, parents = []) {
    super(parents);
    const self = this;
    self.params = params;

    // Events
    if (self.params && self.params.on) {
      Object.keys(self.params.on).forEach((eventName) => {
        self.on(eventName, self.params.on[eventName]);
      });
    }
  }

  useParams(instanceParams) {
    const instance = this;
    if (!instance.modules) return;
    Object.keys(instance.modules).forEach((moduleName) => {
      const module = instance.modules[moduleName];
      // Extend params
      if (module.params) {
        extend(instanceParams, module.params);
      }
    });
  }

  useModules(modulesParams = {}) {
    const instance = this;
    if (!instance.modules) return;
    Object.keys(instance.modules).forEach((moduleName) => {
      const module = instance.modules[moduleName];
      const moduleParams = modulesParams[moduleName] || {};
      // Extend instance methods and props
      if (module.instance) {
        Object.keys(module.instance).forEach((modulePropName) => {
          const moduleProp = module.instance[modulePropName];
          if (typeof moduleProp === 'function') {
            instance[modulePropName] = moduleProp.bind(instance);
          } else {
            instance[modulePropName] = moduleProp;
          }
        });
      }
      // Add event listeners
      if (module.on && instance.on) {
        Object.keys(module.on).forEach((moduleEventName) => {
          instance.on(moduleEventName, module.on[moduleEventName]);
        });
      }

      // Module create callback
      if (module.create) {
        module.create.bind(instance)(moduleParams);
      }
    });
  }

  static use(module) {
    const Class = this;
    if (Array.isArray(module)) {
      module.forEach((m) => installClassModule(Class, m));
      return Class;
    }
    installClassModule(Class, module);
    return Class;
  }
}

export default Modular;
