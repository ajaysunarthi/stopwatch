(function() {
    /**
     *  Module
     *
     * Description
     */
    angular.module('stopWatch')
        .filter('twoDigit', twoDigit)
        .filter('threeDigit', threeDigit)
        .filter('orderObjectBy', orderObjectBy);

    function twoDigit() {
        return function(item) {
            if (item < 10) {
                return '0' + item;
            } else {
                return item;
            }
        }
    }

    function threeDigit() {
        return function(item) {
            if (item < 10) {
                return '00' + item;
            } else if (item < 100) {
                return '0' + item;
            } else {
                return item;
            }
        }
    }

    function orderObjectBy() {
        return function(items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function(item) {
                console.log(item);
                filtered.push(item);
            });
            filtered.sort(function(a, b) {
                return (a[field] > b[field]);
            });
            if (reverse) filtered.reverse();
            return filtered;
        }
    }

})();
