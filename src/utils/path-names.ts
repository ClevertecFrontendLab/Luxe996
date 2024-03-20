import { Path } from '../routes/path';

export const getPathName = (path: string) => {
    switch (path) {
        case Path.MAIN:
            return 'Главная';
        case Path.FEEDBACKS:
            return 'Отзывы пользователей';
        case Path.CALENDAR:
            return 'Календарь';

        default:
            return path;
    }
};
