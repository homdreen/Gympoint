import * as Yup from 'yup';

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

    await Queue.add(RegistrationMail.key, { newRegistration });

    return res.status(200).json(newRegistration);
  }

  async update(req, res) {
    /*
     * Função que altera uma matricula com base no id indicado
     */

    const schemaBody = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    const schemaParams = Yup.object().shape({
      id: Yup.number(),
    });

    if (
      !(await schemaBody.isValid(req.body)) ||
      !(await schemaParams.isValid(req.params))
    ) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

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
      attributes: ['id', 'start_date', 'end_date', 'price'],
    });

    return res.status(200).json(updatedRegistration);
  }

  async delete(req, res) {
    /*
     * Função que remove uma matricula a partir id
     */

    const schema = Yup.object().shape({
      id: Yup.number(),
    });

    if (!schema.isValid(req.params)) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

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
