import React, { useEffect } from 'react';
import './TFGResult.css';
import { CheckerNextStep } from '../../../shared/interfaces/form';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { selectStageByTFG } from '../../../shared/util/util';

function createData(stage: string, tfg: string, renalInsufficiency: string) {
  return { stage, tfg, renalInsufficiency };
}

const rows = [
  createData('0', '> 90', 'Ausência de Lesão Renal'),
  createData('1', '> 90', 'Lesão Renal com Função Renal Normal'),
  createData('2', '60 - 89', 'IR Leve ou Funcional'),
  createData('3', '30 - 59', 'IR Moderada ou Laboratorial'),
  createData('4', '15 - 29', 'IR Severa ou Clínica'),
  createData('5', '< 15', 'IR Terminal ou Dialítica'),
];

export const TFGResult = ({ selectNextStep }: CheckerNextStep) => {
  const tfgValue = localStorage.getItem('tfgValue') || '';
  const tfgNumber = Number(tfgValue);

  useEffect(() => {
    if (tfgNumber > 60) {
      selectNextStep(8);
    } else if (tfgNumber >= 30) {
      selectNextStep(4);
    } else if (tfgNumber < 30) {
      selectNextStep(13);
    }
  }, []);

  return (
    <div className='center-content'>
      <h2 className='step-title'>Resultado Taxa de filtração glomerular</h2>
      <p className='tfg-result'>
        TFG = {tfgValue} ml/min/1,73m²{' '}
        <span className='ckd-epi'>[ckd-epi]</span>
      </p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Estágio</TableCell>
              <TableCell align='center'>Taxa de filtração glomerular</TableCell>
              <TableCell align='center'>Grau de insuficiência renal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.stage}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className={selectStageByTFG(tfgValue, row.stage)}
              >
                <TableCell component='th' scope='row'>
                  {row.stage}
                </TableCell>
                <TableCell align='center'>{row.tfg}</TableCell>
                <TableCell align='left'>{row.renalInsufficiency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
