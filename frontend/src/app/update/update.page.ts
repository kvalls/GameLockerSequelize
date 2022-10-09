import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { GameService } from './../services/game.service';
import { PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})

export class UpdatePage implements OnInit {

  updateGameFg: FormGroup;
  id: any;

  gameForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";

  constructor(
    private photoService: PhotoService,
    private gameService: GameService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    // this.updateGameFg.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  ngOnInit() {
    this.fetchGame(this.id);
    this.updateGameFg = this.formBuilder.group({
      name: [''],
      price: [''],
      genre: [''],
      description: [''],
      sales:['']
    })
  }

  get errorControl() {
    return this.updateGameFg.controls;
  }

  fetchGame(id) {
    this.gameService.getGame(id).subscribe((data) => {
      this.updateGameFg.setValue({
        name: data['name'],
        price: data['price'],
        genre: data['genre'],
        description: data['description'],
        sales: data['sales']
      });
    });
  }
  
  takePhoto() {
    // DECOMMENT:
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    // DECOMMENT:
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    // DECOMMENT:
    this.capturedPhoto = null;
  }

 async onSubmit() {
    this.isSubmitted = true;
    if (!this.updateGameFg.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }
      console.log()
      this.gameService.updateGame(this.id, this.updateGameFg.value, blob)
        .subscribe(() => {
          this.updateGameFg.reset();
          this.router.navigate(['/home']);
        })
    }
  }

}
