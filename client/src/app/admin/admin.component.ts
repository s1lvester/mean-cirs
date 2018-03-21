import { AdminService } from './../services/admin.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  private incidents: any[];
  private filteredIncidents: any[];
  private subscription;

  constructor(
    private authService: AuthService,
    private service: AdminService
  ) {
    this.subscription = this.service.getUnpublished().subscribe(incidents => this.filteredIncidents = this.incidents = incidents);
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
}
