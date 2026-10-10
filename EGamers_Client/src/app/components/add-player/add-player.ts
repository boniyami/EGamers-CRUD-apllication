import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Player } from '../../models/player';
import { AppService } from '../../service/app-service';
import { Game } from '../../models/game';
import { Device } from '../../models/device';

@Component({
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-add-player',
  styleUrl: './add-player.css',
  templateUrl: './add-player.html',
})
export class AddPlayer implements OnInit {
  isEditMode: boolean = false;
  playerIdtoEdit: number | null = null;
  playerObj: Player = this.intialPlayer();
  gameObj: Game = this.initialGame();
  gameList: Game[] = [];
  deviceList: Device[] = [];
  imageUrl: string | null = null;
  selectedFile: File | null = null;
  apiBaseUrl = 'http://localhost:5269';
  constructor() {}
  private service = inject(AppService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadDevices();
    this.route.paramMap.subscribe((param) => {
      const idParam = param.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.playerIdtoEdit = +idParam;
        this.loadPlayerForEditing(this.playerIdtoEdit);
      } else {
        this.resetForm();
      }
    });
  }

  private intialPlayer(): Player {
    return {
      playerId: 0,
      playerName: '',
      regDate: '',
      regFee: 0,
      isActive: false,
      deviceId: 0,
      imageUrl: '',
      games: [],
    };
  }
  private initialGame(): Game {
    return {
      gameId: 0,
      gameName: '',
      gameVer: '',
      playerId: 0,
    };
  }

  resetForm(): void {
    this.isEditMode = false;
    this.playerIdtoEdit = null;
    this.playerObj = this.intialPlayer();
    this.gameObj = this.initialGame();
    this.gameList = [];
    this.imageUrl = null;
    this.selectedFile = null;
  }
  loadDevices(): void {
    this.service.getDevices().subscribe({
      next: (devices) => {
        this.deviceList = devices;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to Load Devices:' + err);
      },
    });
  }

  deleteGame(gameItem: Game): void {
    this.gameList = this.gameList.filter((g) => g !== gameItem);
  }
  addGame(): void {
    if (this.gameObj.gameName && this.gameObj.gameVer) {
      this.gameObj.playerId = this.playerObj.playerId ?? 0;
      this.gameList.unshift({ ...this.gameObj });
      this.gameObj = this.initialGame();
    }
  }
  loadPlayerForEditing(id: number): void {
    this.service.getPlayerById(id).subscribe({
      next: (foundPlayer) => {
        if (foundPlayer) {
          this.playerObj = { ...foundPlayer };
          this.gameList = foundPlayer.games ? [...foundPlayer.games] : [];
          if (foundPlayer.imageUrl) {
            this.imageUrl = `${this.apiBaseUrl}/images/${foundPlayer.imageUrl}`;
          }
          this.cdr.detectChanges();
        } else {
          console.error('Player not found ID:' + id);
          this.router.navigate(['/display-player']);
        }
      },
      error: (err) => {
        console.error('Failed to load player details', err);
        this.router.navigate(['/display-player']);
      },
    });
  }

  onSelectedFile(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
      this.cdr.detectChanges();
    }
  }

  savePlayer(): void {
    const targetPlayer: Player = { ...this.playerObj, games: this.gameList };

    const request = this.isEditMode
      ? this.service.updatePlayer(targetPlayer)
      : this.service.savePlayer(targetPlayer);
    request.subscribe({
      next: (res: any) => {
        const targetId = this.isEditMode ? this.playerIdtoEdit! : res.playerId;
        this.uploadImage(targetId);
      },
      error: (err) => {
        console.error('Error saving player:' + err);
      },
    });
  }
  private uploadImage(id: number): void {
    if (!this.selectedFile) {
      this.finishAndNavigate();
      return;
    }
    this.service.uploadImage(id, this.selectedFile).subscribe({
      next: () => this.finishAndNavigate(),
      error: (err) => {
        console.error('Failed to upload image' + err);
        this.finishAndNavigate();
      },
    });
  }
  private finishAndNavigate() {
    this.resetForm();
    this.cdr.detectChanges();
    this.router.navigate(['/player-list']);
  }
}
