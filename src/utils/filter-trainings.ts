import moment from 'moment/moment';
import { TrainingType } from '@redux/reducers/calendar-reducer';
import { Moment } from 'moment';

export const filterTrainings = (trainings: TrainingType[], date: Moment) => {
    const dayTrainings = trainings.filter((training) => {
        const trainingDate = moment(training.date).format('YYYY-MM-DD');
        return trainingDate === date.format('YYYY-MM-DD');
    });
    return dayTrainings;
};
