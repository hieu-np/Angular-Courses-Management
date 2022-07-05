import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/models/course.class';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.css']
})
export class CoursesAddComponent implements OnInit, OnDestroy {

  constructor(
    public courseService: CourseService,
    public router: Router,
  ) { }

  ngOnInit(): void {

  }
  
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  subscription!: Subscription;

  spiner: boolean= false;

  public course: Course = {
    id: 0,
    name: '',
    fee: 0,
    description: ''
  }

  onAddCourse() {
    this.spiner = true;
    this.subscription = this.courseService.addCourse(this.course).subscribe(
      data => {
        if(data && data.id){
          this.spiner = false;
          this.router.navigate(['courses'])
        }
        
      },
      error => {
        this.spiner = false;
      }
    )

  }

}
