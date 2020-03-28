import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {
    PagingState,
    IntegratedSorting,
    SortingState,
    IntegratedPaging,
    DataTypeProvider,
} from '@devexpress/dx-react-grid';
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel
} from 'devextreme-react/data-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import Chip from '@material-ui/core/Chip';

import { userActions, institucionActions } from '../../_actions';

const BooleanFormatter = ({ value }) => <Chip label={value ? 'Si' : 'No'} />;

const BooleanTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={BooleanFormatter}
        {...props}
    />
);


function ListInstitucionesComponent() {

    const instituciones = useSelector(state => state.instituciones);
    const dispatch = useDispatch();  
    const pageSizes = [5, 10, 25, 50, 100];
    useEffect(() => {
        dispatch(institucionActions.getAll());
    }, []);


    function cellRenderImage(data) {
        return <img height="50px" src={data.value} />;
    }
    function cellRenderBool(data){
        if (data.value) {
            return <p>Si</p>;
        }else{
            return <p>No</p>;
        }
    }


    return (
        <div className="col-lg-12  h-100">
            <h3>Instituciones registradas</h3>
            {instituciones.loading && <em>Loading instituciones...</em>}
            {instituciones.error && <span className="text-danger">ERROR: {instituciones.error}</span>}
            {instituciones.items &&
                <DataGrid id="gridContainer"
                    dataSource={instituciones.items}
                    showColumnLines={true}
                    rowAlternationEnabled={true}
                    allowColumnResizing={true}
                    columnAutoWidth={true}>
                    showBorders={true}>
                    <GroupPanel visible={true} />
                    <SearchPanel visible={true} highlightCaseSensitive={true} />
                    <Grouping autoExpandAll={false} />
                    <Column dataField="IdInstitucion" caption="Id" width="50px" />
                    <Column dataField="Nombre" />
                    <Column dataField="NombreContacto" />
                    <Column dataField="Email" />
                    <Column dataField="Telefono" caption="Teléfono" />
                    <Column dataField="Direccion" caption="Dirección" />
                    <Column dataField="Activo" width="60px" cellRender={cellRenderBool} />
                    <Column dataField="LogoBase64" caption="Logo"
                        width={100}
                        allowSorting={false}
                        cellRender={cellRenderImage}
                    />
                    <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                    <Paging defaultPageSize={5} />
                </DataGrid>
            }
        </div>
    );
}

export { ListInstitucionesComponent };