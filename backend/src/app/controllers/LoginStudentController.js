import Student from '../models/Student';

class LoginStudentController {
  async index(req, res) {
    /**
     * Função que faz "login" de um aluno no aplicativo
     */

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
