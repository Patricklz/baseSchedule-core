import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import User from '../models/user';
import Appointments from '../models/appointment';

class ScheduleController {
    async index(req, res) {
        const checkUserProvider = await User.findOne({ where: { id: req.userId, provider: true } });

        if (!checkUserProvider) {
            return res.status(401).json({ error: 'User is not a provider ' });
        }

        const { date } = req.query;
        const parsedDate = parseISO(date);

        const appoitments = await Appointments.findAll({
            where: {
                provider_id: req.userId,
                canceled_at: null,
                date: {
                    [Op.between]: [
                        startOfDay(parsedDate), endOfDay(parsedDate)],
                },
            },
            order: ['date'],
        });

        return res.json(appoitments);
    }
}

export default new ScheduleController();
