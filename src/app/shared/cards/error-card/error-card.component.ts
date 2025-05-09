import { Component, Input } from '@angular/core';
import { LogError } from '../../../core/models/LogError';

@Component({
  selector: 'app-error-card',
  imports: [],
  templateUrl: './error-card.component.html',
  styleUrl: './error-card.component.css'
})
export class ErrorCardComponent {
  @Input() errorLog?: LogError;
  showFullDetails = false

  toggleDetails() {
    this.showFullDetails = !this.showFullDetails
  }
}
