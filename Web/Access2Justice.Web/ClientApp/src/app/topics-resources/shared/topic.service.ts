import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Topic, ITopicInput } from './topic';
import { api } from '../../../api/api';
import { MapLocation, LocationDetails } from '../../shared/map/map';
import { Global } from '../../global';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TopicService {
  constructor(private http: HttpClient,private global: Global) { }

  topicInput: ITopicInput = { Id: '', Location: '', IsShared: false  };
  mapLocation: MapLocation = { state: '', city: '', county: '', zipCode: '' };
  locationDetails: LocationDetails;

  loadStateName(): MapLocation {
    if (sessionStorage.getItem("globalMapLocation")) {
      this.locationDetails = JSON.parse(sessionStorage.getItem("globalMapLocation"));
      this.mapLocation = this.locationDetails.location;
      return this.mapLocation;
    }
  }
  getTopics(): Observable<any> {
    this.mapLocation = this.loadStateName();
    if (this.mapLocation) {
      this.mapLocation.city = "";
      this.mapLocation.county = "";
      this.mapLocation.zipCode = "";
    }
    return this.http.post<Topic>(api.topicUrl, JSON.stringify(this.mapLocation), httpOptions);
  }
  getSubtopics(id): Observable<any> {
    this.buildParams(id);
    return this.http.post<Topic>(api.subtopicUrl, JSON.stringify(this.topicInput), httpOptions);

  }
  getSubtopicDetail(id): Observable<any> {
    this.buildParams(id);
    return this.http.post<Topic>(api.subtopicDetailUrl, JSON.stringify(this.topicInput), httpOptions);
  }

  getDocumentData(id): Observable<any> {
    this.buildParams(id);
    return this.http.post<Topic>(api.getDocumentUrl, JSON.stringify(this.topicInput), httpOptions);
  }

  buildParams(id) {
    this.topicInput.Id = id;
    this.topicInput.Location = this.loadStateName();
    if (location.pathname.indexOf(this.global.shareRouteUrl) >= 0) {
      this.topicInput.IsShared = true;
    }
  }
}
