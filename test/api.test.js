const { test } = require('node:test');
const assert = require('node:assert/strict');
const { ObjectId } = require('mongodb');
const { createServer } = require('../server');
const { createResolvers } = require('../graphql/resolvers');
const { createStore } = require('../mongo/client');

const id = new ObjectId('507f1f77bcf86cd799439011');

test('creates and queries breadcrumbs through the actual schema', async t => {
  const rows = [];
  const model = { save: async row => { const saved = { ...row, _id: id }; rows.push(saved); return saved; }, all: async () => rows };
  const server = createServer({ resolvers: createResolvers(model) });
  t.after(() => server.stop());
  const created = await server.executeOperation({ query: 'mutation { createBreadCrumb(element: "button", type: "click") { _id element type value } }' });
  assert.equal(created.body.kind, 'single');
  assert.equal(created.body.singleResult.errors, undefined);
  assert.equal(created.body.singleResult.data.createBreadCrumb._id, id.toString());
  const result = await server.executeOperation({ query: '{ breadCrumbs { _id element type } }' });
  assert.equal(result.body.singleResult.data.breadCrumbs.length, 1);
  assert.equal(result.body.singleResult.data.breadCrumbs[0].element, 'button');
});

test('rejects missing required input and unsupported operations', async t => {
  const server = createServer({ resolvers: createResolvers({ all: async () => [] }) });
  t.after(() => server.stop());
  for (const query of ['mutation { createBreadCrumb(type: "click") { _id } }', 'mutation { deleteBreadCrumb(id: "x") { _id } }']) {
    const result = await server.executeOperation({ query });
    assert.ok(result.body.singleResult.errors?.length);
  }
});

test('returns persistence errors as GraphQL errors', async t => {
  const server = createServer({ resolvers: createResolvers({ all: async () => { throw Error('database unavailable'); } }) });
  t.after(() => server.stop());
  const result = await server.executeOperation({ query: '{ breadCrumbs { _id } }' });
  assert.equal(result.body.singleResult.data.breadCrumbs, null);
  assert.ok(result.body.singleResult.errors?.length);
});

test('waits for insertion before closing and returns the inserted identifier', async () => {
  const steps = [];
  const client = {
    connect: async () => steps.push('connect'),
    db: () => ({ collection: () => ({ insertOne: async () => { await Promise.resolve(); steps.push('insert'); return { insertedId: id }; } }) }),
    close: async () => steps.push('close'),
  };
  const result = await createStore(() => client).save('breadCrumb', { type: 'click' });
  assert.equal(result._id, id);
  assert.deepEqual(steps, ['connect', 'insert', 'close']);
});

test('closes the database client on failed connections and queries', async () => {
  for (const failurePoint of ['connect', 'query']) {
    let closed = false;
    const client = {
      connect: async () => { if (failurePoint === 'connect') throw Error('offline'); },
      db: () => ({ collection: () => ({ find: () => ({ toArray: async () => { throw Error('offline'); } }) }) }),
      close: async () => { closed = true; },
    };
    await assert.rejects(createStore(() => client).all('breadCrumb'), /offline/);
    assert.equal(closed, true);
  }
});
