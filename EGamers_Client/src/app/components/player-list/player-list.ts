import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Player } from '../../models/player';
import { AppService } from '../../service/app-service';
const apiBaseUrl = 'http://localhost:5269';
@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-player-list',
  styleUrl: './player-list.css',
  templateUrl: './player-list.html',
})
export class PlayerList implements OnInit {
  players: Player[] = [];
  constructor() {}
  private service = inject(AppService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.getAllPlayers();
    this.cdr.detectChanges();
  }
  getAllPlayers() {
    this.service.getPlayers().subscribe({
      next: (data) => {
        this.players = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('An Error Occured to load Players' + err);
      },
    });
  }
  getImageUrl(imgUrl: string): string {
    return `${apiBaseUrl}/images/${imgUrl}`;
  }
  deletePlayer(id: number) {
    if (confirm('Are you sure to Delete')) {
      this.service.deletePlayer(id).subscribe({
        next: () => {
          this.cdr.detectChanges();
          this.getAllPlayers();
        },
        error: (err) => {
          console.error('Delete failed:' + err);
        },
      });
    }
  }
}
