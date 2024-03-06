import s from './feedbacks.module.scss';
import { Button } from 'antd';
import { CustomCard } from '@components/feedbacks/card/card';
import { useState } from 'react';
import { feedbackT } from '@redux/reducers/feedbacks-reducer';

type FeedbacksPT = {
    feedbacks: feedbackT[];
    setModalHandler: () => void;
};

export const Feedbacks = ({ feedbacks, setModalHandler }: FeedbacksPT) => {
    const [showAllFeeds, setShowAllFeeds] = useState(false);
    const setAllFeedsHandler = () => setShowAllFeeds((pervState) => !pervState);

    return (
        <div className={s.container}>
            <div className={s.cards}>
                {showAllFeeds
                    ? feedbacks.map((f) => (
                          <CustomCard
                              key={f.id}
                              imageSrc={f.imageSrc}
                              fullName={f.fullName}
                              message={f.message}
                              rating={f.rating}
                              createdAt={f.createdAt}
                          />
                      ))
                    : feedbacks
                          .slice(0, 4)
                          .map((f) => (
                              <CustomCard
                                  key={f.id}
                                  imageSrc={f.imageSrc}
                                  fullName={f.fullName}
                                  message={f.message}
                                  rating={f.rating}
                                  createdAt={f.createdAt}
                              />
                          ))}
            </div>
            <div className={s.buttons}>
                <Button type='primary' onClick={setModalHandler} data-test-id='write-review'>
                    Написать отзыв
                </Button>
                <Button type='link' onClick={setAllFeedsHandler} data-test-id='all-reviews-button'>
                    {showAllFeeds ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                </Button>
            </div>
        </div>
    );
};
