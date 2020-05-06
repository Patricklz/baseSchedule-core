import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/user';
import File from '../models/file';
import AuthConfig from '../../config/auth-config';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url'],
                },
            ],
        });

        if (!user) {
            return res.status(401).json({ error: 'usuário não encontrado ' });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'pass' });
        }

        const { id, name, avatar, provider } = user;

        return res.json({
            user: { id, name, email, provider, avatar },
            token: jwt.sign({ id }, AuthConfig.authPass, {
                expiresIn: AuthConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
