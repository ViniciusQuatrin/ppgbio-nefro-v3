import RefreshIcon from '@mui/icons-material/Refresh';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import footer from './shared/assets/apoio-utfpr.png';

import './App.css';
import { FormComponent } from './shared/interfaces/form';
import { useForm } from './hooks/useForm';
import { Button, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  ExamsForm,
  TFGForm,
  TFGResult,
  RenalFunctionForm,
  MicroalbForm,
  HematForm,
  CilinderForm,
  DPRForm,
  NefrolitForm,
  InfectionForm,
  HypertensionForm,
  DiabetesForm,
  FinalNephroStep,
  FinalStep,
} from './components/steps/';
import { InitialStep } from './components/steps/0-initial-step/InitialStep';

function App() {
  const [nextStep, setNextStep] = useState(0);
  const [click, setClick] = useState(0);

  const selectNextStep = (nextStep: number) => {
    setNextStep(nextStep);
  };

  const components = [
    <InitialStep selectNextStep={selectNextStep} />,
    <ExamsForm selectNextStep={selectNextStep} />,
    <TFGForm selectNextStep={selectNextStep} />,
    <TFGResult selectNextStep={selectNextStep} />,
    <RenalFunctionForm selectNextStep={selectNextStep} />,
    <MicroalbForm selectNextStep={selectNextStep} />,
    <HematForm selectNextStep={selectNextStep} />,
    <CilinderForm selectNextStep={selectNextStep} />,
    <DPRForm selectNextStep={selectNextStep} />,
    <NefrolitForm selectNextStep={selectNextStep} />,
    <InfectionForm selectNextStep={selectNextStep} />,
    <HypertensionForm selectNextStep={selectNextStep} />,
    <DiabetesForm selectNextStep={selectNextStep} />,
    <FinalNephroStep selectNextStep={selectNextStep} />,
    <FinalStep selectNextStep={selectNextStep} />,
  ];

  const formComponents: FormComponent[] = components.map((component) => ({
    component,
  }));

  const { currentStep, currentComponent, changeStep, isFirstStep, isLastStep } =
    useForm(formComponents);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changeStep(nextStep);
  };

  const nextButton = currentStep === 0 ? 'Começar' : 'Avançar';

  return (
    <div className='screen-container'>
      <div className='app-container'>
        <div className='header'></div>
        <div className='form-container '>
          <form onSubmit={handleSubmit}>
            <div className='inputs-container'>{currentComponent.component}</div>

            <div className='actions center-content'>
              {!isLastStep ? (
                <></>
              ) : (
                <Button
                  variant='outlined'
                  startIcon={<RefreshIcon />}
                  onClick={(e) => changeStep(0)}
                >
                  Voltar
                </Button>
              )}

              {isLastStep ? (
                <></>
              ) : (
                <Button
                  variant='outlined'
                  endIcon={<NavigateNextIcon />}
                  type='submit'
                  onClick={() => {
                    setClick(click + 1);
                  }}
                >
                  {nextButton}
                </Button>
              )}
            </div>
          </form>
        </div>
        <footer className='center-content'>
          <img src={footer} alt='utfpr-footer' />
        </footer>
      </div>
    </div>
  );
}

export default App;
