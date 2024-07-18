import { TTabEnums } from '../_t/TTabEnums'
import css from './Tabs.module.css'

type Props = {
    onChangeTab: (tabName: TTabEnums) => void
    activeTab: TTabEnums
}

const Tabs = (props: Props) => {
    return (
        <div className={css.tabs}>
            <div 
                className={`
                    ${props.activeTab == 'all' && css.active}
                `}
                onClick={() => props.onChangeTab('all')}
            >
                ALL
            </div>
            <div
                className={`
                    ${props.activeTab == 'completed' && css.active}
                `}
                onClick={() => props.onChangeTab('completed')}
            >
                COMPLETED
            </div>
            <div
                className={`
                    ${props.activeTab == 'important' && css.active}
                `}
                onClick={() => props.onChangeTab('important')}
            >
                IMPORTANT
            </div>
        </div>
    )
}

export default Tabs