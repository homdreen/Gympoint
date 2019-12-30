import React, { useState, useMemo } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { MdAdd, MdChevronLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { formatPrice } from '~/util/format_price';

import {
  Container,
  Content,
  Button,
  FormContent,
  LastRow,
  LastRowItem,
} from './styles';

const schema = Yup.object().shape({
  title: Yup.string('Necessário um texto válido').required(
    'Este campo é obrigatório'
  ),
  duration: Yup.number('Campo aceita apenas números').required(
    'Este campo é obrigatório'
  ),
  price: Yup.number('Campo aceita apenas números').required(
    'Este campo é obrigatório'
  ),
});

export default function NewPlan() {
  const [computedPrice, setComputedPrice] = useState(0);
  const [computedDuration, setComputedDuration] = useState(1);

  const totalPrice = useMemo(() => {
    return formatPrice(computedDuration * computedPrice);
  }, [computedDuration, computedPrice]);

  async function handleSubmit({ title, duration, price }) {
    const response = await api.post('/plans', { title, duration, price });

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
        <h1>Cadastro de plano</h1>
        <aside>
          <Link to="/plans">
            <Button color="#CCC">
              <MdChevronLeft size={20} color="#FFF" />
              VOLTAR
            </Button>
          </Link>
          <Button form="new-plan" type="submit" color="#EE4D64">
            <MdAdd size={20} color="#FFF" />
            SALVAR
          </Button>
        </aside>
      </Content>

      <FormContent id="new-plan" schema={schema} onSubmit={handleSubmit}>
        <div>
          <p>TÍTULO DO PLANO</p>
          <Input type="text" name="title" placeholder="Título do novo plano" />
        </div>

        <LastRow>
          <LastRowItem>
            <p>DURAÇÃO (em meses)</p>
            <Input
              value={computedDuration}
              type="number"
              name="duration"
              onChange={e => setComputedDuration(e.target.value)}
              placeholder="Duração do plano"
            />
          </LastRowItem>

          <LastRowItem>
            <p>PREÇO MENSAL</p>
            <Input
              value={computedPrice}
              type="number"
              step="0.01"
              name="price"
              onChange={e => setComputedPrice(e.target.value)}
              placeholder="Preço do plano"
            />
          </LastRowItem>

          <LastRowItem>
            <p>PREÇO TOTAL</p>
            <Input
              value={totalPrice}
              type="text"
              name="totalPrice"
              disabled
              placeholder="Preço total do plano"
            />
          </LastRowItem>
        </LastRow>

        <button type="submit" hidden />
      </FormContent>
    </Container>
  );
}
