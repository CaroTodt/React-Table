import React, { useMemo } from 'react'
import { useTable, useRowSelect } from 'react-table'
import MOCK_DATA from '../components/MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from '../components/columns'
import './table.css'

export const RowSelection = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
    const tableInstance = useTable({
        columns,
        data
    }, useRowSelect)



    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
    } = tableInstance

    const firstPageRows = rows.slice(0,10)
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {firstPageRows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
            <tfoot>
                {
                    footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map(column => (
                                <td {...column.getFooterGroupProps}>
                                    {column.render('Footer')}
                                </td>
                            ))}
                        </tr>
                    ))}
            </tfoot>
        </table>
    )
}

