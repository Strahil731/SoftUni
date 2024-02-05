class Company {
    constructor() {
        this.department = {};
    }

    addEmployee(name, salary, position, department) {
        salary = Number(salary);
        if (!name || !salary || !position || !department) {
            throw new Error("Invalid input!");
        }
        else if (salary < 0) {
            throw new Error("Invalid input!");
        }
        if (!this.department[department]) {
            this.department[department] = {
                avg: 0,
                sumSalary: 0,
                employees: []
            }
        }
        this.department[department].employees.push({ name, salary, position });
        this._updateDepartmentInfo(department, salary);
        return `New employee is hired. Name: ${name}. Position: ${position}`;
    }

    bestDepartment() {
        let bestDepartmentArr = this._findBestDepartment();
        let buff = `Best Department is: ${bestDepartmentArr[0]}\n`;
        buff += `Average salary: ${bestDepartmentArr[1].avg.toFixed(2)}\n`;

        bestDepartmentArr[1].employees.sort((emp1, emp2) => {
            return emp2.salary - emp1.salary || emp1.name.localeCompare(emp2.name);
        }).forEach(emp => buff += `${emp.name} ${emp.salary} ${emp.position}\n`);

        return buff.trim();
    }

    _findBestDepartment() {
        return Object.entries(this.department).sort((a, b) => b[1].avg - a[1].avg)[0];
    }

    _updateDepartmentInfo(department, salary) {
        let currentDepartment = this.department[department];
        currentDepartment.sumSalary += salary;
        currentDepartment.avg = currentDepartment.sumSalary / currentDepartment.employees.length;
    }


}

let c = new Company();

console.log(c.addEmployee("Stanimir", 2000, "engineer", "Construction"));
console.log(c.addEmployee("Pesho", 1500, "electrical engineer", "Construction"));
console.log(c.addEmployee("Slavi", 500, "dyer", "Construction"));
console.log(c.addEmployee("Stan", 2000, "architect", "Construction"));
console.log(c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing"));
console.log(c.addEmployee("Pesho", 1000, "graphical designer", "Marketing"));
console.log(c.addEmployee("Gosho", 1350, "HR", "Human resources"));
console.log(c.bestDepartment());