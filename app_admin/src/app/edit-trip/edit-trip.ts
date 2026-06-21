import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrls: ['./edit-trip.css'],
})
export class EditTrip implements OnInit {
  editForm!: FormGroup;
  submitted = false;
  tripCode = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tripService: TripData
  ) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.tripCode = this.route.snapshot.params['tripCode'] || '';
    if (this.tripCode) {
      this.tripService.getTrips().subscribe({
        next: (trips: Trip[]) => {
          const trip = trips.find((t) => t.code === this.tripCode);
          if (trip) {
            this.editForm.patchValue(trip);
          }
        },
        error: (error: any) => {
          console.error('Edit trip load error', error);
        }
      });
    }
  }

  public onSubmit() {
    this.submitted = true;
    if (this.editForm.valid && this.tripCode) {
      this.tripService.updateTrip(this.tripCode, this.editForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
    }
  }

  get f() {
    return this.editForm.controls;
  }
}
