import { AuthService } from './../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentsService } from './../services/incidents.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/combineLatest';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})

export class IncidentsComponent implements OnInit, OnDestroy {
  subscription;
  incidents: any[];
  filteredIncidents: any[];

  constructor(
    private service: IncidentsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
      this.subscription = this.service.getAll().subscribe(incidents => this.incidents = this.filteredIncidents = incidents);

      this.route.queryParamMap.subscribe(params => {
        let selector = params.get('selector');
        if (selector && selector === 'process') {
          this.filteredIncidents = this.incidents.filter(i => i.done === false);
        } else if (selector && selector === 'done') {
          this.filteredIncidents = this.incidents.filter(i => i.done === true);
        } else {
          this.filteredIncidents = this.incidents;
        }
      });
    }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: String) {
    this.filteredIncidents = (query) ?
      this.incidents.filter(i => i.title.toLowerCase().includes(query.toLowerCase())) :
      this.incidents;
  }

  edit(id) {
    this.router.navigate(['/admin/' + id]);
  }
}
