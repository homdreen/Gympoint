import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { Lottie } from '@crello/react-lottie';
import { toast } from 'react-toastify';

import { MdAdd, MdCheckCircle } from 'react-icons/md';

import api from '~/services/api';

import {
  Container,
  Content,
  Button,
  RegistrationsList,
  RegistrationsTable,
} from './styles';

import loadingAnimation from '~/assets/loading.json';

export default function Registrations() {
  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  async function loadRegistrations() {
    setLoading(true);
    const response = await api.get('/registrations');

    const data = response.data.map(registration => ({
      ...registration,
      startDateFormatted: format(
        parseISO(registration.start_date),
        "d 'de' MMMM 'de' yyyy",
        { locale: pt }
      ),
      endDateFormatted: format(
        parseISO(registration.end_date),
        "d 'de' MMMM 'de' yyyy",
        { locale: pt }
      ),
    }));

    setLoading(false);
    setRegistrations(data);
  }

  useEffect(() => {
    loadRegistrations();
  }, []);

  async function handleRemove(id) {
    const decision = window.confirm(
      'Você deseja realmente remover este aluno?'
    );

    if (decision === true) {
      try {
        await api.delete(`/students/${id}`);
        toast.success('Matrícula removida com sucesso!');
        loadRegistrations();
      } catch (err) {
        toast.error('Não foi possível remover esta matrícula!');
      }
    }
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciando matrículas</h1>
        <aside>
          <Link to="/registrations/new">
            <Button type="button">
              <MdAdd size={20} color="#FFF" />
              CADASTRAR
            </Button>
          </Link>
        </aside>
      </Content>

      <RegistrationsList>
        {loading ? (
          <Lottie
            height={200}
            config={{ animationData: loadingAnimation, loop: true }}
          />
        ) : (
          <RegistrationsTable>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th>PLANO</th>
                <th>INÍCIO</th>
                <th>TÉRMINO</th>
                <th>ATIVA</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {registrations.map((student, i) => (
                <tr key={i}>
                  <td>{student.Student.name}</td>
                  <td>{student.Plan.title}</td>
                  <td>{student.startDateFormatted}</td>
                  <td>{student.endDateFormatted}</td>
                  <td>
                    {student.active ? (
                      <MdCheckCircle size={20} color="#42cb59" />
                    ) : (
                      <MdCheckCircle size={20} color="#ddd" />
                    )}
                  </td>
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
          </RegistrationsTable>
        )}
      </RegistrationsList>
    </Container>
  );
}
