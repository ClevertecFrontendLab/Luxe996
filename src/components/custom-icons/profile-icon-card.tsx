import Icon from '@ant-design/icons';
import {CustomIconComponentProps} from '@ant-design/icons/lib/components/Icon';

const ProfileSVG = () => (
    <svg width="16" height="16" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_7686_1305)">
            <rect width="16" height="16" transform="translate(0.5)" fill="white" fillOpacity="0.01"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M12.5312 1.53137H2.46875C2.22676 1.53137 2.03125 1.72688 2.03125 1.96887V12.0314C2.03125 12.2734 2.22676 12.4689 2.46875 12.4689H12.5312C12.7732 12.4689 12.9688 12.2734 12.9688 12.0314V1.96887C12.9688 1.72688 12.7732 1.53137 12.5312 1.53137ZM11.9844 11.4845H3.01562V2.51575H11.9844V11.4845ZM10.5309 6.50793H8.84381C8.82604 6.50793 8.81236 6.45872 8.81236 6.39856V5.74231C8.81236 5.68215 8.82604 5.63293 8.84381 5.63293H10.5309C10.5487 5.63293 10.5624 5.68215 10.5624 5.74231V6.39856C10.5624 6.45872 10.5487 6.50793 10.5309 6.50793ZM11.4483 8.47669H8.90944C8.85611 8.47669 8.81236 8.42747 8.81236 8.36731V7.71106C8.81236 7.6509 8.85611 7.60168 8.90944 7.60168H11.4483C11.5016 7.60168 11.5454 7.6509 11.5454 7.71106V8.36731C11.5454 8.42747 11.5016 8.47669 11.4483 8.47669ZM4.16256 9.20129H3.56236C3.49947 9.20129 3.45026 9.14934 3.45572 9.08645C3.47399 8.73811 3.5763 8.39937 3.75391 8.09915C3.93151 7.79894 4.17914 7.54616 4.47565 7.36243C4.22818 7.08899 4.07779 6.72805 4.07779 6.3302C4.07779 5.48391 4.76002 4.79895 5.60084 4.79895C6.44166 4.79895 7.12389 5.48391 7.12389 6.3302C7.1248 6.71188 6.98288 7.08009 6.72604 7.36243C7.30846 7.72336 7.70768 8.35774 7.74596 9.08645C7.7467 9.10127 7.74442 9.11608 7.73926 9.12999C7.73409 9.14389 7.72615 9.15661 7.71592 9.16735C7.70569 9.17809 7.69338 9.18664 7.67974 9.19248C7.6661 9.19831 7.65142 9.20131 7.63658 9.20129H7.03639C6.97897 9.20129 6.93248 9.15618 6.92838 9.09876C6.87643 8.40833 6.29947 7.86145 5.59947 7.86145C4.89947 7.86145 4.32252 8.40833 4.27057 9.09876C4.26647 9.15618 4.21998 9.20129 4.16256 9.20129Z"
                  fill="#2F54EB"/>
        </g>
        <defs>
            <clipPath id="clip0_7686_1305">
                <rect width="14" height="14" fill="white" transform="translate(0.5)"/>
            </clipPath>
        </defs>
    </svg>


)


export const ProfileIconCard = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ProfileSVG} {...props} />
)