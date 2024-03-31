import './InitialStep.css';
import { CheckerNextStep } from 'shared/interfaces/form';
import { useEffect } from 'react';
import initialImage from 'shared/assets/initial-img.jpeg';
import { Link } from '@mui/material';
import { makeRequest } from 'services/api';



export const InitialStep = ({ selectSteps }: CheckerNextStep) => {
  useEffect(() => {
    makeRequest('/', 'GET')
      .then(data => {
        if (data) {
          console.log(data);
        } else {
          console.log('error on request');
        }
      })
      .catch(error => {
        console.log(error)
      });

    selectSteps(1, 0);
    localStorage.clear();
  }, [selectSteps]);

  return (
    <div>
      <h2 className='initial'>
        Calculadora para triagem de paciente com doença renal crônica
      </h2>
      <div className='initial-content'>
        <div className='references'>
          <div className='reference-item'>
            <p>
              Cadernos de atenção primária: rastreamento, Ministério da Saúde,
              2013.
            </p>
            <Link
              href='https://bvsms.saude.gov.br/bvs/publicacoes/rastreamento_caderno_atencao_primaria_n29.pdf'
              target='_blank'
              sx={{ fontSize: 14 }}
            >
              Disponível em: Biblioteca virtual em saúde.
            </Link>
          </div>

          <div className='reference-item'>
            <p>
              Protocolos de encaminhamento da atenção básica para a atenção
              especializada, Endocrinologia e Nefrologia, Ministério da Saúde,
              Universidade Federal do Rio Grande do Sul,2015.
            </p>
            <Link
              href='http://biblioteca.cofen.gov.br/wp-content/uploads/2015/11/protocolos_atencao_basica_atencao_especializada.pdf'
              target='_blank'
              sx={{ fontSize: 14 }}
            >
              Disponível em: Biblioteca virtual Cofen.
            </Link>
          </div>

          <div className='last-container'>
            <div className='names'>
              <ul className='list'>
                <li>Consultores</li>
                <li>Karina Litchteneker</li>
                <li>Vinícius Quatrin</li>
                <li>Guilherme de Araujo Gabriel</li>
                <li>Jefferson Gustavo Martins</li>
              </ul>
            </div>
          </div>
        </div>

        <img src={initialImage} alt='initial-image' className='initial-image' />
      </div>
    </div>
  );
};
