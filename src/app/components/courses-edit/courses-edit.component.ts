import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/models/course.class';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-courses-edit',
  templateUrl: './courses-edit.component.html',
  styleUrls: ['./courses-edit.component.css']
})
export class CoursesEditComponent implements OnInit {

  constructor(
    public courseService: CourseService,
    public router: Router,
    public activatedRouteService: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadData();
    
  }
  
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
    if(this.subscriptionParams){
      this.subscriptionParams.unsubscribe()
    }
  }

  subscription!: Subscription;
  subscriptionParams!: Subscription;

  spiner: boolean= false;

  public course: Course = {
    id: 0,
    name: '',
    fee: 0,
    description: ''
  }

  onEditCourse() {
    this.spiner = true;
    this.subscription = this.courseService.updateCourse(this.course).subscribe(
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

  loadData() {
    this.subscriptionParams = this.activatedRouteService.params.subscribe(
      data => {
        this.subscription = this.courseService.getCourseById(data['id']).subscribe(
          data => {
            this.course = data;
          }
        )
        
      }
    )
  }
}
