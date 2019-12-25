import Student from '../models/Student';
import HelpOrders from '../models/HelpOrders';

class QuestionsController {
  async index(req, res) {
    /*
     * Função que lista auxilios de um aluno
     */

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res
        .status(401)
        .json({ error: 'Could not be able find this student' });
    }

    const helpOrders = await HelpOrders.findAll({
      where: { student_id: id },
      order: [['createdAt', 'DESC'], ['answer', 'DESC']],
    });

    return res.status(200).json(helpOrders);
  }

  async store(req, res) {
    /*
     * Função que cria um novo auxilio
     */

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res
        .status(401)
        .json({ error: 'Could not be able find this student' });
    }

    const { question } = req.body;

    const newHelp = await HelpOrders.create({ student_id: id, question });

    return res.status(200).json(newHelp);
  }
}

export default new QuestionsController();
