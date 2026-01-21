import { Hono } from 'hono';
import { createOneStudent, deleteOneStudent, getAllStudents, updateOneStudent } from './students.controller';

const app = new Hono();

app.get('/students', getAllStudents);

app.post('/students', createOneStudent);

app.delete('/students/:id', deleteOneStudent);

app.put('/students/:id', updateOneStudent);

export default app;