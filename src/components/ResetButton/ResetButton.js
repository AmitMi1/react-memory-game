import React from 'react'
import { VscDebugRestart } from 'react-icons/vsc'
import './ResetButton.scss'

const ResetButton = (props) => {
    const { onReset } = props


    return (
        <button title='Restart' className='btn_reset' onClick={onReset}><VscDebugRestart /></button>
    )
}

export default ResetButton