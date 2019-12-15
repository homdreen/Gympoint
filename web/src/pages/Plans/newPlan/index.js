import React from 'react';
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

export default function newStudent() {
  async function handleSubmit({ name, email, age, weight, height }) {
    const response = await api.post('/students', {
      name,
      email,
      age,
      weight,
      height,
    });

    if (response.data) {
      toast.success('Plano criado com sucesso!');
      history.push('/plans');
    } else {
      toast.error(
        'Não foi possível criar este plano, verifique os dados inseridos!'
      );
    }
  }

  return (
    <Container>
      <Content>
        <h1>Cadastro de aluno</h1>
        <aside>
          <Link to="/plans">
            <Button color="#CCC">
              <MdChevronLeft size={20} color="#FFF" />
              VOLTAR
            </Button>
          </Link>
          <Button type="submit" color="#EE4D64">
            <MdAdd size={20} color="#FFF" />
            SALVAR
          </Button>
        </aside>
      </Content>

      <FormContent onSubmit={handleSubmit}>
        <div>
          <p>TÍTULO DO PLANO</p>
          <Input type="text" name="title" placeholder="Título do novo plano" />
        </div>

        <LastRow>
          <LastRowItem>
            <p>DURAÇÃO (em meses)</p>
            <Input
              type="number"
              name="duration"
              placeholder="Duração do plano"
            />
          </LastRowItem>

          <LastRowItem>
            <p>PREÇO MENSAL</p>
            <Input
              type="number"
              step="0.01"
              name="price"
              placeholder="Preço do plano"
            />
          </LastRowItem>

          <LastRowItem>
            <p>PREÇO TOTAL</p>
            <Input
              type="number"
              step="0.01"
              name="height"
              disabled
              placeholder="Altura do aluno"
            />
          </LastRowItem>
        </LastRow>

        <button type="submit" hidden />
      </FormContent>
    </Container>
  );
}
