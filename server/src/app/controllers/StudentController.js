import * as Yup from 'yup';

import Student from '../models/Student';

class StudentsController {
  async store(req, res) {
    /*
     * Função que cadastra o aluno
     */

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { email } = req.body;

    const studentExists = await Student.findOne({ where: { email } });

    if (studentExists) {
      return res.status(401).json({ error: 'Student already registered' });
    }

    const { id, name, age, weight, height } = await Student.create(req.body);

    return res.status(200).json({ id, name, email, age, weight, height });
  }

  async update(req, res) {
    /*
     * Função que altera dados do aluno
     */

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;
    const { email } = req.body;

    const student = await Student.findByPk(id);

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(401).json({ error: 'Student already exists' });
      }
    }

    await student.update(req.body);

    const { name, age, weight, height } = await Student.findByPk(id);

    return res.status(200).json({ id, name, email, age, weight, height });
  }
}

export default new StudentsController();
