module.exports = function() {

    var injector = {};

    var singletons = {};

    injector.constant = function(name, value) {
        if (singletons[name] !== undefined) {
            throw new Error('Duplicate name: "' + name +'"');
        }
        
        singletons[name] = {
            name: name,
            inst: value,
        };
        
        return injector;
    };

    injector.factory = function(name, deps) {
        singletons[name] = {
            name: name,
            deps: deps.slice(0, deps.length - 1),
            ctor: deps[deps.length - 1]
        };
        
        return injector;
    };

    function instantiate(names) {

        var toresolve = {};
        var numToResolve = 0;
        (function collectDeps(names){
            
            names.forEach(function(name) {
                var ctrl = singletons[name];

                if (!ctrl) {
                    throw new Error('Undefined name: "' + name + '"');
                }

                if (ctrl.inst !== undefined) {
                    return;
                }

                if (toresolve[name]) {
                    return;
                }

                toresolve[name] = true;
                numToResolve += 1;

                collectDeps(ctrl.deps);
            });
        })(names);

        function nameUnresolved(name) {
            return singletons[name].inst === undefined;
        }
        
        function instanceByName(name) {
            return singletons[name].inst;
        }
        
        while (--numToResolve >= 0) {
            var ctrl;

            for (var dep in toresolve) {
                var c = singletons[dep];
                
                if (c.deps.filter(nameUnresolved).length === 0) {
                    ctrl = c;
                    break;
                }
            }

            if (!ctrl) {
                throw new Error('Circular dependency detected for names:', toresolve);
            }

            var args = ctrl.deps.map(instanceByName);
            ctrl.inst = ctrl.ctor.apply(null, args);
            if (ctrl.inst === undefined) {
                throw new Error('Bad factory function (returned "undefined") for "' + ctrl.name + '"');
            }
        }

        return names.map(function(name) { return singletons[name].inst; });
    }

    injector.inject = function(params) {
        
        if (params.length < 1) {
            throw new Error('inject() requires at least one parameter');
        }
        
        var args = instantiate(params.slice(0, params.length - 1));
        
        var func = params[params.length - 1];
        
        func.apply(null, args);
        
        return injector;
    };
    
    return injector;
};
