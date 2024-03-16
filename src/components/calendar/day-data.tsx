import { Badge } from 'antd';
import { getBadgeColor } from '@utils/get-badge-color';
import moment, { Moment } from 'moment';
import { TrainingType } from '@redux/reducers/calendar-reducer';
import s from './day-data.module.scss';

type DayDataProps = {
    date: Moment;
    trainings: TrainingType[];
};

export const DayData = ({ date, trainings }: DayDataProps) => {
    const filteredTrainings = trainings.filter((training) => {
        const trainingDate = moment(training.date).format('YYYY-MM-DD');
        return trainingDate === date.format('YYYY-MM-DD');
    });

    const trainingNames = filteredTrainings.map((training) => training.name);
    return (
        <ul className={s.trainings}>
            {trainingNames.map((name) => (
                <li className={s.training} key={name}>
                    <Badge color={getBadgeColor(name)} style={{ marginRight: '8px' }} />
                    {name}
                </li>
            ))}
        </ul>
    );
};
