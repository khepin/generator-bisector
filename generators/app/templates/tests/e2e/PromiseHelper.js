var q = require('q');
var _ = require('lodash');


/**
 * Returns a promise that resolves after all the promises in the array argument
 * have been resolved. If any of the argument promises resolves to truthy, *any*
 * resolves truthy as well. If ALL resolve to falsy, *any* resolves to falsy too.
 *
 * @param  {[type]} promises [description]
 * @return {[type]}          [description]
 */
function any(promises) {
    if (!_.isArray(promises)) {
        promises = _.toArray(arguments);
    }
    var d = q.defer();
    q.allSettled(promises).then(function(results){
        var status = _.reduce(results, function(accumulator, result){
            return accumulator || result.value;
        }, false);

        d.resolve(status);
    });

    return d.promise;
}

module.exports = {
    any: any
};