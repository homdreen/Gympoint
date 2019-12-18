import * as Yup from 'yup';

import Student from '../models/Student';

class LoginStudentController {
  async index(req, res) {
    /**
     * Função que faz "login" de um aluno no aplicativo
     */

    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.body;

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res
        .status(401)
        .json({ error: 'Could not able to find this student!' });
    }

    const { name, email } = studentExists;

    return res.status(200).json({ id, name, email });
  }
}

export default new LoginStudentController();
