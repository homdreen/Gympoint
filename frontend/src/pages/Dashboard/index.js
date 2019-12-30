import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lottie } from '@crello/react-lottie';
import { toast } from 'react-toastify';

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
  async function loadStudents() {
    setLoading(true);
    const response = await api.get('/students');

    setLoading(false);
    setStudents(response.data.students);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function handleSubmit({ name }) {
    setLoading(true);
    const response = await api.get(`/students?q=${name}`);

    const { students: studentsFromQuery } = response.data;

    if (studentsFromQuery.length === 0) {
      toast.error('Não foi possível encontrar alunos com estes dados!');
    } else {
      setStudents(studentsFromQuery);
    }

    setLoading(false);
  }

  async function handleRemove(id) {
    const decision = window.confirm(
      'Você deseja realmente remover este aluno?'
    );

    if (decision === true) {
      try {
        await api.delete(`/students/${id}`);
        toast.success('Aluno removido com sucesso!');
        loadStudents();
      } catch (err) {
        toast.error('Não foi possível remover este aluno!');
      }
    }
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciando alunos</h1>
        <aside>
          <Link to="/dashboard/new">
            <Button type="button">
              <MdAdd size={20} color="#FFF" />
              CADASTRAR
            </Button>
          </Link>

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
                      <Link
                        to={{ pathname: '/dashboard/edit', state: student }}
                      >
                        editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleRemove(student.id)}
                      >
                        apagar
                      </button>
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
