import { Component } from '@angular/core';
import { AnimalService } from '../../services/animal-service';
@Component({
  selector: 'app-animal-component',
  imports: [],
  templateUrl: './animal-component.html',
  styleUrl: './animal-component.css',
})
export class AnimalComponent {
  animalList: any = [];

  constructor(private animalService: AnimalService) { }

  getAllAnimals() {
    this.animalService.getAllAnimalsData().subscribe((data: {}) => {
      this.animalList = data;
      console.log(this.animalList);
    });
  }
  ngOnInit() {
    this.getAllAnimals();
  }


}
