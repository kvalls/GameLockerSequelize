import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Game } from '../interfaces/game';

const httpOptionsUsingUrlEncoded={
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
}


@Injectable({
  providedIn: 'root'
})

export class GameService {

  endpoint = 'http://localhost:8080/api/games';


  constructor(private httpClient: HttpClient) { }

  createGame(game, blob): Observable<any> {
    let data = new FormData();
    data.append("name",game.name);
    data.append("price",game.price.toString());
    data.append("genre",game.genre);
    data.append("description",game.description);
    data.append("sales",game.sales.toString());
    data.append("file",blob);
    return this.httpClient.post(this.endpoint, data)
      .pipe(
        catchError(this.handleError<Game>('Error occured'))
      );
  }

  getGame(id): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.endpoint + '/' + id)
      .pipe(
        tap(_ => console.log(`Game fetched: ${id}`)),
        catchError(this.handleError<Game[]>(`Get Game id=${id}`))
      );
  }

  getGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.endpoint)
      .pipe(
        tap(games => console.log('Games retrieved!')),
        catchError(this.handleError<Game[]>('Get game', []))
      );
  }

  updateGame(id, game, blob): Observable<any> {
    let data = new FormData();
    data.append("name",game.name);
    data.append("price",game.price.toString());
    data.append("genre",game.genre);
    data.append("description",game.description);
    data.append("sales",game.sales.toString());
    data.append("file",blob);
    return this.httpClient.put(this.endpoint + '/' + id, data)
      .pipe(
        tap(_ => console.log(`Game updated: ${id}`)),
        catchError(this.handleError<Game[]>('Update game'))
      );
  }

  deleteGame(id): Observable<Game[]> {
    return this.httpClient.delete<Game[]>(this.endpoint + '/' + id)
      .pipe(
        tap(_ => console.log(`Game deleted: ${id}`)),
        catchError(this.handleError<Game[]>('Delete game'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }  
  
}