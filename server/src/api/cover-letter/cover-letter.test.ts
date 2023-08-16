import request from 'supertest';
import app from '../../app';

const inputUrl =
  'https://www.linkedin.com/jobs/search/?alertAction=viewjobs&currentJobId=3687698460&savedSearchId=1735769914';
const inputUrlbroke = 'https://www.linkedin.com/jobs/search/';
const inputUrlbrokeZode = 'https:/';

describe('POST /api/v1/cover-letter', () => {
  it('responds with Zod error', (done) => {
    request(app)
      .post('/api/v1/cover-letter')
      .set('Accept', 'application/json')
      .send({ url: inputUrlbrokeZode })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('stack');
        done();
      });
  });
  it('responds with not found error', (done) => {
    request(app)
      .post('/api/v1/cover-letter')
      .set('Accept', 'application/json')
      .send({ url: inputUrlbroke })
      .expect('Content-Type', /json/)
      .expect(500)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('stack');
        done();
      });
  });
  it('responds with job description and title', (done) => {
    request(app)
      .post('/api/v1/cover-letter')
      .set('Accept', 'application/json')
      .send({
        url: inputUrl,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('company');
        expect(response.body).toHaveProperty('description');
        done();
      });
  });
});

describe('POST /api/v1/cover-letter/test', () => {
  it('responds with job description and title', async () => {
    const response = await request(app)
      .get('/api/v1/cover-letter/test')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('data');
  }, 10000); // 10 seconds timeout
});
