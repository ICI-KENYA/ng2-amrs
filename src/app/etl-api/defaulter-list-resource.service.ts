
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-settings/app-settings.service';
import { DataCacheService } from '../shared/services/data-cache.service';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable()
export class DefaulterListResourceService {
  constructor(protected http: HttpClient,
              protected appSettingsService: AppSettingsService,
              private cacheService: DataCacheService) {
  }

  public getUrl(reportName): string {
    return this.appSettingsService.getEtlRestbaseurl().trim() + reportName;
  }

  public getDefaulterList(params) {
    if (!params.startIndex) {
      params.startIndex = '0';
    }
    if (!params.limit) {
      params.limit = '300';
    }
    let urlParams: HttpParams = new HttpParams()
    .set('startIndex', params.startIndex)
    .set('defaulterPeriod', params.defaulterPeriod)
    .set('maxDefaultPeriod', params.maxDefaultPeriod)
    .set('locationUuids', params.locationUuids)
    .set('limit', params.limit);
    let url = this.getUrl('defaulter-list');
    let request = this.http.get<any>(url, {
      params: urlParams
    });
    return this.cacheService.cacheRequest(url, urlParams, request);

  }

}
