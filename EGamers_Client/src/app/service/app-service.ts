import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { Device } from '../models/device';
import { UploadResponse } from '../models/upload-response';
const apiBaseUrl = 'http://localhost:5269';
@Service()
export class AppService {
  constructor() {}
  private http = inject(HttpClient);

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${apiBaseUrl}/api/Players`);
  }
  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${apiBaseUrl}/api/Players/Devices`);
  }
  getPlayerById(id: number): Observable<Player> {
    return this.http.get<Player>(`${apiBaseUrl}/api/Players/${id}`);
  }
  deletePlayer(id: number): Observable<any> {
    return this.http.delete<any>(`${apiBaseUrl}/api/Players/${id}`);
  }
  savePlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${apiBaseUrl}/api/Players`, player);
  }
  updatePlayer(player: Player): Observable<Player> {
    return this.http.put<Player>(`${apiBaseUrl}/api/Players/${player.playerId}`, player);
  }
  uploadImage(id: number, file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('File', file);
    return this.http.post<UploadResponse>(`${apiBaseUrl}/api/Players/Upload/${id}`, formData);
  }
}
