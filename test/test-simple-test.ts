import { expect } from 'chai';
import {SimpleTest} from '../src/parrot/simple-test';

describe('#simpleTest', function() {
    it('should not strip gif files', async()  => {

        const st: SimpleTest = new SimpleTest();
        await st.run();
    });

});
