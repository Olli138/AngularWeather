import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public search: string;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void { }

  getSearch(event: string) {
    this.search = event;
  }

  onSearch() {
    this.dataService.setSearchInput(this.search)
    this.router.navigate(['/weather', this.search]);
  }
}
