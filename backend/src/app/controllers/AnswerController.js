import { Op } from 'sequelize';

import Student from '../models/Student';
import HelpOrders from '../models/HelpOrders';

import HelpOrderAnswered from '../jobs/HelpOrderAnswered';
import Queue from '../../lib/Queue';

class AnswerController {
  async index(req, res) {
    /*
     * Função que lista auxilios não respondidos
     */

    const helpOrders = await HelpOrders.findAll({
      where: {
        answer: {
          [Op.eq]: null,
        },
      },
      include: [
        {
          model: Student,
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json(helpOrders);
  }

  async store(req, res) {
    /*
     * Função para responder um auxilio
     */

    const { id } = req.params;

    const helpOrder = await HelpOrders.findByPk(id, {
      include: [
        {
          model: Student,
          attributes: ['name', 'email', 'age', 'weight', 'height'],
        },
      ],
    });

    if (!helpOrder) {
      return res
        .status(401)
        .json({ error: 'Could not be able find this help order' });
    }

    const { answer } = req.body;
    await helpOrder.update({ answer, answer_at: new Date().toISOString() });

    await Queue.add(HelpOrderAnswered.key, { helpOrder });

    return res.status(200).json(helpOrder);
  }
}

export default new AnswerController();
