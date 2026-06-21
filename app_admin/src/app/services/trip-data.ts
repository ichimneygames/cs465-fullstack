import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})

export class TripData {

    private url = 'http://127.0.0.1:3000/api/trips';

    constructor(private http: HttpClient) { }

    getTrips(): Observable<Trip[]> {
        return this.http.get<Trip[]>(this.url);
    }

    addTrip(formData: Trip) : Observable<Trip> {
        return this.http.post<Trip>(this.url, formData);
    }

    updateTrip(tripCode: string, formData: Trip) : Observable<Trip> {
        return this.http.put<Trip>(`${this.url}/${tripCode}`, formData);
    }
}

