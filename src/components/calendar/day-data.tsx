import { Badge } from 'antd';
import { getBadgeColor } from '@utils/get-badge-color';
import { Moment } from 'moment';
import { TrainingType } from '@redux/reducers/calendar-reducer';
import s from './day-data.module.scss';
import { filterTrainings } from '@utils/filter-trainings';

type DayDataProps = {
    date: Moment;
    trainings: TrainingType[];
};

export const DayData = ({ date, trainings }: DayDataProps) => {
    const filteredTrainings = filterTrainings(trainings, date);

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
