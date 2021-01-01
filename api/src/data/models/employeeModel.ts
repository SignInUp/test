import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, Default } from 'sequelize-typescript'

export enum EmployeeNames {
    tableName = 'employees',
    id = 'id',
    fullName = 'fullName',
    role = 'role',
    businessLocation = 'businessLocation',
    email = 'email',
    phone = 'phone',
    hourlyRate = 'hourlyRate',
    isDeleted = 'isDeleted'
}

export interface IEmployee {
    [EmployeeNames.id]?: number
    [EmployeeNames.fullName]: string
    [EmployeeNames.role]: string
    [EmployeeNames.businessLocation]: string
    [EmployeeNames.email]: string
    [EmployeeNames.phone]: string
    [EmployeeNames.hourlyRate]: number
    [EmployeeNames.isDeleted]: boolean
}

@Table({
    tableName: EmployeeNames.tableName,
    timestamps: false
})
class EmployeeModel extends Model implements IEmployee {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number

    @Column(DataType.STRING)
    fullName!: string

    @Column(DataType.STRING)
    role!: string

    @Column(DataType.STRING)
    businessLocation!: string

    @Column(DataType.STRING)
    email!: string

    @Column(DataType.STRING)
    phone!: string

    @Column(DataType.INTEGER)
    hourlyRate!: number

    @Default(false)
    @Column(DataType.BOOLEAN)
    isDeleted!: boolean
}

export default EmployeeModel
