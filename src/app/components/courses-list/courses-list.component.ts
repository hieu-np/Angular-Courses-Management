import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.class';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit, OnDestroy {

  courses: Course[] = [];
  subscription!: Subscription;
  constructor(
    public courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.subscription = this.courseService.getAllCourses().subscribe(
      data => {
        this.courses = data;
      }
    )
  }

  ngOnDestroy(): void {
      if(this.subscription){
        this.subscription.unsubscribe();
      }
  }

}
