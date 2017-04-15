define(['_'], function(_) {
    return function incomePageController() {
        var vm = this;
        vm.salaries = [];
        vm.grossSalary = 0;
        
        vm.addIncome = addIncome;
        vm.removeIncome = removeIncome;
        
        function addIncome(name, salary, date) {
            if(!name || !salary || !date) {return;}

            vm.salaries.push({name: name, salary: salary, date: date});
            sumIncome();
        }
        
        function removeIncome(index) {
            vm.salaries.splice(index, 1);
            sumIncome();
        }

        function sumIncome() {
            if(_.isEmpty(vm.salaries)) {vm.grossSalary = 0;}

            vm.grossSalary = vm.salaries.reduce(function(prev, curr) {
                return prev + parseInt(curr.salary);
            }, 0);
        }
    };
});