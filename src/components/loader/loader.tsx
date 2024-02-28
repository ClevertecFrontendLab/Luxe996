import s from './loader.module.scss';
import Lottie from 'lottie-react';
import loader from './loader.json';

export const Loader = () => (
    <div className={s.loader}>
        <Lottie animationData={loader} style={{ width: '150px' }} loop data-test-id='loader' />
    </div>
);
