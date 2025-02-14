import type { EmployeeRole, EntertainmentService } from "@/entertainment/entertainment-service.ts";
import {
    Department,
    Drama,
    DramaCodeAndName,
    Employee,
    EmployeeNameAndManager, EmployeeNameAndSalary
} from "@/entertainment/entertainment.ts";
import { setConnection } from "@common/postgres-access.ts";

export class PostgresEntertainmentService implements EntertainmentService{
    async getDepartments(): Promise<Department[]> {
        const query = 'SELECT DEPT_CODE, DEPT_NAME, DEPT_LOC FROM department';
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query", (error as Error).message);
            return [];
        } finally {
            await client.end();
        }
    }

    async getEmployees(): Promise<Employee[]> {
        const query = 'SELECT EMP_CODE, EMP_NAME, EMP_MGT, EMP_SAL FROM employee';
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query", (error as Error).message);
            return [];
        } finally {
            await client.end();
        }
    }

    async getDramas(): Promise<DramaCodeAndName[]> {
        const query = 'SELECT DRM_CODE, DRM_NAME FROM drama';
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query", (error as Error).message);
            return [];
        } finally {
            await client.end();
        }
    }

    async getDramasByBroadcasts(broadcasts: string[]): Promise<Drama[]> {
        const query = "SELECT DRM_CODE, DRM_NAME FROM drama WHERE DRM_BRD = ANY ($1)";
        const client = await setConnection();

        try {
            const result = await client.query(query, [broadcasts]);
            return result.rows;
        } catch (error) {
            console.error("Error executing query", (error as Error).message);
            return [];
        } finally {
            await client.end();
        }
    }

    async getDramaBroadcasts(): Promise<string[]> {
        const query = 'SELECT DISTINCT DRM_BRD FROM drama';
        // const query = 'SELECT DRM_BRD FROM drama GROUP BY DRM_BRD';
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows.map((row) => row.drm_brd);
        } catch (error) {
            console.error("Error executing query", (error as Error).message);
            return [];
        } finally {
            await client.end();
        }
    }

    async getEmployeeSalarySumAndAvg(): Promise<{ sum: number; avg: number }> {
        const query = 'SELECT sum(EMP_SAL), avg(EMP_SAL) FROM employee';
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return {
                sum: parseInt(result.rows[0].sum),
                avg: parseInt(result.rows[0].avg),
            };
        } catch (error) {
            console.error("Error executing query", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }

    async getDramasbyNotOpen(): Promise<string[]> {
        const query = 'SELECT DRM_NAME FROM drama WHERE DRM_OPDATE IS NULL';
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows.map((row) => row.drm_name);
        } catch (error) {
            console.error("Error executing query", (error as Error).message);
            return [];
        } finally {
            await client.end();
        }
    }

    async getAllEmployeeNameAndManagerName(): Promise<EmployeeNameAndManager[]> {
        const query = 'SELECT E.EMP_NAME as emp_name, M.EMP_NAME as mgt_name FROM employee E, employee M WHERE E.EMP_CODE = M.EMP_MGT';
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query", (error as Error).message);
            return [];
        } finally {
            await client.end();
        }
    }

    async getAllEmployeeNameAndSalary(): Promise<EmployeeNameAndSalary[]> {
        const query = 'SELECT EMP_NAME, EMP_SAL FROM employee ORDER BY EMP_SAL DESC, EMP_NAME';
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query", (error as Error).message);
            return [];
        } finally {
            await client.end();
        }
    }

    async getEmployeesSalaryDataByRoleFromSalaryAvg(threshold: number): Promise<{
        emp_rcode: string;
        avg: number;
        max: number;
        min: number;
    }[]> {
        // const query = 'SELECT EMP_RCODE, avg, min, max ' +
        //                     'FROM (SELECT EMP_RCODE, avg(EMP_SAL) AS avg, min(EMP_SAL) AS min, max(EMP_SAL) AS max FROM employee ' +
        //                     'GROUP BY EMP_RCODE) ' +
        //                     'WHERE avg >= $1';

        const query = 'SELECT EMP_RCODE, avg(EMP_SAL), min(EMP_SAL), max(EMP_SAL) ' +
                            'FROM employee ' +
                            'GROUP BY EMP_RCODE ' +
                            'HAVING AVG(EMP_SAL) >= $1';

        const client = await setConnection();

        try {
            const result = await client.query(query, [threshold]);
            return result.rows.map((row) => { return { ...row, avg: parseFloat(row.avg) } });
        } catch (error) {
            console.error("Error executing query", (error as Error).message);
            return [];
        } finally {
            await client.end();
        }
    }

    async getEmployeesByHigherThanAvgSalary(): Promise<EmployeeNameAndSalary[]> {
        const query = 'SELECT EMP_NAME, EMP_SAL ' +
            'FROM employee ' +
            'WHERE EMP_SAL > (SELECT avg(EMP_SAL) AS avg FROM employee)';

        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query", (error as Error).message);
            return [];
        } finally {
            await client.end();
        }
    }

    async updateDramaOpenDateIfNull(date: string): Promise<number> {
        const query = 'UPDATE drama SET DRM_OPDATE = $1 WHERE DRM_OPDATE IS NULL';
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            const result = await client.query(query, [date]);
            await client.query("COMMIT");
            return result.rowCount || 0;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error executing query", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }

    async updateEmployeeRoleAndSalary(code: string, roleName: EmployeeRole, salaryPercentage: number): Promise<number> {
        const ROLE_MAP: Record<EmployeeRole, string> = {
            '엔터테이너': "R001",
            '국장': "R002",
            '실장': "R003",
            '대리': "R004",
            '사원': "R005",
            '이사': "R006",
            '사장': "R007",
        };

        const roleCode = ROLE_MAP[roleName];
        const newSalary = Math.round(1 + (salaryPercentage * 0.01));
        const query = 'UPDATE employee SET EMP_RCODE = $1, EMP_SAL = EMP_SAL * $2 WHERE EMP_CODE = $3';
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            const result = await client.query(query, [
                roleCode,
                newSalary,
                code,
            ]);
            await client.query("COMMIT");
            return result.rowCount || 0;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error executing query", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }

    async insertEmployee(employee: Employee): Promise<number> {
        const query = 'INSERT INTO employee (EMP_CODE, EMP_NAME, EMP_MGT, EMP_SAL, EMP_RCODE) VALUES ($1, $2, $3, $4, $5)';
        const client = await setConnection();

        try {
            let resultCount = 0;
            await client.query("BEGIN");
            let result = await client.query(query, [
                employee.emp_code,
                employee.emp_name,
                employee.emp_mgt,
                employee.emp_sal,
                employee.emp_rcode,
            ]);
            resultCount += result.rowCount || 0;
            await client.query("COMMIT");
            return resultCount;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error executing query", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }

    async deleteEmployee(code: string): Promise<number> {
        const query = 'DELETE FROM employee WHERE EMP_CODE = $1';
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            const result = await client.query(query, [code]);
            await client.query("COMMIT");
            return result.rowCount || 0;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error executing query", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }
}