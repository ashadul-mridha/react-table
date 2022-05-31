import React, { useMemo } from 'react';
import './basictable.css';
import { useTable, useGlobalFilter , useFilters } from 'react-table';
import DUMMY_DATA from './MOCK_DATA.json';
import { Columns  } from './columns';
import GlobalFilter from './GlobalFilter';

const FilteringTable = () => {

    const data =  useMemo(() => DUMMY_DATA , []);
    const columns = useMemo( () => Columns ,[])

    const tableInstance = useTable({columns,data}, useFilters, useGlobalFilter);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = tableInstance

    const {globalFilter} = state ;


    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                
                
                <thead>
                    {
                        headerGroups.map( headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map( (column) => (
                                        <th {...column.getHeaderProps()}>
                                            <div>{column.canFilter ? column.render('Filter') : null}</div>                                        
                                        </th>
                                    ))
                                }
                                
                            </tr>
                        ))
                    }
                </thead>

                <thead>
                    {
                        headerGroups.map( headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map( (column) => (
                                        <th {...column.getHeaderProps()}>
                                            {column.render('Header')}                                        
                                        </th>
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

export default FilteringTable;