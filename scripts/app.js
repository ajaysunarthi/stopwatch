/**
 *  Module
 *
 * Description
 */
(function() {

    angular.module('stopWatch', []).
    controller('appCtrl', appController);

    function appController($scope) {
        var vm = this;

        init();

        function init() {
            vm.timer = {
                hours: 0,
                minutes: 0,
                seconds: 0,
                ms: 0
            };
        }

        vm.laps = [];
        vm.splits = [];

        var interval, startTime = 0,
            timeElapsed, pause = -999,
            splitindex = 0,
            lapindex = 0;
        var time = {};

        vm.showButton = true;

        vm.toggle = function() {
            vm.showButton = !vm.showButton;
        }

        vm.startTimer = function() {

            if (!(vm.timer.ms || vm.timer.seconds || vm.timer.ms)) {
                startTime = Date.now();
            } else if (pause) {
                startTime = Date.now() + startTime - pause;
            } else {
                return;
            }
            pause = 0;

            interval = setInterval(function() {
                $scope.$apply(function() {
                    timeElapsed = Date.now() - startTime;
                    vm.timer = {
                        ms: timeElapsed % 1000,
                        seconds: (Math.floor(timeElapsed / 1000)) % 60,
                        minutes: 0 ? (this.seconds < 59) : (Math.floor((timeElapsed / 1000) / 60)) % 60,
                        hours: 0 ? (this.minutes < 59) : (Math.floor(((timeElapsed / 1000) / 60) / 60)) % 60
                    };
                });
            }, 1);
        };


        vm.stopTimer = function() {
            clearInterval(interval);
            pause = Date.now();
        };

        vm.resetTimer = function() {
            if (pause) {
                vm.laps = [];
                vm.splits = [];
                init();
            }
        };


        vm.splitTime = function() {
            if (pause === 0) { //work only when !paused
                console.log(splitindex++);
                time = {
                    splitindex: splitindex,
                    hours: vm.timer.hours,
                    minutes: vm.timer.minutes,
                    seconds: vm.timer.seconds,
                    milliseconds: vm.timer.ms
                };
                vm.splits.push(time);

            }
        }

        vm.lapTime = function() {
            if (pause === 0) {
                var lap = [];
                if (vm.splits.length > 0) {
                    for (var i = 0; i < vm.splits.length; i++) {
                        lap.push(vm.splits[i]);
                    }
                }
                vm.splits = [];
                time = {
                    lapindex: splitindex++,
                    hours: vm.timer.hours,
                    minutes: vm.timer.minutes,
                    seconds: vm.timer.seconds,
                    milliseconds: vm.timer.ms,
                };
                lap.push(time);
                vm.laps.push(lap);
                console.log(vm.laps);
                clearInterval(interval); // Stop the iterating setInterval function
                init(); // Call the initialization function
                vm.startTimer(); // Start the timer
            }
        };

    }

    appController.$inject = ['$scope'];

})();
