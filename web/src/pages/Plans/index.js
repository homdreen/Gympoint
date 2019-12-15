import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lottie } from '@crello/react-lottie';
import { formatDistanceStrict, addMonths } from 'date-fns';
import { pt } from 'date-fns/locale';

import { MdAdd } from 'react-icons/md';

import { formatPrice } from '~/util/format_price';
import api from '~/services/api';

import {
  Container,
  Content,
  Button,
  StudentsList,
  StudentsTable,
} from './styles';

import loadingAnimation from '~/assets/loading.json';

export default function Plans() {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      setLoading(true);
      const response = await api.get('/plans');

      const data = response.data.plans.map(plan => ({
        ...plan,
        priceFormatted: formatPrice(plan.price),
        durationFormatted: formatDistanceStrict(
          addMonths(new Date(), plan.duration),
          new Date(),
          { locale: pt }
        ),
      }));

      setLoading(false);
      setPlans(data);
    }

    loadStudents();
  }, []);

  function handleRemove(id) {
    console.log(id);
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciando Planos</h1>
        <aside>
          <Link to="/plans/new">
            <Button type="button">
              <MdAdd size={20} color="#FFF" />
              CADASTRAR
            </Button>
          </Link>
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
                <th>TÍTULO</th>
                <th>DURAÇÃO</th>
                <th>VALOR p/ MÊS</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, i) => (
                <tr key={i}>
                  <td>{plan.title}</td>
                  <td>{plan.durationFormatted}</td>
                  <td>{plan.priceFormatted}</td>
                  <td>
                    <div>
                      <Link to={{ pathname: '/plans/edit', state: plan }}>
                        editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleRemove(plan.id)}
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
