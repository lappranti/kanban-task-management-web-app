import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-delete-thing',
  templateUrl: './delete-thing.component.html',
  styleUrls: ['./delete-thing.component.scss']
})
export class DeleteThingComponent implements OnInit {
  theme!: string;
  showModalDeliteBoard: boolean = false;
  @Input() thing!: any;
  @Output() isDelteActive = new EventEmitter<boolean>();
  constructor(private themeService: ThemeService) {}
  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe(res => {
      this.theme = res;
    });
  }

  onClick(action: boolean) {
    this.isDelteActive.emit(action);
  }
}
