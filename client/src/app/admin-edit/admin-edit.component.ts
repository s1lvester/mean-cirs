import { AdminService } from './../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppError } from '../common/app-error';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
  incident;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AdminService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.get(id).subscribe(incident => this.incident = incident);
    }
  }

  save(resource) {
    resource.id = this.incident._id;
    this.service.update(resource).subscribe((res, err) => {
      if (!err) {
        this.router.navigate(['/admin']);
      }
    });
  }

  delete() {
    if (confirm('Sind Sie sicher, dass sie die Meldung löschen möchten?')) {

      this.service.delete(this.incident._id).subscribe((res, err) => {
        if (!err) {
          this.router.navigate(['/admin']);
        }
      });
    }
  }
}
