// console.log('hello');



var budgetController = (function(){

    // var name = 'Mayank';
    //  function intro(value){
    //      console.log('My name is ' + value)
    //  }
    // return {
    //     display : function(){
    //         intro(name);
    //     }
    // }
    var obj = {
         totalIncome : 0,
         totalExpenses : 0,
         totalPercentExpenses : 0,
         percentExpenses : 0,
         availBudget : 0
    }

    function calculateBudget(type, value){
        if(type === 'inc' ){
            obj.totalIncome+=value;
        }
        if(type === 'exp'){
            obj.totalExpenses+=value;
            obj.percentExpenses = ((value/obj.totalIncome)*100).toFixed(1);
        }

        obj.availBudget = obj.totalIncome - obj.totalExpenses;
        obj.totalPercentExpenses = ((obj.totalExpenses/obj.totalIncome)*100).toFixed(1);
        // console.log(obj.totalIncome)
    }
        return {
            getBudget : function(type, value){
                calculateBudget(type, value)
            },
            obj ,
            updateBudget : function(type, value){
                if(type === 'inc' ){
                    obj.totalIncome-=value;
                    // obj.totalExpenses+=value;
                }
                if(type === 'exp'){
                    obj.totalExpenses-=value;
                    // obj.totalIncome+=value;
                }
                obj.availBudget = obj.totalIncome - obj.totalExpenses;
                obj.totalPercentExpenses = ((obj.totalExpenses/obj.totalIncome)*100).toFixed(1);
            }
        }
    
})();



var UIController = (function(){

    var delItem;
    var incomeList = [];
    var expenseList = [];
    function budget(income, expenses, percentExpenses, availBudget){
        document.querySelector('.budget__income--value').textContent = '+' + income.toLocaleString('en-IN')
        expenses === 0 ? document.querySelector('.budget__expenses--value').textContent = expenses.toLocaleString('en-IN') :
        document.querySelector('.budget__expenses--value').textContent = '-' + expenses.toLocaleString('en-IN')
        document.querySelector('.budget__expenses--percentage').textContent = percentExpenses+'%'
        document.querySelector('.budget__value').textContent = '+'+availBudget.toLocaleString('en-IN')
    }

    function budgetList(addType, addDesc, value, percentExpenses){
        if(addType === 'inc'){
            var income = {
                addDesc : addDesc,
                value : value
            }
            // console.log(incomeList)
            incomeList.push(income);
        }
        document.querySelector('.income__list').innerHTML = '';
        for( var i = 0; i < incomeList.length ; i ++){
            document.querySelector('.income__list').innerHTML += '<div class="item clearfix" id="inc-'+ i +'">'+
                                                '<div class="item__description">'+incomeList[i].addDesc+'</div>'+
                                                '<div class="right clearfix">'+
                                                    '<div class="item__value">+ '+ incomeList[i].value.toLocaleString('en-IN') +'</div>'+
                                                    '<div class="item__delete">'+
                                                        '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'
        }
        if(addType === 'exp'){
            var expense = {
                addDesc : addDesc,
                value : value,
                percentExpenses : percentExpenses
            }
            // console.log(expenseList);
            expenseList.push(expense);
        }
        if(percentExpenses === ''){
            var sum = 0;
            for(var i = 0; i < incomeList.length; i++){
                sum+=incomeList[i].value;
            }
            for(var i = 0 ; i < expenseList.length; i++){
                expenseList[i].percentExpenses = (expenseList[i].value/sum)*100;
            }
        }
        document.querySelector('.expenses__list').innerHTML = '';
        for(var i =0; i < expenseList.length ; i++){
            document.querySelector('.expenses__list').innerHTML += '<div class="item clearfix" id="exp-'+ i +'">'+
            '<div class="item__description">' + expenseList[i].addDesc + '</div>'+
            '<div class="right clearfix">' +
                '<div class="item__value"> - ' + expenseList[i].value.toLocaleString('en-IN') + '</div>' +
                '<div class="item__percentage">' + expenseList[i].percentExpenses + '%</div>'+
                '<div class="item__delete">'+
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                '</div>'+
            '</div>'+
        '</div>'
        }
        
    }

    return {
        displayBudget : function(income, expenses, percentExpenses, availBudget){
            // console.log(income)
            budget(income, expenses, percentExpenses, availBudget)
        },
        diplayBudgetList : function(addType, addDesc, value, percentExpenses){
            budgetList(addType, addDesc, value, percentExpenses)
        },
        deleteItem : function(type, id){
            
            if(type === 'inc'){
                delItem = incomeList[parseInt(id)];
                incomeList.splice(parseInt(id), 1);
                // console.log(delItem.value)
                // console.log(incomeList)
            }
            if(type === 'exp'){
                delItem = expenseList[parseInt(id)];
                expenseList.splice(parseInt(id), 1);
                // console.log(expenseList)
            }
            return {
                delItem : delItem.value,
                type : type
            }
        }
    }


})();


var Controller = (function(BudgetCtrl, UICtrl){

    // BudgetCtrl.display()

    init();
    function init(){
        var year;
        var month;
        var now;
        var months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                        'October', 'November', 'December']
        now = new Date();
        console.log(now.getFullYear())
        console.log(months[now.getMonth()]);

        month = months[now.getMonth()];
        year = now.getFullYear();

        document.querySelector('.budget__title--month').textContent = month + ' ' + year ;
    }

    document.querySelector('.add__type').addEventListener('change', function(){
        if(document.querySelector('.add__type').value === 'exp'){
            document.querySelector('.add__type').classList.add('red-focus')
            document.querySelector('.add__description').classList.add('red-focus')
            document.querySelector('.add__value').classList.add('red-focus');
            document.querySelector('.add__btn').classList.add('red');
        }

        if(document.querySelector('.add__type').value === 'inc'){
            document.querySelector('.add__type').classList.remove('red-focus')
            document.querySelector('.add__description').classList.remove('red-focus')
            document.querySelector('.add__value').classList.remove('red-focus');
            document.querySelector('.add__btn').classList.remove('red');
        }

    })
    document.querySelector('.add__btn').addEventListener('click', function(){

        //Get the input data
        var addType = document.querySelector('.add__type').value
        var addDesc = document.querySelector('.add__description').value
        var value = parseFloat(document.querySelector('.add__value').value);

        if( !isNaN(value)){

         BudgetCtrl.getBudget(addType, value);
        // console.log(BudgetCtrl.obj.totalIncome)
        // console.log(BudgetCtrl.obj.totalExpenses)
        // console.log( BudgetCtrl.obj.totalPercentExpenses)
        // console.log(BudgetCtrl.obj.availBudget)
        UICtrl.displayBudget(BudgetCtrl.obj.totalIncome, BudgetCtrl.obj.totalExpenses, BudgetCtrl.obj.totalPercentExpenses, BudgetCtrl.obj.availBudget)
        UICtrl.diplayBudgetList(addType, addDesc, value,BudgetCtrl.obj.percentExpenses);

        document.querySelector('.add__description').value = ''
        document.querySelector('.add__value').value = ''
        }
        
    })

    var deleteItem = function (event){
        // console.log(event.target.parentNode.parentNode.parentNode.parentNode.id)

        var itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        var splitId;
        var type;
        var id;
        if(itemId){
            splitId = itemId.split('-');
            type = splitId[0];
            id = splitId[1];
        }
        var item = UICtrl.deleteItem(type, id)
        BudgetCtrl.updateBudget(type, item.delItem);

        // console.log(BudgetCtrl.obj.totalIncome)
        UICtrl.displayBudget(BudgetCtrl.obj.totalIncome, BudgetCtrl.obj.totalExpenses, BudgetCtrl.obj.totalPercentExpenses, BudgetCtrl.obj.availBudget)
        UICtrl.diplayBudgetList('','','','');
    }

    document.querySelector('.container').addEventListener('click', deleteItem)

    

})(budgetController, UIController);