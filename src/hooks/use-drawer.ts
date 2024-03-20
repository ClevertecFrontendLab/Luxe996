import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { calendarSelector } from '../selectors';
import { useState } from 'react';
import {
    ExerciseType,
    setEditTrainingAC,
    setNewTrainingAC,
} from '@redux/reducers/calendar-reducer';
import { Moment } from 'moment';
import { dateFormat } from '@constants/date';

export const useDrawer = (
    selectValue: string,
    date: Moment,
    setCreateTraining: (createTraining: boolean) => void,
) => {
    const dispatch = useAppDispatch();
    const { editTraining, newTraining } = useAppSelector(calendarSelector);
    const showDeleteButton = editTraining && editTraining.name === selectValue;

    let exercises;

    if (editTraining && editTraining.name === selectValue) {
        exercises = editTraining.exercises;
    } else if (newTraining && newTraining.name === selectValue) {
        exercises = newTraining.exercises;
    } else {
        exercises = [
            {
                name: '',
                replays: 1,
                weight: 0,
                approaches: 1,
                isImplementation: false,
            },
        ];
    }

    const [exerciseBlocks, setExerciseBlocks] = useState<ExerciseType[]>(exercises);

    // console.log(exerciseBlocks);

    const handleAddExerciseBlock = () => {
        setExerciseBlocks([
            ...exerciseBlocks,
            {
                name: '',
                replays: 1,
                weight: 0,
                approaches: 1,
                isImplementation: false,
            },
        ]);
    };

    const handleInputChange = (
        index: number,
        name: keyof Omit<ExerciseType, '_id'>,
        value: string | number | boolean,
    ) => {
        const updatedExercises = [...exerciseBlocks];

        updatedExercises[index] = {
            ...updatedExercises[index],
            [name]: value,
        };

        setExerciseBlocks(updatedExercises);
    };
    const handleDeleteExerciseBlock = () => {
        if (exerciseBlocks.length === 1) {
            setExerciseBlocks([
                {
                    name: '',
                    replays: 1,
                    weight: 0,
                    approaches: 1,
                    isImplementation: false,
                },
            ]);
        } else {
            const updatedExercises = exerciseBlocks.filter(
                (exercise) => !exercise.isImplementation,
            );

            setExerciseBlocks(updatedExercises);
        }
    };

    const handleDrawerClose = () => {
        const updatedExercises = exerciseBlocks
            .filter((exercise) => exercise.name !== '')
            .map((exercise) => ({
                name: exercise.name,
                replays: exercise.replays,
                weight: exercise.weight,
                approaches: exercise.approaches,
                isImplementation: exercise.isImplementation,
            }));

        if (editTraining && editTraining.name && editTraining.name === selectValue) {
            const newTraining = {
                ...editTraining,
                name: selectValue,
                exercises: updatedExercises,
                isImplementation: false,
            };

            dispatch(setEditTrainingAC(newTraining));
        } else if (updatedExercises.length > 0) {
            const formattedDate = date.format(`${dateFormat}THH:mm:ss`);
            const newTraining = {
                name: selectValue,
                date: formattedDate,
                exercises: updatedExercises,
            };

            dispatch(setNewTrainingAC(newTraining));
        }
        setCreateTraining(false);
    };

    return {
        exerciseBlocks,
        handleInputChange,
        handleAddExerciseBlock,
        showDeleteButton,
        handleDeleteExerciseBlock,
        handleDrawerClose,
    };
};
