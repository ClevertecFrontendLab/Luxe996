import LogoIcon from './images/LogoFit.svg';
import LogoText from './images/LogoText.svg';
import LogoMobile from './images/LogoMobile.svg';
import s from './logo.module.scss'

type LogoProps = {
    isCollapsed: boolean
}
export const Logo = ({isCollapsed}: LogoProps) => (
    <div className={`${s.logo} ${isCollapsed ? s.collapsed : ''}`}>
        <div className={s.mobile}>
            <img src={LogoMobile} alt='Logo'/>
        </div>
        <div className={`${s['logo__text']} ${isCollapsed ? s.hidden : ''}`}>
            <img src={LogoText} alt='Clever'/>
        </div>
        <div className={s['logo__icon']}>
            <img src={LogoIcon} alt='fit'/>
        </div>
    </div>
    )

