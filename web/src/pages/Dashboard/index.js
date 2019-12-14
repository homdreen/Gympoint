import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lottie } from '@crello/react-lottie';

import { MdAdd, MdSearch } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';

import {
  Container,
  Content,
  Button,
  StudentsList,
  StudentsTable,
} from './styles';

import loadingAnimation from '~/assets/loading.json';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      setLoading(true);
      const response = await api.get('/students');

      setLoading(false);
      setStudents(response.data.students);
    }

    loadStudents();
  }, []);

  async function handleSubmit({ name }) {
    setLoading(true);
    const response = await api.get(`/students?q=${name}`);

    setStudents(response.data.students);

    setLoading(false);
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciando alunos</h1>
        <aside>
          <Button type="button">
            <MdAdd size={20} color="#FFF" />
            CADASTRAR
          </Button>

          <Form onSubmit={handleSubmit}>
            <MdSearch size={20} color="#999" />
            <Input type="text" name="name" placeholder="Buscar aluno" />
            <button type="submit" hidden />
          </Form>
        </aside>
      </Content>

      <StudentsList>
        {loading ? (
          <Lottie
            height={200}
            config={{ animationData: loadingAnimation, loop: true }}
          />
        ) : (
          <StudentsTable>
            <thead>
              <tr>
                <th>NOME</th>
                <th>E-MAIL</th>
                <th>IDADE</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <tr key={i}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <div>
                      <Link to="/">editar</Link>
                      <Link to="/">apagar</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </StudentsTable>
        )}
      </StudentsList>
    </Container>
  );
}
