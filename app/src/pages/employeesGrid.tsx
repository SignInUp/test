import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchEmployees } from '../redux/slices/employeeSlice'
import { EmployeeModel } from '../models/employeeModel'
import Button from '../components/common/button'
import ReactDataGrid from '@inovua/reactdatagrid-enterprise'
import '@inovua/reactdatagrid-enterprise/index.css'
import './employeeGrid.css'

const gridStyle = {
    border: 'none',
    borderBottom: '1px solid #EEF2F5',
}

const rowStyle = ({ props: { even } } : any) => ({
    backgroundColor: even % 2 !== 0 ? '#F9FBFC' : '#FFFFFF',
    color: '#283749',
    border: 'none',
    fontWeight: 'bold',
    borderBottom: '1px solid #EEF2F5',
    borderTop: '1px solid #EEF2F5'
})

interface IEmployeesView {
    id: number
    fullName: string
    role: string
    businessLocation: string
    email: string
    phone: string
    hourlyRate: string
    checked: boolean
}

const getColumns = () => {
    const dProps = {
        cellProps: {
            style: {
                textAlign: 'center'
            }
        },
        headerProps: {
            style: {
                border: 'none',
                borderBottom: '1px groove #748498',
                textAlign: 'center'
            }
        },
        draggable: false,
        lockable: false
    }

    const columns = [
        { name: 'check', header: '#', flex: 0.1, headerProps: dProps.headerProps,
            render: ({ data } : any) => {
                return data.checked
                    ? <i className="far fa-check-square check-box"></i>
                    : <i className="far fa-square check-box"></i>
            },
            cellProps: {
                style: { fontSize: '1.8em', textAlign: 'center' }
            },
            draggable: false,
            lockable: false
        },
        { name: 'id', header: 'ID', type: 'number', ...dProps },
        { name: 'role', header: 'Role', flex: 1, ...dProps },
        { name: 'fullName', header: 'Full Name', flex: 1, ...dProps },
        { name: 'businessLocation', header: 'Business Location', flex: 1, ...dProps },
        { name: 'email', header: 'Email', flex: 1, ...dProps },
        { name: 'phone', header: 'Phone', flex: 1, ...dProps },
        { name: 'hourlyRate', header: 'Hourly Rate', flex: 1, type: 'number', ...dProps },
    ]
    return columns
}

function EmployeesGrid (props: any) {
    const { fetchEmployees, employees } = props

    const [ state, setState ] = useState({
        selected: [] as Array<number>
    })

    const parsedEmployees = employees.map((e: EmployeeModel) => {
        const isIn = state.selected.includes(e.id)
        const a = {
            ...e,
            hourlyRate: `${e.hourlyRate} / h`,
            checked: isIn
        }
        return a
    }) as Array<IEmployeesView>

    useEffect(() => {
        fetchEmployees({ skip: 0, count: 10 })
    },[])

    const onSelectionChange = useCallback(({ selected }) => {
        const checked = [ ...state.selected ]
        const id = parseInt(Object.keys(selected)[0])
        const indexOf = checked.indexOf(id)

        if (indexOf > -1) checked.splice(indexOf, 1)
        else checked.push(id)
        setState({
            selected: checked,
        })
    }, [ employees, state ])

    return (
        <div>
            <ReactDataGrid
                idProperty="id"
                style={gridStyle}
                columns={getColumns()}
                dataSource={parsedEmployees}

                rowStyle={rowStyle}
                showCellBorders={false}

                onSelectionChange={onSelectionChange}
                selected={state.selected}
                enableSelection={true}
                sortable={false}
            />
            <div>
                <Button type={'add'} text={'ADD EMPLOYEE'} onClick={() => {}} />
                <Button type={'edit'} text={'EDIT'} onClick={() => {}} />
                <Button type={'delete'} text={'DELETE'} design={'solid'} onClick={() => {}} />
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({ employees: state.employee })
const mapDispatchToProps = { fetchEmployees }
export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(EmployeesGrid)
