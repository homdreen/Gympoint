import React from 'react';

import { MdAdd, MdSearch } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { Container, Content, Button } from './styles';

export default function Dashboard() {
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
            <Input type="text" name="name" />
            <button type="submit" hidden />
          </Form>
        </aside>
      </Content>
    </Container>
  );
}
