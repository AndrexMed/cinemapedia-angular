import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActorResponse } from './models/actors.interface';

@Component({
  selector: 'app-actors',
  imports: [CommonModule],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.css',
})
export class ActorsComponent {
  actors = input.required<ActorResponse | undefined>();
}

