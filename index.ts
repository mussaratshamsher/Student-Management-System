#! usr/bin/env node 
import inquirer from "inquirer";
import chalk from 'chalk';

let randomNumber: number =Math.round(10000 + Math.random()* 90000);
let myBalance: number = 20000

let answer = await inquirer.prompt([{
    name:  "student",
    type:  "input",
    message:(chalk.bold.green( "Enter student name:")),
    validate: function (value) {
        if (value.trim() !==""){
            return true;
        }return "Please enter a non-empty value"
    },
},{
    name: "courses",
    type: "list",
    message: (chalk.bold.magenta("Select the course from given choices.")),
    choices: ["CA & OP", "TypeScript", "Python", "Prompt Engineering", "Cloud Computing"]
}]);
const courseFee: {[key: string]: number}={
   "CA & OP": 3000,
   "TypeScript": 4000,
   "Python": 7000,
   "Prompt Engineering": 8000,
   "Cloud Computing":10000 ,
};
console.log(`\n Course Fee: ${courseFee[answer.courses]}/-`);

console.log(`Balance: ${myBalance}\n`);

let paymentMethod = await inquirer.prompt([{
    name: "payment",
    type: "list",
    message:(chalk.bold.blue( " Select payment Method")),
    choices: ["Bank Transfer", "Easypaisa", "Jazzcash"]
},{
    name:"amount",
    type: "input",
    message: "Transferd Money:",
    validate: function(value){
        if (value.trim() !== ""){
            return true;
        } return "Please enter non-empty value!"
    }
}
]);
console.log(`\n You Selected ${paymentMethod.payment} Method:`);
const tutionFee = courseFee[answer.courses];
const paymentAmount = parseFloat(paymentMethod.amount);
console.log(chalk.bold.magenta(`\n ${tutionFee} rupees has been transacted. `));
console.log(chalk.bold.magenta(`\n Your remaining balance is ${myBalance-tutionFee}/-rupees.`));
if (tutionFee === paymentAmount ){
    console.log(chalk.bold.magentaBright(`\n Congratulations! You have enrolled for ${answer.courses}.`));
    let ans = await inquirer.prompt([{
        name: "options",
        type: "list",
        message: (chalk.bold.blue("\n What would you like to do now?")),
        choices: ["View Status", "Exit"]
    }]); 
    if (ans.options === "View Status"){
            console.log(chalk.bold.inverse.red("\n Status:"));
            console.log(chalk.bold.green(`\n Student's Name: ${answer.student}`));
            console.log(chalk.bold.green(`Student's ID: ${randomNumber}`));
            console.log(chalk.bold.green(`Enrolled Course: ${answer.courses}`));
            console.log(chalk.bold.green(`Paid Fee: ${paymentAmount}`));
            console.log(chalk.bold.green(`Balance: ${myBalance -= paymentAmount}`)); 
            } else {
            console.log(chalk.bold.blue(" \n Exited from student Account."));
        }
}else{
    console.log(chalk.bold.red("\n Invalid amount to enroll in course!"));
    console.log(chalk.bold.yellow("\n Better to try next time with sufficient Amount! "));
    console.log(chalk.bold.yellow("\n Thank You"));
};