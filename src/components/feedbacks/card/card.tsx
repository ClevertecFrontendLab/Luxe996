import { Avatar, Comment, Rate, Tooltip, Typography } from 'antd';
import { StarTwoTone, UserOutlined } from '@ant-design/icons';
import s from './card.module.scss';
import { feedbackT } from '@redux/reducers/feedbacks-reducer';

const { Text } = Typography;

export const CustomCard = ({ imageSrc, fullName, message, rating, createdAt }: feedbackT) => {
    return (
        <Comment
            className={s.comment}
            avatar={
                <>
                    <Avatar
                        src={imageSrc}
                        icon={<UserOutlined />}
                        size={42}
                        style={{
                            backgroundColor: '#F5F5F5',
                            color: '#262626',
                        }}
                        alt='Avatar'
                    />{' '}
                    <p className={s.author}>{fullName || ''}</p>
                </>
            }
            content={<Text type='secondary'>{message}</Text>}
            datetime={
                <>
                    <Rate disabled defaultValue={rating} character={<StarTwoTone />} />
                    <Tooltip>
                        <span>{new Date(createdAt).toLocaleDateString('ru')}</span>
                    </Tooltip>
                </>
            }
        />
    );
};
