import { addMonths, parseISO } from 'date-fns';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Registration from '../models/Registration';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    /*
     * Função que lista todas as matrículas feitas
     */

    const registrations = await Registration.findAll({
      include: [
        {
          model: Student,
          attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
        },
        {
          model: Plan,
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
    });

    return res.status(200).json(registrations);
  }

  async store(req, res) {
    /*
     * Função que matricula um estudante de acordo com o plano escolhido
     */

    const { student_id, plan_id, start_date } = req.body;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res
        .status(401)
        .json({ error: 'Could not able to find this student!' });
    }

    const registrationExists = await Registration.findOne({
      where: { student_id },
    });

    if (registrationExists) {
      return res.status(401).json({ error: 'Student already registered' });
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
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
    });

    await Queue.add(RegistrationMail.key, { newRegistration });

    return res.status(200).json(newRegistration);
  }

  async update(req, res) {
    /*
     * Função que altera uma matricula com base no id indicado
     */
    const { student_id, plan_id, start_date } = req.body;
    const { id } = req.params;

    const registration = await Registration.findByPk(id);

    if (!registration) {
      return res
        .status(401)
        .json({ error: 'Could not be able find this registration' });
    }

    if (student_id !== registration.student_id) {
      const student = await Student.findByPk(student_id);

      if (!student) {
        return res
          .status(401)
          .json({ error: 'Could not be able find this student' });
      }
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res
        .status(401)
        .json({ error: 'Could not be able find this plan' });
    }

    const { duration, price: pricePlan } = plan;

    const end_date = addMonths(parseISO(start_date), duration);
    const price = pricePlan * duration;

    await registration.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    const updatedRegistration = await Registration.findByPk(id, {
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
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
    });

    return res.status(200).json(updatedRegistration);
  }

  async delete(req, res) {
    /*
     * Função que remove uma matricula a partir id
     */
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res
        .status(401)
        .json({ error: 'Could not find this registration' });
    }

    await Registration.destroy({ where: { id: req.params.id } });

    return res.status(200).json({ message: 'Registration successful deleted' });
  }
}

export default new RegistrationController();
