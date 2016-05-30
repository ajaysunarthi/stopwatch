(function() {
    /**
     *  Module
     *
     * Description
     */
    angular.module('stopWatch')
        .filter('twoDigit',twoDigit)
        .filter('threeDigit',threeDigit);

    function twoDigit() {
        return function(item) {
            if (item < 10) {
                return '0' + item;
            }
            else{
            	return item;
            }
        }
    }

function threeDigit() {
        return function(item) {
            if (item < 10) {
                return '00' + item;
            }
            else if (item < 100) {
                return '0' + item;
            }
            else{
            	return item;
            }
        }
    }    

})();
