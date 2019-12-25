import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/authConfig';

class SessionController {
  async store(req, res) {
    /*
     * Função que autentica o usuário
     */
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res
        .status(401)
        .json({ error: 'Information received does not match' });
    }

    const { id, name } = user;

    return res.status(200).json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id, name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
