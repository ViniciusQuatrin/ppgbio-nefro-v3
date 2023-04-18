import * as CONSTS from '../constants';
import { FormData } from '../interfaces/form';

export function checkFormDataIsPopulated(data: FormData): boolean {
  const values = Object.values(data);
  return values.every((value) => value !== '');
}

export function getTFG(
  ethnicity: string,
  gender: string,
  creatinine: string,
  age: string
): string {
  const checkMale = gender === 'male';
  const checkEthnicity = ethnicity === 'afro-american';

  const divGender = checkMale ? CONSTS.DIV_MALE : CONSTS.DIV_FEMALE;
  const powMinGender = checkMale ? CONSTS.POW_MIN_MALE : CONSTS.POW_MIN_FEMALE;
  const genderMultiplier = checkMale ? 1 : CONSTS.FEMALE_MULTIPLIER;
  const ethnicityMultiplier = checkEthnicity
    ? CONSTS.AFRO_AMERICAN_MULTIPLIER
    : 1;
  const finalMultiplier =
    CONSTS.BASE_MULTIPLIER * ethnicityMultiplier * genderMultiplier;

  const minValue = Math.pow(
    Math.min(Number(creatinine) / divGender, 1),
    powMinGender
  );
  const maxValue = Math.pow(
    Math.max(Number(creatinine) / divGender, 1),
    CONSTS.POW_MAX
  );

  const ageValue = Math.pow(CONSTS.AGE_BASE, Number(age));

  return (finalMultiplier * minValue * maxValue * ageValue).toFixed(2);
}

//
export function selectStageByTFG(tfgValue: string, stage: string): string {
  const tfgNumber = Number(tfgValue);
  console.log(tfgNumber);
  if (tfgNumber < 15 && stage === '5') {
    return 'selected-row';
  } else if (tfgNumber < 30 && stage === '4') {
    return 'selected-row';
  } else if (tfgNumber < 30 && stage === '3') {
    return 'selected-row';
  } else if (tfgNumber < 30 && stage === '2') {
    return 'selected-row';
  } else if (tfgNumber < 30 && (stage === '0' || stage === '1')) {
    return 'selected-row';
  } else {
    return '';
  }
}
