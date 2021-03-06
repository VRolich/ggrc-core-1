/*
  Copyright (C) 2019 Google Inc.
  Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

import CanModel from 'can-model/src/can-model';
import CanMap from 'can-map/can-map';

describe('validateIssueTrackerIssueId extension', () => {
  let TestModel;

  beforeAll(() => {
    TestModel = CanModel.extend({
      unchangeableIssueTrackerIdStatuses: ['Fixed'],
    }, {
      define: {
        issue_tracker: {
          value: {},
          validate: {
            validateIssueTrackerIssueId() {
              return this.constructor.unchangeableIssueTrackerIdStatuses;
            },
          },
        },
      },
      status: '',
    });
  });

  it('should return TRUE. issue tracker is disabled', () => {
    const instance = new TestModel();
    instance.attr('issue_tracker', new CanMap({
      enabled: false,
    }));
    expect(instance.validate()).toBeTruthy();
    expect(instance.errors.issue_tracker).toBeUndefined();
  });

  it('should return TRUE. issue tracker is empty object', () => {
    const instance = new TestModel();
    instance.attr('issue_tracker', {});
    expect(instance.validate()).toBeTruthy();
    expect(instance.errors.issue_tracker).toBeUndefined();
  });

  it('should return TRUE. issue tracker has issue id', () => {
    const instance = new TestModel();
    instance.attr('issue_tracker', new CanMap({
      enabled: true,
      issue_id: 12345,
    }));
    instance.attr('status', 'Fixed');
    expect(instance.validate()).toBeTruthy();
    expect(instance.errors.issue_tracker).toBeUndefined();
  });

  it('should return TRUE. issue tracker has wrong status', () => {
    const instance = new TestModel();
    instance.attr('issue_tracker', new CanMap({
      enabled: true,
    }));
    instance.attr('status', 'Draft');
    expect(instance.validate()).toBeTruthy();
    expect(instance.errors.issue_tracker).toBeUndefined();
  });

  it('should return FALSE. issue tracker does not have issue id', () => {
    const instance = new TestModel();
    instance.attr('issue_tracker', new CanMap({
      enabled: true,
    }));
    instance.attr('status', 'Fixed');
    expect(instance.validate()).toBeFalsy();
    expect(instance.errors.issue_tracker[0].issue_id)
      .toEqual('cannot be blank');
  });
});
