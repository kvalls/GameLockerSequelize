import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  Games: any = [];

  constructor( 
    private gameService: GameService,
    private router: Router
  ) { }

  ngOnInit() {  }

  ionViewDidEnter() {
    this.gameService.getGames().subscribe((response) => {
      this.Games = response;
    })
  }

  removeGame(game, i) {
    if (window.confirm('Are you sure')) {
      this.gameService.deleteGame(game.id)
      .subscribe(() => {
          this.ionViewDidEnter();
          console.log('Game deleted!')
        }
      )
    }
  }

}

