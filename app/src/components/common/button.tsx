import React from 'react'
import './button.scss'

import {  } from 'x'

interface IButtonProps {
    text: string
    type: 'delete' | 'add' | 'edit'
    design?: 'solid' | 'regular'
    id?: number
    active?: boolean
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

function Button (props: IButtonProps) {
    return (
        <button className={`button-fetcher ${props.design}-${props.type}`} onClick={props.onClick}>
            <p className={`${props.design}-${props.type}`}>{props.text}</p>
        </button>
    )
}

const a = 2

Button.defaultProps = {
    active: true,
    design: 'solid'
}

export default (Button)


