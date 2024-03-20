import { Button, Calendar, Layout, Modal } from 'antd';
import 'moment/locale/ru';
import { locale } from '@constants/locale';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../../selectors';
import { catalogTC, getTrainingTC, ResetStateAC } from '@redux/reducers/calendar-reducer';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../routes/path';
import moment, { Moment } from 'moment';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { DayData } from '@components/calendar/day-data';
import { AppHeader } from '@components/layout/app-header';
import s from './calendar.module.scss';

moment.updateLocale('ru', {
    week: {
        dow: 1,
    },
});

export const CalendarPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { xs } = useBreakpoint();

    const { trainings, isCatalogError, isTrainingsError, createError } =
        useAppSelector(calendarSelector);

    const [isPopoverVisible, setIsPopoverVisible] = useState<{ [key: string]: boolean }>({});
    const [selectedDate, setSelectedDate] = useState<Moment>(moment());

    const cancelModal = () => {
        dispatch(ResetStateAC());
    };
    const getCatalog = () => {
        dispatch(ResetStateAC());
        dispatch(catalogTC());
    };

    const onDateSelection = (date: Moment) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        dispatch(getTrainingTC());
    }, [dispatch]);
    useEffect(() => {
        isTrainingsError && navigate(Path.MAIN);
    }, [isTrainingsError, navigate]);
    useEffect(() => {
        if (trainings) {
            dispatch(ResetStateAC());
            dispatch(catalogTC());
        }
    }, [dispatch, trainings]);

    return (
        <Layout>
            <AppHeader />
            {trainings && (
                <Calendar
                    className={s.calendar}
                    fullscreen={!xs}
                    locale={locale}
                    onSelect={(date) => onDateSelection(date)}
                    dateCellRender={(date) => (
                        <DayData
                            date={date}
                            trainings={trainings}
                            isPopoverVisible={isPopoverVisible}
                            setIsPopoverVisible={setIsPopoverVisible}
                            isCurrentMonth={date.isSame(selectedDate, 'months')}
                        />
                    )}
                />
            )}

            <Modal
                open={isCatalogError || createError}
                onCancel={cancelModal}
                footer={null}
                centered
                maskStyle={{ background: '#799CD41A', backdropFilter: 'blur(5px)' }}
                closeIcon={<CloseOutlined data-test-id='modal-error-user-training-button-close' />}
            >
                <div className={s.error}>
                    <CloseCircleOutlined
                        style={{
                            color: isCatalogError ? '#2F54EBFF' : '#FF4D4FFF',
                            fontSize: '24px',
                        }}
                    />
                    <div className={s.content}>
                        <p className={s.title} data-test-id='modal-error-user-training-title'>
                            {`При ${
                                isCatalogError ? 'открытии' : 'сохранении'
                            } данных произошла ошибка`}
                        </p>
                        <p
                            className={s.description}
                            data-test-id='modal-error-user-training-subtitle'
                        >
                            {`${isCatalogError ? 'Попробуйте' : 'Придётся попробовать'} ещё раз`}
                        </p>
                        <Button
                            className={s.btn}
                            data-test-id='modal-error-user-training-button'
                            type='primary'
                            onClick={isCatalogError ? getCatalog : cancelModal}
                        >
                            {`${!isCatalogError ? 'Закрыть' : 'Обновить'}`}
                        </Button>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
};
