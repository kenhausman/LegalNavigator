import { Component, OnInit } from '@angular/core';
import { PersonalizedPlanService } from '../../profile/personalized-plan/personalized-plan.service';
import { PersonalizedPlanCondition, Resources, PlanSteps } from '../../profile/personalized-plan/personalized-plan';
import { ActivatedRoute } from '@angular/router';
import { NavigateDataService } from '../../shared/navigate-data.service';

@Component({
  selector: 'app-personalized-plan',
  templateUrl: './personalized-plan.component.html',
  styleUrls: ['./personalized-plan.component.css']
})
export class PersonalizedPlanComponent implements OnInit {
  conditionsList: Array<PersonalizedPlanCondition>[];
  activeActionPlan = this.activeRoute.snapshot.params['id'];
  resources: Resources;
  topics: string;

  constructor(private personalizedPlanService: PersonalizedPlanService,
    private activeRoute: ActivatedRoute,
    private navigateDataService: NavigateDataService) { }

  getTopics(): void {
    this.personalizedPlanService.getActionPlanConditions(this.activeActionPlan)
      .subscribe(items => {
        if (items) {
          this.topics = items.topicTags;
          this.navigateDataService.setData(items);  
        }
      });
  }

  ngOnInit() {
    this.getTopics();
  }

}
