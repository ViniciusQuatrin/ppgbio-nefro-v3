import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { COLUMNS, LOCALE_TEXT_PT } from 'shared/constants/table';
import { DataTable } from 'shared/interfaces/table';
import { convertToDataTable } from 'shared/util/table';
import { UserData } from 'shared/interfaces/firestore-db';

export default function TableView() {
  const columns: GridColDef[] = COLUMNS;
  const [rows, setRowsData] = useState<DataTable[]>([]);
  const [rowsLoaded, setRowsLoaded] = useState(false);
  
  useEffect(() => {
    console.log('carregando...');
  }, []);

  return rowsLoaded ? (
    <Box sx={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ backgroundColor: 'white' }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        rowSelection={false}
        pageSizeOptions={[5]}
        localeText={LOCALE_TEXT_PT}
      />
    </Box>
  ) : (
    <p>Carregando dados</p>
  );
}
