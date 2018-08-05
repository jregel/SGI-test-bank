import uuid from 'uuid/v1';
import * as db from './dynamo';

const TableName = 'tests';

export function getTests() {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'test_name',
      'creation_date',
    ],
  };

  return db.scan(params);
}

export function getTestById(id) {
  const params = {
    TableName,
    Key: {
      id,
    },
  };

  return db.get(params);
}

export function createTest(args) {
  const params = {
    TableName,
    Item: {
      id: uuid(),
      test_name: args.test_name,
      creation_date: args.creation_date,
    },
  };

  return db.createItem(params);
}

export function updateTest(args) {
  const params = {
    TableName: 'tests',
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {
      ':test_name': args.test_name,
      ':creation_date': args.last_name,
    },
    UpdateExpression: 'SET test_name = :test_name, creation_date = :creation_date',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
}

export function deleteTest(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
