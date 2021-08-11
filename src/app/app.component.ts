/* eslint-disable no-useless-constructor */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  closeResult!: string;

  public constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Angular Car Showroom');
  }
}
