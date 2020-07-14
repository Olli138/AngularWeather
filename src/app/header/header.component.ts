import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  search: string;

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
