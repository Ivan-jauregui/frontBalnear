import { Component, Input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CommentResponse } from '../../../comments/models/comment-response';

@Component({
  selector: 'comment-card',
  imports: [DatePipe],
  templateUrl: './comment-card.html',
  styleUrl: './comment-card.css',
})
export class CommentCard {
  @Input() comment:CommentResponse| undefined
}
