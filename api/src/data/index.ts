import { Sequelize } from 'sequelize-typescript'
import { EmployeeModel } from './models'
import dotenv from 'dotenv'

dotenv.config()
const { DATABASE_NAME, DB_HOST, DB_PASSWORD, DB_USERNAME } = process.env

const models = [
    EmployeeModel
]

const sequelize = new Sequelize({
    database: DATABASE_NAME ?? 'db_name',
    username: DB_USERNAME ?? 'root',
    password: DB_PASSWORD ?? '1234',
    host: DB_HOST ?? 'host',
    models: models,
    dialect: 'postgres'
})

export function createDB() {
    sequelize.authenticate().then(async () => {
        try {
            await sequelize.sync({ force: false })
        } catch (err) {
            console.log(err.message)
        }
    }).catch((err: Error) => {
        console.log(err.message)
    })
}

export default sequelize
