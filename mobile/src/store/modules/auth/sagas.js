import { takeLatest, all, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, '/login-student', { id });

    const { name } = response.data;

    Alert.alert('Sucesso!', `Seja bem vindo ${name}!`);

    yield put(signInSuccess(id, name));
  } catch (err) {
    Alert.alert('Falha!', 'Não foi possível encontrar um aluno com este ID!');

    yield call(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
