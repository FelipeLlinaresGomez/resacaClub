import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css'
})

export class ImageGalleryComponent implements OnChanges{

  @Input() images!: string[];
  @Input() currentPage!: number;
  selectedImage!: string;

  ngOnInit() {
    this.updatePagedImages();
  }

  ngOnChanges() {
    this.updatePagedImages();
  }

  // Update the paged images based on the current page
  updatePagedImages() {
    let start = (this.currentPage - 1);

    if (start >= 0 && start < this.images.length) {
      this.selectedImage = this.images[start] ?? "";
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }else{
      this.currentPage = this.images.length;
    }
    this.updatePagedImages();
  }

  nextPage() {
    if (this.currentPage < this.images.length) {
      this.currentPage++;
    }else{
      this.currentPage = 1;
    }
    this.updatePagedImages();
  }

  getFileName(url: string): string {
    return url.substring(url.lastIndexOf('/') + 1);
  }
}