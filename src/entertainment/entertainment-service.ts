import {
    type Department,
    type Drama, DramaCodeAndName,
    type Employee,
    EmployeeNameAndManager, EmployeeNameAndSalary
} from "@/entertainment/entertainment.ts";

export type EmployeeRole = '엔터테이너' | '국장' | '실장' | '대리' | '사원' | '이사' | '사장';

export interface EntertainmentService {
    getDepartments(): Promise<Department[]>;
    getEmployees(): Promise<Employee[]>;
    getDramas(): Promise<DramaCodeAndName[]>;
    getDramasByBroadcasts(broadcasts: string[]): Promise<Drama[]>;
    getDramaBroadcasts(): Promise<string[]>;
    getEmployeeSalarySumAndAvg(): Promise<{ sum: number, avg: number }>
    getDramasbyNotOpen(): Promise<string[]>;
    getAllEmployeeNameAndManagerName(): Promise<EmployeeNameAndManager[]>;
    getAllEmployeeNameAndSalary(): Promise<EmployeeNameAndSalary[]>;
    getEmployeesSalaryDataByRoleFromSalaryAvg(threshold: number): Promise<{ emp_rcode: string, avg: number, max: number, min: number }[]>;
    getEmployeesByHigherThanAvgSalary(): Promise<EmployeeNameAndSalary[]>;
    updateDramaOpenDateIfNull(date: string): Promise<number>;
    updateEmployeeRoleAndSalary(code: string, roleName: EmployeeRole, salaryPercentage: number): Promise<number>;
    insertEmployee(employee: Employee, departmentCode: string): Promise<number>;
    deleteEmployee(code: string): Promise<number>;
}