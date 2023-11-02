import { Component } from '@angular/core';
import { DmxService } from '../dmx.service';
import { Chase, TimedScene } from './chase';
import { Scene, ValueForChannel } from '../models';
import { delayWhen, delay, from, timer } from 'rxjs';

@Component({
  selector: 'app-chase-btn',
  templateUrl: './chase-btn.component.html',
  styleUrls: ['./chase-btn.component.scss']
})
export class ChaseBtnComponent {

  constructor(private svc: DmxService) { }

  runChase() {
    const chase = this.exampleChase();
    console.log(chase);

    let accDelay = 0;
    from(chase.timedScenes).pipe(
      delayWhen((ts) => {
        accDelay += ts.delay;
        return timer(accDelay);
      })
    ).subscribe(next => {
      console.log(next.scene.scene.list);
      this.svc.fadeDMX(next.scene.scene, next.scene.fadeTimeMillis).subscribe(()=>{});
    });

  }

  /**
Very specific test to try and create the effect of a car driving down a street 
and the streetlights being reflected by the stage-light.
*/
  private exampleChase(): Chase {
    const delay = 25;
    // DMX Dimmer Channels to match the buildUp Chase
    const lightsInOrder = [
      [89, 116],
      [98, 107],
      [31, 87],
      [39, 79],
      [47, 71]
    ];
    const buildUp = getBuildUpSequence();
    const tearDown = getBuildUpSequence().reverse().map(s => s.reverse());
    const middle = [150, 200, 255, 200, 150];
    const fullChase = buildUp.concat([middle]).concat(tearDown);
    const scenicArray: Scene[] = fullChase.map(chaseElementToScene);
    const timedScenes: TimedScene[] = scenicArray.map(s => {
      return {delay: delay, scene: {scene: s, fadeTimeMillis: delay}};
    })
    return {timedScenes};

    function getBuildUpSequence(): number[][] {
      return [
        [0, 0, 0, 0, 0],
        [8, 4, 0, 0, 0],
        [16, 8, 0, 0, 0],
        [24, 12, 0, 0, 0],
        [32, 16, 8, 0, 0],
        [40, 20, 10, 0, 0],
        [50, 25, 12, 0, 0],
        [58, 29, 15, 0, 0],
        [66, 33, 16, 0, 0],
        [72, 36, 18, 0, 0],
        [82, 41, 20, 0, 0],
        [90, 45, 22, 10, 0],
        [100, 50, 25, 12, 0],
        [150, 100, 50, 25, 0],
        [200, 150, 100, 50, 0],
        [255, 200, 150, 100, 50],
        [200, 255, 200, 150, 100],
      ];
    }

    function chaseElementToScene(el: number[]): Scene {
      const list: ValueForChannel[] = el.flatMap((v, i) => {
        return [
          { channel: lightsInOrder[i][0], value: v },
          { channel: lightsInOrder[i][1], value: v },
        ]
      });
      return { list }
    }
  }
}
