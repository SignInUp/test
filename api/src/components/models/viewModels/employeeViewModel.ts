enum EmployeeViewModelNames {
    id = 'id',
    fullName = 'fullName',
    role = 'role',
    businessLocation = 'businessLocation',
    email = 'email',
    phone = 'phone',
    hourlyRate = 'hourlyRate',
}

export const employeeViewModelAttributes = [
    EmployeeViewModelNames.id,
    EmployeeViewModelNames.fullName,
    EmployeeViewModelNames.role,
    EmployeeViewModelNames.businessLocation,
    EmployeeViewModelNames.email,
    EmployeeViewModelNames.phone,
    EmployeeViewModelNames.hourlyRate,
]

export interface IEmployeeViewModel {
    [ EmployeeViewModelNames.id ]: number
    [ EmployeeViewModelNames.fullName ]: string
    [ EmployeeViewModelNames.role ]: string
    [ EmployeeViewModelNames.businessLocation ]: string
    [ EmployeeViewModelNames.email ]: string
    [ EmployeeViewModelNames.phone ]: string
    [ EmployeeViewModelNames.hourlyRate ]: number
}

export default EmployeeViewModelNames
