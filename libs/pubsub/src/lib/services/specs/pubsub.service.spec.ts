import { TestBed } from '@angular/core/testing';
import { PubsubModule } from '../../pubsub.module';
import { PubsubService } from '../pubsub.service';

describe('PubSub service', () => {
  let pubsubService: PubsubService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PubsubModule],
    });

    pubsubService = TestBed.inject(PubsubService);
  });

  it('should be defined', () => {
    expect(pubsubService).toBeDefined();
  });
});
