import { AppErrorHandler } from './../common/app-error-handler';
import { AppError } from './../common/app-error';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { IncidentsService } from './../services/incidents.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-incident',
  templateUrl: './create-incident.component.html',
  styleUrls: ['./create-incident.component.css']
})


export class CreateIncidentComponent {
  error = null;
  message = null;
  public stateMeasures = false;
  public stateSuggestions = false;
  form: FormGroup;

  constructor(
    private service: IncidentsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
      suggestions: '',
      measures: ''
    });
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }

  toggleStateMeasures() {
    this.stateMeasures = !this.stateMeasures;
    console.log('wow');
  }

  toggleStateSuggestions() {
    this.stateSuggestions = !this.stateSuggestions;
  }

  createIncident() {
    this.service.create(this.form.value).subscribe(
      (res) => {
        if (res.message === 'incident created.') {
          this.message = 'Meldung abgeschickt. Sie wird nach Prüfung durch das CIRS-Team veröffentlicht.';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }
       },
      (err: AppError) => { this.error = 'Fehler beim Erstellen der Medlung.'; }
    );
  }
}
