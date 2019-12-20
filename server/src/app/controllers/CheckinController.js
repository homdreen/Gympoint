import * as Yup from 'yup';
import { Op } from 'sequelize';
import { subDays } from 'date-fns';

import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    /*
     * Função que lista todos os checkins já feitos por um aluno
     */

    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res
        .status(401)
        .json({ error: 'Could not be able find this student' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
      },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json(checkins);
  }

  async store(req, res) {
    /*
     * Função que cadastra novo checkin com base no id da matrícula
     */

    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res
        .status(401)
        .json({ error: 'Could not be able find this student' });
    }

    const week = subDays(new Date(), 7);

    const weekCheckins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.gte]: week,
          [Op.lte]: new Date(),
        },
      },
    });

    if (weekCheckins.length + 1 > 5) {
      return res
        .status(401)
        .json({ error: 'You can only perform 5 checkins in a week' });
    }

    const checkin = await Checkin.create({ student_id: id });

    return res.status(200).json(checkin);
  }
}

export default new CheckinController();
