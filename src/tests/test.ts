import tap from 'tap'
import buildApp from './buildApp'

// TODO: Set-Up tests correctly
tap.test(`GET /api/changes (e2e)`, async (t) => {
    // Must be a fixture if more tests are added
    const app = buildApp();
    t.teardown(() => app.close());

    await app.ready();

    app.inject({
        method: 'GET',
        url: '/api/changes',
        query: {
            symbol: 'BNBUSDT'
        }
    }, (err, response) => {
        // No errors and status code must be 200
        t.error(err, 'No error must be thrown');

        // Must have a response
        t.notSame(response, undefined, 'Response must be defined');

        t.equal(response!.statusCode, 200);

        // TODO: Check for the correctness of difference on changes
    });
});