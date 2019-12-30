import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    /*
     * Função que lista planos cadastrados
     */

    const plans = await Plan.findAll();

    return res.status(200).json({ plans });
  }

  async store(req, res) {
    /*
     * Função que registra um novo plano
     */

    const planExists = await Plan.findOne({ where: { title: req.body.title } });

    if (planExists) {
      return res.status(401).json({ error: 'Plan already exists' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.status(200).json({ id, title, duration, price });
  }

  async update(req, res) {
    /*
     * Função que atualiza planos cadastrados com base no id
     */

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(401).json({ error: 'Unable to find this plan' });
    }

    if (req.body.title) {
      const { title } = req.body;
      if (title !== plan.title) {
        const planExists = await Plan.findOne({ where: { title } });

        if (planExists) {
          return res.status(401).json({ error: 'Plan already exists' });
        }
      }
    }

    await plan.update(req.body);

    const { id, title, duration, price } = await Plan.findByPk(req.params.id);

    return res.status(200).json({ id, title, duration, price });
  }

  async delete(req, res) {
    /*
     * Função que remove um plano a partir do seu id
     */

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(401).json({ error: 'Could not find this plan' });
    }

    await Plan.destroy({ where: { id: req.params.id } });

    return res.status(200).json({ message: 'Plan successful deleted' });
  }
}

export default new PlanController();
