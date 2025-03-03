import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FlowbiteService } from 'apps/cinemapedia-angular/src/app/shared/services/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  constructor(private _flowBiteSvc: FlowbiteService) {}

  ngOnInit(): void {
    this._flowBiteSvc.loadFlowbite((flowbite) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
      initFlowbite();
    });
  }
}
