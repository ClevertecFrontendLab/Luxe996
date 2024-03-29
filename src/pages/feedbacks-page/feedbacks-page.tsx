import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import s from './feedbacks-page.module.scss';
import { Button, Form, Modal, Rate, Result } from 'antd';
import { useEffect, useState } from 'react';
import { StarTwoTone } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../routes/path';
import { EmptyFeedback } from '@components/feedbacks/empty-feedback/empty-feedback';
import { getFeedbacksTC, postFeedbacksAC, postFeedBackTC } from '@redux/reducers/feedbacks-reducer';
import { Feedbacks } from '@components/feedbacks/feedbacks';
import { feedbackSelector } from '../../selectors';

export const FeedbacksPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { feedbacks, isError, isSuccess } = useAppSelector(feedbackSelector);

    const [showModal, setShowModal] = useState(false);
    const [formValues, setFormValues] = useState({ rating: 0, massage: '' });
    const [resultModal, setResultModal] = useState(false);

    const setModalHandler = () => setShowModal((pervState) => !pervState);

    const handleErrorModal = () => {
        navigate(Path.MAIN);
    };

    const addFeedBack = () => {
        setFormValues({ rating: 0, massage: '' });
        setShowModal(false);
        dispatch(postFeedBackTC(formValues.rating, formValues.massage));
    };

    const tryAgain = () => {
        dispatch(postFeedbacksAC(null, null));
        setResultModal(false);
        setShowModal(true);
    };
    const closeError = () => {
        dispatch(postFeedbacksAC(null, null));
        setResultModal(false);
    };

    const updateFeedbacks = () => {
        dispatch(getFeedbacksTC());
        dispatch(postFeedbacksAC(null, null));
        setResultModal(false);
    };

    useEffect(() => {
        dispatch(getFeedbacksTC());
    }, [dispatch]);

    useEffect(() => {
        if ((feedbacks && isError) || isSuccess) {
            setResultModal(true);
        }
    }, [feedbacks, isError, isSuccess]);

    return (
        <div className={s.wrapper}>
            {feedbacks &&
                (feedbacks.length === 0 ? (
                    <EmptyFeedback setModalHandler={setModalHandler} />
                ) : (
                    <Feedbacks feedbacks={feedbacks} setModalHandler={setModalHandler} />
                ))}

            {!feedbacks && (
                <Modal
                    open={Boolean(isError)}
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

            <Modal
                title='Ваш отзыв'
                open={showModal}
                onCancel={setModalHandler}
                centered
                footer={[
                    <Button
                        key='submit'
                        type='primary'
                        className={s.button}
                        onClick={addFeedBack}
                        data-test-id='new-review-submit-button'
                    >
                        Опубликовать
                    </Button>,
                ]}
                maskStyle={{ background: '#799cd480', backdropFilter: 'blur(5px)' }}
            >
                <div className={s.form}>
                    <Form
                        onValuesChange={(_, values) => setFormValues(values)}
                        initialValues={formValues}
                    >
                        <Form.Item name='rating' className={s.rate}>
                            <Rate character={<StarTwoTone />} />
                        </Form.Item>
                        <Form.Item name='massage'>
                            <TextArea
                                placeholder='Autosize height with minimum and maximum number of lines'
                                autoSize={{ minRows: 2 }}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>

            <Modal
                open={resultModal}
                footer={null}
                centered
                maskStyle={{ background: '#799cd480', backdropFilter: 'blur(5px)' }}
            >
                {isSuccess ? (
                    <Result
                        status='success'
                        title='Отзыв успешно опубликован'
                        extra={
                            <Button
                                type='primary'
                                style={{ width: '100%' }}
                                onClick={updateFeedbacks}
                            >
                                Отлично
                            </Button>
                        }
                    />
                ) : (
                    <Result
                        status='error'
                        title='Данные не сохранились'
                        subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                        extra={[
                            <Button
                                type='primary'
                                key='newReview'
                                onClick={tryAgain}
                                data-test-id='write-review-not-saved-modal'
                            >
                                Написать отзыв
                            </Button>,
                            <Button type='text' key='close' onClick={closeError}>
                                Закрыть
                            </Button>,
                        ]}
                    />
                )}
            </Modal>
        </div>
    );
};
