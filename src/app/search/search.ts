import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  // Use styleUrls (plural) to avoid deprecation/typing warnings
  styleUrls: ['./search.css'],
  standalone: true
})
export class Search {
  // Two-way bound input model for search text
  searchTerm: string = '';
  @Output() searchChange = new EventEmitter<string>();

  // Emit the current search term to the parent on each input
  onSearch() {
    this.searchChange.emit(this.searchTerm);
  }
}
