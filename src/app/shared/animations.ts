import { trigger, state, style, animate, transition } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  state('void', style({ opacity: 0 })),
  transition(':enter, :leave', [
    animate('0.5s ease-in-out')
  ])
]);
