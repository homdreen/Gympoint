import * as Yup from 'yup';
import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentsController {
  async index(req, res) {
    /*
     * Função que lista todos os alunos cadastrados
     */
    if (req.query.q) {
      const { q: query } = req.query;

      const students = await Student.findAll({
        where: {
          name: {
            [Op.iLike]: `%${query}%`,
          },
        },
      });

      return res.status(200).json({ students });
    }

    const students = await Student.findAll();
    return res.status(200).json({ students });
  }

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

    const schemaBody = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    const schemaParams = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (
      !(await schemaBody.isValid(req.body)) ||
      !(await schemaParams.isValid(req.params))
    ) {
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

  async delete(req, res) {
    /*
     * Função que remove um aluno a partir do seu id
     */

    const schema = Yup.object().shape({
      id: Yup.number(),
    });

    if (!schema.isValid(req.params)) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(401).json({ error: 'Could not find this student' });
    }

    await Student.destroy({ where: { id: req.params.id } });

    return res.status(200).json({ message: 'User successful deleted' });
  }
}

export default new StudentsController();
