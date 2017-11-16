import {
  APP_INITIALIZER,
  NgModule,
  NgZone,
  InjectionToken,
} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import {
  AlertModule,
  BsDropdownModule,
  CollapseModule,
  ModalModule,
  PopoverModule,
  TabsModule,
  TooltipModule,
  TypeaheadModule,
} from 'ngx-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { Restangular, RestangularModule } from 'ngx-restangular';
import { TourNgxBootstrapModule } from 'ngx-tour-ngx-bootstrap';
import { NotificationModule } from 'patternfly-ng';
import { DataMapperModule } from '@atlasmap/atlasmap.data.mapper';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './approuting.module';
import { CanDeactivateGuard } from './common/can-deactivate-guard.service';
import { SyndesisCommonModule } from './common/common.module';
import { UserService } from './common/user.service';
import { ConfigService } from './config.service';
import { StoreModule } from './store/store.module';
import { SupportingModule } from './support/support.module';

export function appInitializer(configService: ConfigService) {
  return () => {
    return configService.load();
  };
}

export function restangularProviderConfigurer(
  restangularProvider: any,
  config: ConfigService,
) {
  restangularProvider.setPlainByDefault(true);
  restangularProvider.setBaseUrl(config.getSettings().apiEndpoint);

  restangularProvider.addResponseInterceptor((data: any, operation: string) => {
    if (operation === 'getList' && data && Array.isArray(data.items)) {
      const pagingData = data.items;
      if (!!pagingData.totalCount) {
        pagingData.totalCount = data.totalCount;
      } else {
        pagingData.totalCount = pagingData.length;
      }
      return pagingData;
    }
    if (!data) {
      return [];
    }
    return data;
  });
}

export const RESTANGULAR_MAPPER = new InjectionToken<Restangular>(
  'restangularMapper',
);
export function mapperRestangularProvider(
  restangular: Restangular,
  config: ConfigService,
) {
  return restangular.withConfig(restangularConfigurer => {
    const mapperEndpoint = config.getSettings().mapperEndpoint;
    restangularConfigurer.setBaseUrl(
      mapperEndpoint ? mapperEndpoint : '/mapper/v1',
    );
  });
}

/**
 * The main module of this library. Example usage:
 *
 * ```typescript
 * import { AppModule } from 'syndesis-ui';
 *
 * &commat;NgModule({
 *   imports: [
 *     AppModule.forRoot()
 *   ]
 * })
 * class AppModule {}
 * ```
 *
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // TODO - commenting this out for now as it seems to prevent the angular router from clearing it's child elements on route changes
    //BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DynamicFormsCoreModule.forRoot(),
    RestangularModule.forRoot([ConfigService], restangularProviderConfigurer),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    TypeaheadModule.forRoot(),
    TagInputModule,
    AppRoutingModule,
    SupportingModule,
    StoreModule,
    SyndesisCommonModule.forRoot(),
    DataMapperModule,
    NotificationModule,
    TourNgxBootstrapModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: RESTANGULAR_MAPPER,
      useFactory: mapperRestangularProvider,
      deps: [Restangular, ConfigService],
    },
    ConfigService,
    UserService,
    CanDeactivateGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
