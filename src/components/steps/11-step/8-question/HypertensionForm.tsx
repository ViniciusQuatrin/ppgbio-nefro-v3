// Step 11

import React, { useEffect, useState } from 'react';
import { CheckerNextStep } from 'shared/interfaces/form';
import {
  HYPERTENSION_OPTIONS,
  HYPERTENSION_TABLE,
  LABELS,
} from 'shared/constants/questions';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import { Transition } from 'shared/elements/Transition';
import hypertension from 'shared/assets/hypertension.jpeg';
import './Hypertension.css';
import { Option, Question } from 'shared/interfaces/mysql-db';
import { setQuestion } from 'shared/util/questions';

export const HypertensionForm = ({ selectSteps }: CheckerNextStep) => {
  const [counterSelected, setCounterSelected] = useState(0);
  const checkOptions = HYPERTENSION_OPTIONS;
  const [options, setOptions] = useState<Option[]>([
    { label: checkOptions[0].LABEL, selected: false },
    { label: checkOptions[1].LABEL, selected: false },
  ]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newOptions = options;
    const selected = checkOptions.find(
      (option) => option.NAME === event.target.name
    );
    const optionIndex = newOptions.findIndex(
      (option) => option.label === selected!.LABEL
    );

    if (event.target.checked) {
      newOptions[optionIndex].selected = true;
      setCounterSelected(counterSelected + 1);
    } else {
      newOptions[optionIndex].selected = false;
      setCounterSelected(counterSelected - 1);
    }
    setOptions(newOptions);
  };

  useEffect(() => {
    const question: Question = {
      label: LABELS.QUESTION_3.TITLE,
      number: 3,
      options,
      result: false,
    };

    if (counterSelected >= 2) {
      localStorage.setItem('previousStep', '11');
      question.result = true;
      selectSteps(13, 10);
    } else {
      selectSteps(12, 10);
    }
    setQuestion(question, 'question8');
  }, [counterSelected]);

  return (
    <div className='center-content'>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{HYPERTENSION_TABLE.TITLE}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <span className='dialog-container'>
              <span className='item final-item'>
                <span>{HYPERTENSION_TABLE.STEP_1.TITLE}</span>
                <span>{HYPERTENSION_TABLE.STEP_1.OPTION_1}</span>
              </span>
              <span className='item middle-item'>
                <span>{HYPERTENSION_TABLE.STEP_2.TITLE}</span>
                <span>{HYPERTENSION_TABLE.STEP_2.OPTION_1}</span>
                <span>{HYPERTENSION_TABLE.STEP_2.OPTION_2}</span>
              </span>
              <span className='item final-item'>
                <span>{HYPERTENSION_TABLE.STEP_3.TITLE}</span>
                <span>{HYPERTENSION_TABLE.STEP_3.OPTION_1}</span>
              </span>
              <span className='item middle-item'>
                <span>{HYPERTENSION_TABLE.STEP_4.TITLE}</span>
                <span>{HYPERTENSION_TABLE.STEP_4.OPTION_1}</span>
              </span>
              <span className='item final-item'>
                <span>{HYPERTENSION_TABLE.STEP_5.TITLE}</span>
                <span>{HYPERTENSION_TABLE.STEP_5.OPTION_1}</span>
              </span>
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>

      <h2 className='step-title'>{LABELS.QUESTION_8.TITLE}</h2>

      <div className='form-content'>
        <Card sx={{ maxWidth: 350 }} className='center-content'>
          <CardContent>
            <Typography
              sx={{ fontSize: 15 }}
              color='text.secondary'
              gutterBottom
            >
              Causas de Hipertensão Secundária
            </Typography>
            <img
              src={hypertension}
              alt='kidney image'
              className='hypertension-image'
            />
          </CardContent>
          <CardActions>
            <Button size='small' onClick={handleClickOpen}>
              Saiba mais
            </Button>
          </CardActions>
        </Card>

        <p className='subtitle'>{LABELS.QUESTION_8.SUBTITLE}</p>

        <FormControl>
          <FormGroup>
            {checkOptions.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox name={option.NAME} onChange={handleChange} />
                }
                label={option.LABEL}
              />
            ))}
          </FormGroup>
        </FormControl>
      </div>
    </div>
  );
};
