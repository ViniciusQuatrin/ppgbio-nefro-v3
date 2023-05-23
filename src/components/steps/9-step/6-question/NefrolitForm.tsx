import React, { useEffect, useState } from 'react';
import { CheckerNextStep } from '../../../../shared/interfaces/form';
import {
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
} from '@mui/material';
import { NEFROLIT_OPTIONS } from '../../../../shared/constants/questions';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export const NefrolitForm = ({ selectSteps }: CheckerNextStep) => {
  const [nextState, setNextState] = useState(9);
  useEffect(() => {
    selectSteps(nextState, 8);
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionSelected = event.target.value;
    if (optionSelected === 'option4') {
      setNextState(10);
    } else {
      localStorage.setItem('previousStep', '9');
      setNextState(13);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const label = 'Causa metabólica';
  const detail =
    'Avaliação em urina 24 horas: cálcio, fosforo, citrato, oxalato, acido urico, sódio e creatinina.';

  return (
    <div>
      <h2 className='step-title'>Apresenta nefrolitiase recorrente ?</h2>
      <p className='subtitle'>Sobre litíase renal considere: </p>

      <List>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={label} />
          <QuestionMarkIcon fontSize='small' color='error' />
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={detail} />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      <div className='left-content'>
        <FormControl>
          <RadioGroup name='history' onChange={handleChange}>
            <FormControlLabel
              value='option1'
              control={<Radio required />}
              label={NEFROLIT_OPTIONS.IDENTIFIED}
            />

            <FormControlLabel
              value='option2'
              control={<Radio required />}
              label={NEFROLIT_OPTIONS.NOT_IDENTIFIED}
            />
            <FormControlLabel
              value='option3'
              control={<Radio required />}
              label={NEFROLIT_OPTIONS.TREATED}
            />
            <FormControlLabel
              value='option4'
              control={<Radio required />}
              label={NEFROLIT_OPTIONS.NONE}
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};
