import {Button, Card, Typography} from "antd";
import {ReactNode} from "react";

type AppCardProps = {
    title: string;
    link: string;
    icon: ReactNode
}


export const AppCard = ({title, link, icon}: AppCardProps) => (
    <Card
        headStyle={{ textAlign: 'center', fontSize: '16px' }}
        bodyStyle={{ textAlign: 'center' }}
        size={'small'}
        style={{ maxWidth: '328px' }}
        title={<Typography.Text>{title}</Typography.Text>}
    >
        <Button
            type={'link'}
            icon={icon}
            style={{color:'--primaryLight6'}}
        >
            {link}
        </Button>
    </Card>
)