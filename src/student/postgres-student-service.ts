import type { StudentService } from "@student/student-service.ts";
import { Student } from "@student/student.ts";
import { setConnection } from "@common/postgres-access.ts";

export class PostgresStudentService implements StudentService {
    async getStudents(): Promise<Student[]> {
        const query = "SELECT * FROM student";
        const client = await setConnection();

        try {
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return []
        } finally {
            await client.end();
        }
    }

    async getStudentByNo(no: string): Promise<Student> {
        const query = "SELECT * FROM student WHERE no = $1";
        const client = await setConnection();

        try {
            const result = await client.query(query, [no]);
            return result.rows[0];
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return new Student();
        } finally {
            await client.end();
        }
    }

    async getStudentByName(name: string): Promise<Student> {
        const query = "SELECT * FROM student WHERE name = $1";
        const client = await setConnection();

        try {
            const result = await client.query(query, [name]);
            return result.rows[0];
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return new Student();
        } finally {
            await client.end();
        }
    }

    async getStudentByBirthday(birthday: string): Promise<Student> {
        const query = "SELECT * FROM student WHERE birthday = $1";
        const client = await setConnection();

        try {
            const result = await client.query(query, [birthday]);
            return result.rows[0];
        } catch (error) {
            console.error("Error executing query ", (error as Error).stack);
            return new Student();
        } finally {
            await client.end();
        }
    }

    // Insert
    async insertStudent(student: Student): Promise<number> {
        const query = "INSERT INTO student (no, name, birthday) VALUES ($1, $2, $3)";
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            const result = await client.query(query, [student.no, student.name, student.birthday]);

            await client.query("COMMIT");
            return result.rowCount || 0;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error executing query ", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }

    async insertStudentsMulti(students: Student[]): Promise<number> {
        const query = "INSERT INTO student (no, name, birthday) VALUES ($1, $2, $3)";
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            let result;
            let resultCount = 0;
            for (const student of students) {
                if (!student.no && !student.name)
                    break;
                result = await client.query(query, [
                    student.no,
                    student.name,
                    student.birthday
                ]);
                resultCount += result.rowCount || 0;
            }

            await client.query("COMMIT");
            return resultCount || 0;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error executing query ", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }

    async insertStudentsMultiBatch(students: Student[]): Promise<number> {
        const query = "INSERT INTO student (no, name, birthday) VALUES ($1, $2, $3)";
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            const promises = students.map(student => {
                if (!student.no && !student.name) return;
                return client.query(query, [
                    student.no,
                    student.name,
                    student.birthday
                ]);
            });

            const results = await Promise.all(promises);
            await client.query("COMMIT");
            return results.reduce((sum, result) => sum + ((result?.rowCount) || 0), 0);
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error executing query ", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }

    async updateStudent(student: Student): Promise<number> {
        const query = "UPDATE student SET birthday = $1 WHERE no = $2";
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            const result = await client.query(query, [student.birthday, student.no]);

            await client.query("COMMIT");
            return result.rowCount || 0;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error executing query ", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }

    async updateStudentMulti(students: Student[]): Promise<number> {
        const query = "UPDATE student SET birthday = $1 WHERE no = $2";
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            const promises = students.map(student => {
                if (!student.no && !student.birthday) return;
                return client.query(query, [
                    student.birthday,
                    student.no
                ]);
            });

            const results = await Promise.all(promises);
            await client.query("COMMIT");
            return results.reduce((sum, result) => sum + ((result?.rowCount) || 0), 0);
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error executing query ", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }

    async deleteStudentByNo(no: string): Promise<number> {
        const query = "DELETE FROM student WHERE no = $1";
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            const result = await client.query(query, [no]);
            await client.query("COMMIT");
            return result.rowCount || 0;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error executing query ", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }

    async deleteStudentNoMulti(students: Student[]): Promise<number> {
        const query = "DELETE FROM student WHERE no = $1";
        const client = await setConnection();

        try {
            await client.query("BEGIN");
            const promises = students.map(student => {
                if (!student.no && !student.birthday) return;
                return client.query(query, [student.no]);
            });

            const results = await Promise.all(promises);
            await client.query("COMMIT");
            return results.reduce((sum, result) => sum + ((result?.rowCount) || 0), 0);
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("Error executing query ", (error as Error).message);
            throw error;
        } finally {
            await client.end();
        }
    }
}