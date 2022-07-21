import { format } from 'date-fns'
import './Timer.scss'

const Timer = (props) => {
    const { gameStart, time } = props

    return (
        <div className={`timer ${gameStart ? 'start' : ''}`} >
            <div className='inner_timer'>{format(time, 'mm:ss')}</div>
        </div >
    )
}

export default Timer