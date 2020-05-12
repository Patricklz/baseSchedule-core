import User from '../models/user';
import Notification from '../schemas/NotificationSchema';

class NotificationController {
    async index(req, res) {
        const isProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!isProvider) {
            return res.status(401).json({ error: 'You can only see the appointments with providers' });
        }

        const notifications = await Notification.find({
            user: req.userId,
        }).sort({ createdAt: 'desc' }).limit(20)

        return res.json(notifications);
    }

    async update(req, res) {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });

        return res.json(notification);
    }
}

export default new NotificationController();
