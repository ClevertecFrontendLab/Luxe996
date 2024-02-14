import Icon from '@ant-design/icons';
import {CustomIconComponentProps} from '@ant-design/icons/lib/components/Icon';

const CalendarSVG = () => (
    <svg width="16" height="16" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_7686_1175)">
            <rect width="16" height="16" transform="translate(0.5)" fill="white" fillOpacity="0.01"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M10.2344 2.51575H12.5312C12.7732 2.51575 12.9688 2.71125 12.9688 2.95325V12.0314C12.9688 12.2734 12.7732 12.4689 12.5312 12.4689H2.46875C2.22676 12.4689 2.03125 12.2734 2.03125 12.0314V2.95325C2.03125 2.71125 2.22676 2.51575 2.46875 2.51575H4.76562V1.64075C4.76562 1.58059 4.81484 1.53137 4.875 1.53137H5.64062C5.70078 1.53137 5.75 1.58059 5.75 1.64075V2.51575H9.25V1.64075C9.25 1.58059 9.29922 1.53137 9.35938 1.53137H10.125C10.1852 1.53137 10.2344 1.58059 10.2344 1.64075V2.51575ZM3.01562 11.4845H11.9844V6.28918H3.01562V11.4845Z" fill="#2F54EB"/>
        </g>
        <defs>
            <clipPath id="clip0_7686_1175">
                <rect width="14" height="14" fill="white" transform="translate(0.5)"/>
            </clipPath>
        </defs>
    </svg>

)

export const CalendarIconCard = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={CalendarSVG} {...props}/>
)