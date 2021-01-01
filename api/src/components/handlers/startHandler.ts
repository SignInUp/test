import { createDB } from '../../data'

export default function startHandler (){
    createDB()
    console.log('STARTED')
}