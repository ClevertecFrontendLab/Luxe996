import { Calendar, Layout } from 'antd';
import { AppHeader } from '@components/layout/app-header/app-header';
import s from './calendar.module.scss';
import moment from 'moment';
import 'moment/locale/ru';
import { Locale } from '@constants/locale';

moment.locale('ru');

export const CalendarPage = () => {
    return (
        <Layout>
            <AppHeader />
            <Calendar className={s.calendar} locale={Locale} />
        </Layout>
    );
};
