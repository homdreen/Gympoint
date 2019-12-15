import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdAdd, MdChevronLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  Content,
  Button,
  FormContent,
  LastRow,
  LastRowItem,
} from './styles';

export default function editStudent({ location }) {
  const { state: student } = location;

  async function handleSubmit({ name, email, age, weight, height }) {
    const response = await api.put(`/students/${student.id}`, {
      name,
      email,
      age,
      weight,
      height,
    });

    if (response.data) {
      toast.success('Aluno editado com sucesso!');
      history.push('/dashboard');
    } else {
      toast.error(
        'Não foi possível editar este aluno, verifique os dados inseridos!'
      );
    }
  }

  return (
    <Container>
      <Content>
        <h1>Edição de aluno</h1>
        <aside>
          <Link to="/dashboard">
            <Button color="#CCC">
              <MdChevronLeft size={20} color="#FFF" />
              VOLTAR
            </Button>
          </Link>
          <Button form="edit-student" type="submit" color="#EE4D64">
            <MdAdd size={20} color="#FFF" />
            SALVAR
          </Button>
        </aside>
      </Content>

      <FormContent
        id="edit-student"
        initialData={student}
        onSubmit={handleSubmit}
      >
        <div>
          <p>NOME COMPLETO</p>
          <Input type="text" name="name" placeholder="Nome completo do aluno" />
        </div>

        <div>
          <p>ENDEREÇO DE E-MAIL</p>
          <Input type="email" name="email" placeholder="E-mail do aluno" />
        </div>

        <LastRow>
          <LastRowItem>
            <p>IDADE</p>
            <Input type="number" name="age" placeholder="Idade do aluno" />
          </LastRowItem>

          <LastRowItem>
            <p>PESO (em kg)</p>
            <Input
              type="number"
              step="0.01"
              name="weight"
              placeholder="Peso do aluno"
            />
          </LastRowItem>

          <LastRowItem>
            <p>ALTURA</p>
            <Input
              type="number"
              step="0.01"
              name="height"
              placeholder="Altura do aluno"
            />
          </LastRowItem>
        </LastRow>
      </FormContent>
    </Container>
  );
}

editStudent.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.element,
  }).isRequired,
};
