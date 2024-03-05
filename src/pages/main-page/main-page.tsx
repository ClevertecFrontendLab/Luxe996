import { Button, Layout, Modal, Result } from 'antd';
import s from './main-page.module.scss';
import AppHeader from '@components/layout/app-header/app-header';
import { AppContent } from '@components/app-content/app-content';
import { AppCard } from '@components/app-card/app-card';
import { HeartFilled } from '@ant-design/icons';
import { FooterCard } from '@components/footer-card/footer-card';
import CalendarCard from '@public/calendar-card.svg?react';
import ProfileCard from '@public/profile-card.svg?react';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../routes/path';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useState } from 'react';

const { Footer, Content } = Layout;

export const MainPage = () => {
    const navigate = useNavigate();
    const { feedbacks, isError } = useAppSelector((state) => state.feedbacks);

    const [errorModal, setErrorModal] = useState(isError);

    const handleErrorModal = () => setErrorModal((pervState) => !pervState);

    const onButtonClick = () => {
        navigate(Path.FEEDBACKS);
    };

    return (
        <Layout>
            {!feedbacks && (
                <Modal
                    open={errorModal}
                    onCancel={handleErrorModal}
                    footer={null}
                    centered
                    closable={false}
                    maskStyle={{ background: '#799cd480', backdropFilter: 'blur(5px)' }}
                >
                    <Result
                        status='500'
                        title='Что-то пошло не так'
                        subTitle='Произошла ошибка, попробуйте ещё раз.'
                        extra={
                            <Button type='primary' onClick={handleErrorModal}>
                                Назад
                            </Button>
                        }
                    />
                </Modal>
            )}
            <AppHeader />
            <Content>
                <AppContent>
                    <AppCard
                        title={'Расписать тренировки'}
                        link={'Тренировки'}
                        icon={<HeartFilled />}
                    />
                    <AppCard
                        title={'Назначить календарь'}
                        link={'Календарь'}
                        icon={<CalendarCard />}
                    />
                    <AppCard title={'Заполнить профиль'} link={'Профиль'} icon={<ProfileCard />} />
                </AppContent>
            </Content>
            <Footer className={s.footer}>
                <div>
                    <Button type={'link'} size={'large'} onClick={onButtonClick}>
                        Смотреть отзывы
                    </Button>
                </div>
                <div className={s['footer-card']}>
                    <FooterCard />
                </div>
            </Footer>
        </Layout>
    );
};
