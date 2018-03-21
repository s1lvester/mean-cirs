import { AuthService } from './../services/auth.service';
import { IncidentsService } from './../services/incidents.service';
import { AdminService } from './../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css']
})
export class IncidentDetailsComponent implements OnInit {
  incident;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: IncidentsService,
    private authService: AuthService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.get(id).subscribe(incident => this.incident = incident);
    }
  }

  ngOnInit() {
  }

  edit(id) {
    this.router.navigate(['/admin/' + id]);
  }
}
