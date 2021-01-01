import { body, param, query, ValidationChain } from 'express-validator'
import { EmployeeNames } from '../../../data/models'

export const postValidator: ValidationChain[] = [
    body(EmployeeNames.fullName)
        .custom(value => /^[A-Za-zа-яА-ЯіІїЇ\s]+$/g.test(value))
        .trim()
        .not().isEmpty(),
    body(EmployeeNames.phone)
        .isMobilePhone('any')
        .trim()
        .not().isEmpty(),
    body(EmployeeNames.hourlyRate)
        .isNumeric()
        .trim()
        .not().isEmpty(),
    body(EmployeeNames.email)
        .isEmail()
        .normalizeEmail()
        .trim()
        .not().isEmpty(),
    body([ EmployeeNames.role, EmployeeNames.businessLocation ])
        .not().isEmpty()
]

export const getValidator: ValidationChain[] = [
    query('count')
        .isInt({ lt: 50 })
        .default(10),
    query('skip')
        .isInt()
        .default(0)
]

export const patchValidator: ValidationChain[] = [
    param('id')
        .isInt(),
    body(EmployeeNames.fullName)
        .custom(value => /^[A-Za-zа-яА-ЯіІїЇ\s]+$/g.test(value))
        .trim()
        .optional(),
    body(EmployeeNames.phone)
        .isMobilePhone('any')
        .trim()
        .optional(),
    body(EmployeeNames.hourlyRate)
        .optional()
        .isNumeric()
        .trim(),
    body(EmployeeNames.email)
        .optional()
        .isEmail()
        .normalizeEmail()
        .trim(),
    body([ EmployeeNames.role, EmployeeNames.businessLocation ])
]

export const idValidator: ValidationChain[] = [
    param('id')
        .isInt()
]