import React, { useState, useEffect, useCallback } from 'react';
import * as Yup from 'yup';
import { Lottie } from '@crello/react-lottie';
import { Form, Textarea } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import api from '~/services/api';

import loadingAnimation from '~/assets/loading.json';
import Modal from '~/components/Modal';
import {
  Container,
  HelpOrdersList,
  HelpOrdersTable,
  ModalContent,
  Title,
  Question,
  Button,
} from './styles';

const schema = Yup.object().shape({
  answer: Yup.string('Campo aceita apenas textos válidos').required(
    'Este campo é obrigatório'
  ),
});

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [currentHelpOrder, setCurrentHelpOrder] = useState({});
  const [helpOrders, setHelpOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const escFunction = useCallback(e => {
    if (e.keyCode === 27) {
      setModalVisible(false);
    }
  }, []);

  async function loadHelpOrders() {
    setLoading(true);
    const response = await api.get('/help-orders');

    setHelpOrders(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadHelpOrders();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  function handleModalOpen(helpOrder) {
    setCurrentHelpOrder(helpOrder);
    setModalVisible(true);
  }

  async function handleSubmit({ answer }) {
    try {
      const response = await api.post(`/help-orders/${currentHelpOrder.id}`, {
        answer,
      });

      if (response.data) {
        toast.success('Auxílio respondido com sucesso!');
      }
    } catch (err) {
      toast.error('Não foi possível responder este auxílio!');
    }

    loadHelpOrders();
    setModalVisible(false);
  }

  return (
    <Container>
      <h1>Pedidos de auxílio</h1>

      <Modal show={modalVisible}>
        <ModalContent>
          <Title>ALUNO</Title>
          <Question>{currentHelpOrder.question}</Question>

          <Title>SUA RESPOSTA</Title>
          <Form onSubmit={handleSubmit} schema={schema}>
            <Textarea name="answer" placeholder="Digite sua resposta" />
            <Button type="submit">Responder aluno</Button>
          </Form>
        </ModalContent>
      </Modal>

      <HelpOrdersList>
        {loading ? (
          <Lottie
            height={200}
            config={{ animationData: loadingAnimation, loop: true }}
          />
        ) : (
          <HelpOrdersTable>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {helpOrders.map((helpOrder, i) => (
                <tr key={i}>
                  <td>{helpOrder.Student.name}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleModalOpen(helpOrder)}
                    >
                      responder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </HelpOrdersTable>
        )}
      </HelpOrdersList>
    </Container>
  );
}
