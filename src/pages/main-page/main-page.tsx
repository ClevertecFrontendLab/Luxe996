import { Button, Layout } from 'antd';
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

const { Footer, Content } = Layout;

export const MainPage = () => {
    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate(Path.FEEDBACKS);
    };

    return (
        <Layout>
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
                    <Button
                        type={'link'}
                        size={'large'}
                        onClick={onButtonClick}
                        data-test-id='see-reviews'
                    >
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
