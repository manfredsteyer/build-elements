import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Data {
  a: number;
  b: number;
  c: number;
}

@Component({
  // selector: 'app-external-dashboard-tile',
  templateUrl: './external-dashboard-tile.component.html',
  styleUrls: ['./external-dashboard-tile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExternalDashboardTileComponent implements OnInit {

  @Input() src = 1;

  data$ = new BehaviorSubject<Data>({a: 1, b: 2, c: 3});

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.http.get<Data>(`/assets/stats-${this.src}.json`).subscribe(
      data => {
        this.data$.next(data);
      }
    );
  }

  more() {
    this.src++;
    if (this.src > 3) {
      this.src = 1;
    }
    this.load();
  }

}


