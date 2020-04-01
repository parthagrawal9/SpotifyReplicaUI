import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSongFormComponent } from './new-song-form.component';

describe('NewSongFormComponent', () => {
  let component: NewSongFormComponent;
  let fixture: ComponentFixture<NewSongFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSongFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSongFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
