import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    private heroesUrl = 'api/heroes';
    private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    
    console.error(error); // log to console instead

    
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

    getHeroes(): Observable<Hero[]> {
      return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
          tap(_ => this.log('fetched heroes')),
          catchError(this.handleError<Hero[]>('getHeroes', []))
        );
    }

  /** GET hero by id. Will 404 if id not found */
getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}
  
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}