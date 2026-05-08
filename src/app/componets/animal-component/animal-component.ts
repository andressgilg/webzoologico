import { ChangeDetectorRef, Component } from '@angular/core';
import { AnimalService } from '../../services/animal-service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-animal-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './animal-component.html',
  styleUrl: './animal-component.css',
})
export class AnimalComponent {
  animalList: any = [];
  animalForm: FormGroup | any;

  constructor(private animalService: AnimalService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  getAllAnimals() {
    this.animalService.getAllAnimalsData().subscribe((data: {}) => {
      this.animalList = data;
      console.log(this.animalList);
      this.cd.detectChanges();

    });
  }
  ngOnInit() {
    this.animalForm = this.formBuilder.group({
      nombre: '',
      edad: 0,
      tipo: ''
    }),
      this.getAllAnimals();
  }
  ngOnChanges() {
    this.getAllAnimals();
  }
  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }
  newAnimalEntry() {
    this.animalService.newAnimal(this.animalForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /inicio y recargando la ventana
        this.router.navigate(['/inicio'])
          .then(() => {
            this.newMessage('Registro exitoso');
          })
      }
    );
  }
}
