import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserStore } from '../../Store/user.store';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../shared/ui/search/search.component';
import { UserCardComponent } from '../../shared/cards/user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, SearchComponent, UserCardComponent],
  // providers: [UserStore], Esto se pone si quieres el store a nivel de componente en vez de global
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  readonly userStore = inject(UserStore);
  searchControl = new FormControl("");

  ngOnInit(): void {
    this.userStore.loadUsers();
  }

  onSearchChange(searchTerm: string): void {
    if (searchTerm && searchTerm.trim() !== "") {
      // Si el search tiene datos, se cargan los usuarios que coincidan con el nombre
      this.userStore.loadUserByName(searchTerm);
    } else {
      // Si el search está vacío, se cargan todos los usuarios
      this.userStore.loadUsers();
    }
  }
}
