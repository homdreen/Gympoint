import React, { useState, useMemo, useEffect } from 'react';
import * as Yup from 'yup';
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

const schema = Yup.object().shape({
  student_id: Yup.number().required('Este campo é obrigatório'),
  plan_id: Yup.number('').required('Este campo é obrigatório'),
  start_date: Yup.string().required('Este campo é obrigatório'),
});

export default function NewRegistration() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [computedDuration, setComputedDuration] = useState(1);
  const [computedPrice, setComputedPrice] = useState(0);
  const [students, setStudents] = useState([]);
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

  async function loadStudents() {
    const response = await api.get('/students');

    const data = response.data.students.map(student => ({
      id: student.id,
      title: student.name,
    }));

    setStudents(data);
  }

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
    loadStudents();
    loadPlans();
  }, []);

  function handleChange(e) {
    const { value } = e.target;

    plans.forEach(plan => {
      if (plan.id === Number(value)) {
        setComputedDuration(plan.duration);
        setComputedPrice(plan.price);
      }
    });
  }

  async function handleSubmit({ student_id, plan_id, start_date }) {
    try {
      await api.post('/registrations', { student_id, plan_id, start_date });
      toast.success('Aluno matriculado com sucesso!');
    } catch (err) {
      toast.error('Não foi possível matricular este aluno');
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
          <Button form="new-registration" type="submit" color="#EE4D64">
            <MdAdd size={20} color="#FFF" />
            SALVAR
          </Button>
        </aside>
      </Content>

      <FormContent
        id="new-registration"
        schema={schema}
        onSubmit={handleSubmit}
      >
        <div>
          <p>ALUNO</p>
          <Select
            name="student_id"
            defaultValue="0"
            placeholder="Selecione o aluno"
            options={students}
          />
        </div>

        <LastRow>
          <LastRowItem>
            <p>PLANO</p>
            <Select
              name="plan_id"
              defaultValue="0"
              placeholder="Selecione o plano"
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

        <button type="submit" hidden />
      </FormContent>
    </Container>
  );
}
