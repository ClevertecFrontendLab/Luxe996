import s from './app-content.module.scss'
import {ReactNode} from "react";

type AppContentProps = {
    children: ReactNode
}
export const AppContent = ({children}:AppContentProps) => (
    <>
        <div className={s.content}>
            <div className={s.advantages}>
                <p>С CleverFit ты сможешь:</p>
                <ul>
                    <li>
                        — планировать свои тренировки на календаре, выбирая тип и уровень
                        нагрузки;
                    </li>
                    <li>
                        — отслеживать свои достижения в разделе статистики, сравнивая свои
                        результаты с нормами и рекордами;
                    </li>
                    <li>
                        — создавать свой профиль, где тыможешь загружать свои фото, видео и
                        отзывы о тренировках;
                    </li>
                    <li>
                        — выполнять расписанные тренировки для разных частей тела, следуя
                        подробным инструкциям и советам профессиональных тренеров.
                    </li>
                </ul>
            </div>
            <p className={s['advantages-text']}>
                CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
                откладывай на завтра — начни тренироваться уже сегодня!
            </p>
            {children}
        </div>
    </>
)

