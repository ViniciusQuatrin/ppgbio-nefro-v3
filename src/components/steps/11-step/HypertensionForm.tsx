// Step 11

import React, { useEffect, useState } from 'react';
import { CheckerNextStep } from '../../../shared/interfaces/form';
import { HYPERTENSION_OPTIONS } from '../../../shared/constants/questions';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';

export const HypertensionForm = ({ selectNextStep }: CheckerNextStep) => {
  const [counterSelected, setCounterSelected] = useState(0);

  const checkOptions = HYPERTENSION_OPTIONS;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCounterSelected(counterSelected + 1);
    } else {
      setCounterSelected(counterSelected + -1);
    }
  };

  useEffect(() => {
    if (counterSelected >= 2) {
      selectNextStep(12);
    } else {
      selectNextStep(11);
    }
  }, [counterSelected]);

  return (
    <div>
      <h2>Tem hipertensão ?</h2>
      <p>
        Selecione as opções que se encaixam com o paciente, se nenhuma se
        encaixar não selecione nada.
      </p>
      <FormControl>
        <FormGroup>
          {checkOptions.map((option, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox name={option.NAME} onChange={handleChange} />}
              label={option.LABEL}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};
