import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scene, SceneWithFade } from './models';

const apiUrl = "api/v1";

@Injectable({
  providedIn: 'root'
})
export class DmxService {

  constructor(private http: HttpClient) { }

  public setDMX(scene: Scene): Observable<any> {
    return this.http.patch(`${apiUrl}/dmx`, scene);
  }

  public fadeDMX(scene: Scene, fadeTimeMillis: number): Observable<any> {
    const body: SceneWithFade = {scene, fadeTimeMillis};
    return this.http.patch(`${apiUrl}/dmx/fade`, body);
  }
}
