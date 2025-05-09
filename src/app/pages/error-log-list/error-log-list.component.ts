import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorLogtore } from '../../Store/errorLog.store';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../shared/ui/search/search.component';
import { ErrorCardComponent } from '../../shared/cards/error-card/error-card.component';

@Component({
  selector: 'app-error-log-list',
  imports: [SearchComponent, CommonModule, ErrorCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './error-log-list.component.html',
  styleUrl: './error-log-list.component.css'
})
export class ErrorLogListComponent {
  readonly errorLogStore = inject(ErrorLogtore);
  searchControl = new FormControl("");

  ngOnInit(): void {
    this.errorLogStore.loadErrorLog();
  }

  onSearchChange(searchTerm: string): void {
    if (searchTerm && searchTerm.trim() !== "") {
      // Si el search tiene datos, se cargan los logs de error que coincidan con el nombre
      this.errorLogStore.loadErrorLogByType(searchTerm);
    } else {
      // Si el search está vacío, se cargan todos los logs de error
      this.errorLogStore.loadErrorLog();
    }
  }
}
