import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class MenuQuestions {
  constructor() {
    this.menu = [
      {
        text: "Cotizaciones",
        route: '../../../pages/frecuent-questions/question-quotation/question-quotation',
        routePage: 'preguntas/cotizaciones'
      },
      {
        text: "Posibles clientes",
        route: '../../../pages/frecuent-questions/question-quotation/question-quotation',
        routePage: 'preguntas/cotizaciones'
      },
      {
        text: "Solicitudes de agendación",
        route: '../../../pages/frecuent-questions/question-quotation/question-quotation',
        routePage: 'preguntas/cotizaciones'
      },
      {
        text: "Tatuadores",
        route: '../../../pages/frecuent-questions/question-quotation/question-quotation',
        routePage: 'preguntas/cotizaciones'
      },
      {
        text: "Promocionarme",
        route: '../../../pages/frecuent-questions/question-quotation/question-quotation',
        routePage: 'preguntas/cotizaciones'
      },
      {
        text: "Evaluaciones",
        route: '../../../pages/frecuent-questions/question-quotation/question-quotation',
        routePage: 'preguntas/cotizaciones'
      },
    ];
  }
}