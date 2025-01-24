import type { Student } from "@student/student.ts";

export interface StudentService {
    getStudents(): Promise<Student[]>;
    getStudentByNo(no: string): Promise<Student>;
    getStudentByName(name: string): Promise<Student>;
    getStudentByBirthday(birthday: string): Promise<Student>;
    // Insert
    insertStudent(student: Student): Promise<number>;
    insertStudentsMulti(students: Student[]): Promise<number>;
    // Update
    updateStudent(student: Student): Promise<number>;
    updateStudentMulti(students: Student[]): Promise<number>;
    // Delete
    deleteStudentByNo(no: string): Promise<number>;
    deleteStudentNoMulti(students: Student[]): Promise<number>;
}