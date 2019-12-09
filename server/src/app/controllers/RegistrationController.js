import * as Yup from 'yup';

import { addMonths, parseISO } from 'date-fns';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Registration from '../models/Registration';

class RegistrationController {
  async index(req, res) {
    /*
     * Função que matricula um estudante de acordo com o plano escolhido
     */

    const registrations = await Registration.findAll({
      include: [
        {
          model: Student,
          attributes: ['name', 'email', 'age', 'weight', 'height'],
        },
        {
          model: Plan,
          attributes: ['title', 'duration', 'price'],
        },
      ],
      attributes: ['id', 'start_date', 'end_date', 'price'],
    });

    return res.status(200).json(registrations);
  }

  async store(req, res) {
    /*
     * Função que matricula um estudante de acordo com o plano escolhido
     */

    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { student_id, plan_id, start_date } = req.body;
    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res
        .status(401)
        .json({ error: 'Could not able to find this student!' });
    }

    const planExists = await Plan.findByPk(plan_id);

    if (!planExists) {
      return res
        .status(401)
        .json({ error: 'Could not able to find this plan!' });
    }

    const { duration, price: pricePlan } = planExists;

    const end_date = addMonths(parseISO(start_date), duration);
    const price = pricePlan * duration;

    const { id } = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    const newRegistration = await Registration.findByPk(id, {
      include: [
        {
          model: Student,
          attributes: ['name', 'email', 'age', 'weight', 'height'],
        },
        {
          model: Plan,
          attributes: ['title', 'duration', 'price'],
        },
      ],
      attributes: ['id', 'start_date', 'end_date', 'price'],
    });

    return res.status(200).json(newRegistration);
  }
}

export default new RegistrationController();
