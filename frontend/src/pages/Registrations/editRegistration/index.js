import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, addMonths, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { MdAdd, MdChevronLeft } from 'react-icons/md';
import { Input, Select } from '@rocketseat/unform';
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

export default function EditRegistration({ location }) {
  const { state: registration } = location;

  const [startDate, setStartDate] = useState(
    format(parseISO(registration.start_date), 'yyyy-MM-dd')
  );
  const [computedDuration, setComputedDuration] = useState(1);
  const [computedPrice, setComputedPrice] = useState(0);
  const [plans, setPlans] = useState([]);

  const endDate = useMemo(() => {
    return format(
      addMonths(parseISO(startDate), computedDuration),
      'MM-dd-yyyy'
    );
  }, [computedDuration, startDate]);

  const formattedPrice = useMemo(() => {
    return formatPrice(computedPrice * computedDuration);
  }, [computedDuration, computedPrice]);

  async function loadPlans() {
    const response = await api.get('/plans');

    const data = response.data.plans.map(plan => ({
      id: plan.id,
      title: plan.title,
      duration: plan.duration,
      price: plan.price,
    }));

    setPlans(data);
  }

  useEffect(() => {
    loadPlans();
    setComputedDuration(registration.Plan.duration);
    setComputedPrice(registration.Plan.price);
  }, [registration.Plan.duration, registration.Plan.price]);

  function handleChange(e) {
    const { value } = e.target;

    plans.forEach(plan => {
      if (plan.id === Number(value)) {
        setComputedDuration(plan.duration);
        setComputedPrice(plan.price);
      }
    });
  }

  async function handleSubmit({ plan_id, start_date }) {
    try {
      await api.put(`/registrations/${registration.id}`, {
        student_id: registration.Student.id,
        plan_id,
        start_date,
      });
      toast.success('Matrícula atualizada com sucesso!');
    } catch (err) {
      toast.error('Não foi possível atualizar esta matrícula');
    }
    history.push('/registrations');
  }

  return (
    <Container>
      <Content>
        <h1>Cadastro de matrícula</h1>
        <aside>
          <Link to="/registrations">
            <Button color="#CCC">
              <MdChevronLeft size={20} color="#FFF" />
              VOLTAR
            </Button>
          </Link>
          <Button form="edit-registration" type="submit" color="#EE4D64">
            <MdAdd size={20} color="#FFF" />
            SALVAR
          </Button>
        </aside>
      </Content>

      <FormContent id="edit-registration" onSubmit={handleSubmit}>
        <div>
          <p>ALUNO</p>
          <Input
            type="text"
            value={registration.Student.name}
            name="name"
            disabled
          />
        </div>

        <LastRow>
          <LastRowItem>
            <p>PLANO</p>
            <Select
              name="plan_id"
              defaultValue={registration.Plan.id}
              placeholder={registration.Plan.title}
              options={plans}
              onChange={e => handleChange(e)}
            />
          </LastRowItem>

          <LastRowItem>
            <p>DATA DE INÍCIO</p>
            <Input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              name="start_date"
            />
          </LastRowItem>

          <LastRowItem>
            <p>DATA DE TÉRMINO</p>
            <Input
              type="text"
              name="endDate"
              value={endDate}
              disabled
              placeholder="Preço total do plano"
            />
          </LastRowItem>

          <LastRowItem>
            <p>VALOR FINAL</p>
            <Input
              type="text"
              name="totalPrice"
              value={formattedPrice}
              disabled
              placeholder="Preço total do plano"
            />
          </LastRowItem>
        </LastRow>
      </FormContent>
    </Container>
  );
}

EditRegistration.propTypes = {
  location: PropTypes.shape().isRequired,
};
