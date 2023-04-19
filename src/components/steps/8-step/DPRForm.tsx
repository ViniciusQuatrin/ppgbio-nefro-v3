// Step 8

import React from 'react';
import './DPRForm.css';
import { CheckerNextStep } from '../../../shared/interfaces/form';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { OPTIONS } from '../../../shared/constants/dprOptions';

export const DPRForm = ({ disableNextStep }: CheckerNextStep) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div>
      <h2>Suspeita de doença policística renal ?</h2>
      <p>Avaliação pela US ou TC</p>
      <div className='center-content left-content'>
        <FormControl>
          <FormLabel>Histórico familiar positivo</FormLabel>
          <RadioGroup name='history' onChange={handleChange}>
            <FormControlLabel
              value='option1'
              control={<Radio />}
              label={OPTIONS.OPTION_1}
            />

            <FormControlLabel
              value='option2'
              control={<Radio />}
              label={OPTIONS.OPTION_2}
            />
            <FormControlLabel
              value='option3'
              control={<Radio />}
              label={OPTIONS.OPTION_3}
            />
            <FormLabel>Histórico familiar negativo:</FormLabel>
            <FormControlLabel
              value='option4'
              control={<Radio />}
              label={OPTIONS.OPTION_4}
            />
            <FormControlLabel
              value='option5'
              control={<Radio />}
              label={OPTIONS.OPTION_5}
            />
            <FormLabel>Sem histórico e sem a presença de cistos:</FormLabel>
            <FormControlLabel
              value='option6'
              control={<Radio />}
              label={OPTIONS.OPTION_NONE}
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};
