import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { AuthenticationService } from '../services/authtication';

import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css'],
  providers: [TripData]
})

export class TripListing implements OnInit{
  trips = signal<Trip[]>([]);
  message = signal('Loading trips...');

  constructor(
    private tripData: TripData,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
}

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private getStuff(): void {
    this.tripData.getTrips()
      .subscribe({

      next: (value: Trip[]) => {
        this.trips.set(value);
        if (value.length > 0) {
          this.message.set('There are ' + value.length + ' trips available.');
        } else {
          this.message.set('There were no trips retrieved from the database.');
        }
        console.log('Trips loaded:', value);
        console.log('Trip count:', value.length);
      },
      error: (error: any) => {
        console.log('Error loading trips:', error);
        this.message.set('Unable to load trips from server.');
      }
    })
  }

  public trackByTrip(index: number, trip: Trip): string {
    return trip._id ?? trip.code;
  }

  ngOnInit(): void {
    this.getStuff();
  }
}
