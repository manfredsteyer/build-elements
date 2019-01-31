import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  // selector: 'app-external-dashboard-tile',
  templateUrl: './external-dashboard-tile.component.html',
  styleUrls: ['./external-dashboard-tile.component.css']
})
export class ExternalDashboardTileComponent implements OnInit {

  @Input() src: number = 1;
  
  a: number;
  b: number;
  c: number;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.http.get(`/assets/stats-${this.src}.json`).subscribe(
      data => {
        this.a = data['a'];
        this.b = data['b'];
        this.c = data['c'];
      }
    );
  }

  more() {
    this.src++;
    if (this.src > 3) {
      this.src = 1;
    }
  }

}


