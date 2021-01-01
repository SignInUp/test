import { validationResult } from 'express-validator'
import { EmployeeModel, EmployeeNames } from '../../../data/models'
import { parseToJson, parseToInt, mapToEntity } from '../../utils'
import { postValidator, idValidator, getValidator, patchValidator } from './validators'
import { employeeViewModelAttributes } from '../../models/viewModels'
import express, { Request, Response } from 'express'

const router = express.Router()

router.post('/', postValidator, async function (req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const data = mapToEntity(req.body, EmployeeNames)
    const employee = await EmployeeModel.create(data)
    await employee.save()
    return res.status(201).json(employee)
})

router.get('/:id', idValidator, async function (req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const id = parseInt(req.params.id)
    const employee = await EmployeeModel.findOne({ attributes: employeeViewModelAttributes, where: { id: id } })
    if (employee === null || employee.isDeleted) return res.status(404)
    res.status(200).json(employee.toJSON())
})

router.get('/*', getValidator, async function (req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const employees = await EmployeeModel.findAll({
        where: { [EmployeeNames.isDeleted]: false },
        attributes: employeeViewModelAttributes,
        offset: parseToInt(req.query.skip),
        limit: parseToInt(req.query.count)
    })
    res.status(200).json(parseToJson(employees))
})

router.delete('/:id', idValidator, async function (req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const id = parseInt(req.params.id)
    try {
        const employee = await EmployeeModel.findOne({ where: { id: id, [EmployeeNames.isDeleted]: false } })
        if (employee === null) return res.status(400).json({ data: 'Not found' })

        await employee.update({ [EmployeeNames.isDeleted]: true })
        await employee.save()

        return res.status(200).json({ employee })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: err.err.name })
    }
})

router.patch('/:id', patchValidator, async function (req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const id = parseToInt(req.params.id)
    try {
        const employee = await EmployeeModel.findOne({ where: { id: id, [EmployeeNames.isDeleted]: false } })
        if (employee === null) return res.status(404).json({ data: 'Not found' })

        await employee.update({ ...req.body })
        await employee.save()

        return res.status(200).json({ ...employee.toJSON() })
    } catch (err) {
        return res.status(400).json(err)
    }
})

export default router