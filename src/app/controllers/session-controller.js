import jwt from 'jsonwebtoken';

import User from '../models/user';
import AuthConfig from '../../config/auth-config';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'usuário não encontrado ' });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'pass' });
        }

        const { id, name } = user;

        return res.json({
            user: { id, name, email },
            token: jwt.sign({ id }, AuthConfig.authPass, {
                expiresIn: AuthConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
