import React, { useEffect, useState } from 'react';
import { Lottie } from '@crello/react-lottie';

import { MdAdd, MdSearch } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';

import { Container, Content, Button, StudentsList } from './styles';

import loadingAnimation from '~/assets/loading.json';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      setLoading(true);
      const response = await api.get('/students');

      setLoading(false);
      setStudents(response.data);
    }

    loadStudents();
  }, []);

  function handleSubmit({ name }) {
    console.log(name);
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
          <h1>Carregado</h1>
        )}
      </StudentsList>
    </Container>
  );
}
