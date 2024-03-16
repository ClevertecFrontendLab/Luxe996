import { Button, Calendar, Layout, Modal } from 'antd';
import { AppHeader } from '@components/layout/app-header/app-header';
import s from './calendar.module.scss';
import 'moment/locale/ru';
import { Locale } from '@constants/locale';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../../selectors';
import { catalogTC, ResetStateAC } from '@redux/reducers/calendar-reducer';
import { CloseCircleOutlined } from '@ant-design/icons';
import { DayData } from '@components/calendar/day-data';

// moment.updateLocale('ru', {
//     week: {
//         dow: 1,
//     },
// });

export const CalendarPage = () => {
    const dispatch = useAppDispatch();
    const { trainings, catalogList, isCatalogError } = useAppSelector(calendarSelector);

    console.log(catalogList);

    useEffect(() => {
        dispatch(ResetStateAC());
        dispatch(catalogTC());
    }, [dispatch]);

    const cancelModal = () => {
        dispatch(ResetStateAC());
    };
    const getCatalog = () => {
        dispatch(ResetStateAC());
        dispatch(catalogTC());
    };

    return (
        <Layout>
            <AppHeader />
            <Calendar
                className={s.calendar}
                locale={Locale}
                dateCellRender={(date) => <DayData date={date} trainings={trainings} />}
            />
            <Modal
                open={isCatalogError}
                onCancel={cancelModal}
                footer={null}
                centered
                maskStyle={{ background: '#799CD41A', backdropFilter: 'blur(5px)' }}
            >
                <div className={s.error}>
                    <CloseCircleOutlined style={{ color: 'blue', fontSize: 34 }} />
                    <div className={s.content}>
                        <p className={s.title} data-test-id='modal-error-user-training-title'>
                            При открытии данных произошла ошибка
                        </p>
                        <p
                            className={s.description}
                            data-test-id='modal-error-user-training-subtitle'
                        >
                            Попробуйте ещё раз.
                        </p>
                        <Button
                            className={s.btn}
                            data-test-id='modal-error-user-training-button'
                            type='primary'
                            onClick={getCatalog}
                        >
                            Повторить
                        </Button>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
};
