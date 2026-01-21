import { Context } from 'hono';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/database';
import { Student } from './student.model';

export async function getAllStudents(c: Context) {

  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM students');
    const data = rows as Student[];

    return c.json({ success: true, data }, 200);
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch students' }, 500);
  }
}

export async function createOneStudent(c: Context) {
  try {
    const body = await c.req.json() as Student;

    const [result] = await pool.query<ResultSetHeader>('INSERT INTO students (name, email, age, create_at) VALUES (?, ?, ?, ?)', [body.name, body.email, body.age, body.created_at]);
    const student = result.insertId;
    const payload = result as unknown as Student;

    return c.json({ success: true, data: payload }, 201);
  } catch (error) {
    console.error('Error creating student:', error);
    return c.json({ success: false, error: 'Failed to create student' }, 500);
  }
}

export async function deleteOneStudent(c: Context) {
  try {
    const { id } = c.req.param();
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM students WHERE id = ?', [id]);
    return c.json({ success: true, data: result }, 200);
  } catch (error) {
    console.error('Error deleting student:', error);
    return c.json({ success: false, error: 'Failed to delete student' }, 500);
  }
}

export async function updateOneStudent(c: Context) {
  // TODO: Implement update one student
  try {
    const { id } = c.req.param();
    const body = await c.req.json() as Student;
    const [result] = await pool.query<ResultSetHeader>('UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?', [body.name, body.email, body.age, id]);
    return c.json({ success: true, data: result }, 200);
  } catch (error) {
    console.error('Error updating student:', error);
    return c.json({ success: false, error: 'Failed to update student' }, 500);
  }
}