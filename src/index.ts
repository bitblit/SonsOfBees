import {SimpleTest} from './parrot/simple-test';
import {Logger} from '@bitblit/ratchet/dist/common/logger';

const inst: SimpleTest = new SimpleTest();

inst.run().then(()=>{Logger.info('Done')});