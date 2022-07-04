import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.class';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  API: string = 'http://localhost:3000/courses';

  constructor(
    public http: HttpClient
  ) { 

  }

  getAllCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(this.API)
  }
}