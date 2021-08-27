import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { Car } from './car';
import { CarSortBy } from './car-sort-by.enum';

@Injectable()
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getAllCars(sortBy: string, searchTerm?: string): Observable<Car[]> {
    let order = 1;
    let search = 'manufacturer';

    switch (sortBy) {
      case CarSortBy.MILEAGE_ASCENDING:
        search = 'mileage';
        order = 1;
        break;
      case CarSortBy.MILEAGE_DESCENDING:
        search = 'mileage';
        order = -1;
        break;
      case CarSortBy.PRICE_ASCENDING:
        search = 'price';
        order = 1;
        break;
      case CarSortBy.PRICE_DESCENDING:
        search = 'price';
        order = -1;
        break;
      default:
        search = 'manufacturer';
        order = 1;
    }

    if (searchTerm && searchTerm !== '' && searchTerm !== null) {
      return this.httpClient.get<Car[]>(
        `${apiUrl}cars/search/${search}/${order}/${searchTerm}`
      );
    }
    return this.httpClient.get<Car[]>(`${apiUrl}cars/${search}/${order}`);
  }

  getCarById(id: string): Observable<Car> {
    return this.httpClient.get<Car>(`${apiUrl}cars/${id}`);
  }

  searchCars(searchTerm: string): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${apiUrl}cars/search/${searchTerm}`);
  }

  saveCar(car: Car, isNewCar: boolean): Observable<Car> {
    console.log(`Car in Service has imageUrl: ${car.imageUrl}`);
    if (isNewCar) return this.httpClient.post<Car>(`${apiUrl}cars`, car);
    return this.httpClient.put<Car>(`${apiUrl}cars/update/${car._id}`, car);
  }

  deleteCar(car: Car): Observable<Car> {
    return this.httpClient.delete<Car>(`${apiUrl}cars/${car._id}`);
  }
}
