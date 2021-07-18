//Add dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

//set connection details for database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'company_db'
});

const mainMenuChoices = [
    "Add a department",
    "Add a role",
    "Add an employee",
    "View all departments",
    "View all roles",
    "View all employees",
    "Update employee role",
    "Exit"
];

const addDeptQuestions = [
    {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "deptName"
    }
]

let addRoleQuestions = [
    {
        type: "input",
        message: "What is the title of the role?",
        name: "roleTitle"
    },
    {
        type: "input",
        message: "What is the salary of the role?",
        name: "roleSalary"
    },
    {
        type: "list",
        message: "What department is the role in?",
        name: "roleDept",
        choices: []
    }
];

let addEmpQuestions = [
    {
        type: "input",
        message: "What is the first name of the employee?",
        name: "empFirst"
    },
    {
        type: "input",
        message: "What is the last name of the employee?",
        name: "empLast"
    },
    {
        type: "list",
        message: "What is the role of the employee?",
        name: "empRole",
        choices: []
    },
    {
        type: "list",
        message: "Who is the manager of the employee?",
        name: "empMgr",
        choices: []
    },
]

let updateEmpRoleQuestions = [
    {
        type:"list",
        message:"Which employee's role do you want to update?",
        name:"updateEmp",
        choices:[]
    },
    {
        type:"list",
        message:"What is the employee's new role?",
        name:"newRole",
        choices:[]
    }
]

const addDept = () => {
    inquirer.prompt(addDeptQuestions).then((answers) => {
        let newDept = { name: answers.deptName };
        connection.query(`INSERT INTO department SET ?`, newDept, (err, res) => {
            if (err) throw err;
            console.log("Success!");
            init();
        })
    })
}

const addRole = () => {
    connection.query(`SELECT id AS value, name FROM department`, (err, res) => {
        if (err) throw err;
        addRoleQuestions[2].choices = res;
        inquirer.prompt(addRoleQuestions).then((answers) => {
            let newRole = {
                title: answers.roleTitle,
                salary: answers.roleSalary,
                department_id: answers.roleDept
            };
            connection.query(`INSERT INTO role SET ?`, newRole, (err, res) => {
                if (err) throw err;
                console.log("Success!");
                init();
            })
        })
    })

}

const addEmp = () => {
    connection.query(`SELECT id AS value, title AS name FROM role`, (err, res) => {
        if (err) throw err;
        addEmpQuestions[2].choices = res;
        connection.query(`SELECT id AS value, concat(first_name,' ',last_name) as name FROM employee`, (err, res) => {
            if (err) throw err;
            addEmpQuestions[3].choices = res;
            inquirer.prompt(addEmpQuestions).then((answers) => {
                let newEmp = {
                    first_name: answers.empFirst,
                    last_name: answers.empLast,
                    role_id: answers.empRole,
                    manager_id: answers.empMgr
                };
                connection.query(`INSERT INTO employee set ?`, newEmp, (err, res) => {
                    if (err) throw err;
                    console.log("Success!");
                    init();
                })
            })
        })
    })
}

const viewDepts = () => {
    connection.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const viewRoles = () => {
    connection.query(`SELECT r.id, r.title, r.salary, d.name AS department FROM role r
    LEFT JOIN department d on r.department_id = d.id`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const viewEmps = () => {
    connection.query(`SELECT e.id, e.first_name, e.last_name, r.title, 
    d.name AS department, r.salary, concat(e2.first_name,' ',e2.last_name) AS manager
    FROM employee e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id = d.id
    LEFT JOIN employee e2 on e2.id = e.manager_id`, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const updateEmpRole = () => {
    connection.query(`SELECT id AS value, concat(first_name,' ',last_name) AS name FROM employee`, (err, res) => {
        if (err) throw err;
        updateEmpRoleQuestions[0].choices = res;
        connection.query(`SELECT id AS value, title as name FROM role`, (err, res) => {
            if (err) throw err;
            addEmpQuestions[3].choices = res;
            inquirer.prompt(addEmpQuestions).then((answers) => {
                let newEmp = {
                    first_name: answers.empFirst,
                    last_name: answers.empLast,
                    role_id: answers.empRole,
                    manager_id: answers.empMgr
                };
                connection.query(`INSERT INTO employee set ?`, newEmp, (err, res) => {
                    if (err) throw err;
                    console.log("Success!");
                    init();
                })
            })
        })
    })
}


//initialization function for app, load inquirer and display main menu
const init = () => {
    inquirer.prompt([
        {
            type: "list",
            choices: mainMenuChoices,
            message: "What would you like to do?",
            name: "userChoice"
        }
    ]).then((answers) => {
        switch (answers.userChoice) {
            case "Add a department":
                addDept();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmp();
                break;
            case "View all departments":
                viewDepts();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmps();
                break;
            case "Update employee role":
                updateEmpRole();
                break;
            case "Exit":
                connection.end();
        }
    })
}

//connect to database
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    init();
});