import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployeeModel } from '../../models/employeeModel'
import { api } from '../../api'

export interface IData {
    skip: number
    count: number
}

export const fetchEmployees = createAsyncThunk<Array<EmployeeModel>, IData>(
    'employees/fetchEmployees',
    async (data: IData) => {
        const response = await api.fetchEmployees(data.skip, data.count)
        return response as Array<EmployeeModel>
    }
)

export const deleteEmployees = createAsyncThunk<void, Array<number>> (
    'employees/deleteEmployees',
    (ids: Array<number>) => {
        api.deleteEmployees(ids)
    }
)

const slice = createSlice({
    name: 'employees',
    initialState: [] as Array<EmployeeModel>,
    reducers: { },
    extraReducers: (builder: ActionReducerMapBuilder<any>) => {
        builder.addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Array<EmployeeModel>>) => {
            state.splice(0, state.length)
            Array.prototype.push.apply(state, action.payload)
        })
        builder.addCase(deleteEmployees.fulfilled, (state, action: PayloadAction<void>) => {

        })
    }
})

export default slice.reducer
