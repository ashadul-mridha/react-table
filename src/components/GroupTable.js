import React, { useMemo } from 'react';
import './basictable.css';
import { useTable } from 'react-table';
import DUMMY_DATA from './MOCK_DATA.json';
import { Group_columns } from './columns';

const GroupTable = () => {

    const data =  useMemo(() => DUMMY_DATA , []);
    const columns = useMemo( () => Group_columns ,[])

    const tableInstance = useTable({columns,data});

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
    } = tableInstance


    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map( headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map( (column) => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))
                                }
                                
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map( (row) => {
                            prepareRow(row)

                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map( (cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    {
                        footerGroups.map(footerGroup => (
                            <tr {...footerGroup.getFooterGroupProps()}>
                                {
                                    footerGroup.headers.map( (column) => (
                                        <th {...column.getFooterProps()}>{column.render('Footer')}</th>
                                    ))
                                }
                                
                            </tr>
                        ))
                    }
                </tfoot>
            </table>
        </>
    );
};

export default GroupTable;