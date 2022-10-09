import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameService } from './../services/game.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})

export class CreatePage implements OnInit {

  gameForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private photoService: PhotoService,
    private gameService: GameService
    ){ }

  ionViewWillEnter() {
    this.gameForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  ngOnInit() {this.gameForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
    genre: ['', [Validators.required]],
    description: [''],
    sales:['']
  }) }

  get errorControl() {
    return this.gameForm.controls;
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
    if (!this.gameForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }
      console.log()
      this.gameService.createGame(this.gameForm.value, blob)
        .subscribe((response) => {
          this.zone.run(() => {
            this.gameForm.reset();
            this.router.navigate(['/home']);
          })
        });
    }
  }

}