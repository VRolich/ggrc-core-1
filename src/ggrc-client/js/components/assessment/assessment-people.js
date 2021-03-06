/*
 Copyright (C) 2019 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import {ROLES_CONFLICT} from '../../events/eventTypes';
import './assessment-custom-roles';
import '../custom-roles/custom-roles-modal';
import template from './templates/assessment-people.stache';

export default can.Component.extend({
  tag: 'assessment-people',
  view: can.stache(template),
  leakScope: false,
  viewModel: can.Map.extend({
    define: {
      emptyMessage: {
        type: 'string',
        value: '',
      },
    },
    rolesConflict: false,
    infoPaneMode: true,
    instance: {},
    mainRoles: [],
    deferredSave: null,
    isNewInstance: false,
    onStateChangeDfd: $.Deferred().resolve(),
    conflictRoles: ['Assignees', 'Verifiers'],
    orderOfRoles: ['Creators', 'Assignees', 'Verifiers'],
    setInProgress: $.noop(),
  }),
  events: {
    [`{instance} ${ROLES_CONFLICT.type}`]: function (ev, args) {
      this.viewModel.attr('rolesConflict', args.rolesConflict);
    },
  },
});
