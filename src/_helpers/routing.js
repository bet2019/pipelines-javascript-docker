import dot from 'dot-object'

export const routes = {
  root: '/',
  ui: {
    manager: '/app',
    internalUser: {
      users: {
        _self: '/app/users',
        list: '/app/users',
        create: '/app/users/create',
        view: '/app/users/:userUuid'
      },
      labs: {
        _self: '/app/labs',
        list: '/app/labs',
      },
      calendar: {
        nominationEvents: '/app/calendar/nomination-events',
      },
      nominations: {
        _self: '/app/nominations',
        list: '/app/nominations',
        create: '/app/nominations/new',
        view: '/app/nominations/:nominationId',
        edit: '/app/nominations/:nominationId/edit',
        writeups: {
          _self:  '/app/nominations/:nominationId/writeups',
          create: '/app/nominations/:nominationId/writeups/new',
          edit:   '/app/nominations/:nominationId/writeups/:writeupId/edit',
          view:   '/app/nominations/:nominationId/writeups/:writeupId'
        }
      },
      companies: {
        _self: '/app/companies',
        edit: '/app/companies/:companyId'
      },
      reports: {
        _self: '/app/reports',
        internalProductFeedback: '/app/reports/internal-product-feedback',
        customerProductFeedback: '/app/reports/customer-product-feedback',
        labSubmittedCompletedNominationsStat: '/app/reports/labs-submitted-completed-nominations-stat',
        labCompletedNominationsSummary: '/app/reports/labs-completed-nominations-summary',
        labUpcomingNominations: '/app/reports/lab-upcoming-nomination',
        powerBiReport: '/app/reports/powerbi-report',
      },
      settings: {
        nominationSources: {
          list:   '/app/settings/nomination-sources',
        },
        industryVertical: {
          list:   '/app/settings/industry-vertical',
        },
        customerChannel: {
          list:   '/app/settings/customer-channel',
        },
        acl: {
          _self:  '/app/settings/acl',
          list:   '/app/settings/acl',
          create: '/app/settings/acl/create',
          edit:   '/app/settings/acl/:roleId/edit',
        }
      },
      help:       '/app/help'
    },
    externalUser: {
      companies: {
        _self: '/app/companies',
        edit: '/app/companies/:companyId'
      },
      nominations: {
        _self: '/app/nominations',
        list: '/app/nominations',
        create: '/app/nominations/new',
        view: '/app/nominations/:nominationId',
        edit: '/app/nominations/:nominationId/edit',
      },
    }
  },
  api: {
    bootstrap: '/api/bootstrap',
    internal: {
      help:     '/api/int/app/help',
      users: {
        getLabMembers: '/api/int/users/lab-members',
        cget:   '/api/int/users',
        post:   '/api/int/users',
        get:    '/api/int/users/:userUuid',
        patch:  '/api/int/users/:userUuid',
        delete: '/api/int/users/:userUuid'
      },
      userRoles: {
        cgetFlat: '/api/int/users/roles?flat=1',
        cget:     '/api/int/users/roles',
        post:     '/api/int/users/roles',
        get:      '/api/int/users/roles/:roleId',
        delete:   '/api/int/users/roles/:roleId',
        patch:    '/api/int/users/roles/:roleId',
        cgetSupportedPermission: '/api/int/users/roles/supported-permission',
      },
      companies: {
        get:      '/api/int/companies/:companyId',
        patch:    '/api/int/companies/:companyId'
      },
      calendar: {
        nominationEvents: '/api/int/calendar/nominations-events'
      },
      nominations: {
        cget:   '/api/int/nominations',
        post:   '/api/int/nominations',
        get:    '/api/int/nominations/:nominationId',
        getStatusHistory:    '/api/int/nominations/:nominationId/status-history',
        patch:  '/api/int/nominations/:nominationId',
        duplicate:  '/api/int/nominations/:nominationId/duplicate',
        delete: '/api/int/nominations/:nominationId',
        writeups: {
          post:   '/api/int/nominations/:nominationId/writeups',
          patch:  '/api/int/nominations/:nominationId/writeups/:writeupId',
          get:    '/api/int/nominations/:nominationId/writeups/:writeupId',
        },
        followup: {
          cget:     '/api/int/nominations/:nominationId/followup',
          post:     '/api/int/nominations/:nominationId/followup',
          patch:    '/api/int/nominations/:nominationId/followup/:followupId',
          delete:   '/api/int/nominations/:nominationId/followup/:followupId'
        },
        testimonial: {
          cget:     '/api/int/nominations/:nominationId/testimonial',
          post:     '/api/int/nominations/:nominationId/testimonial',
          delete:   '/api/int/nominations/:nominationId/testimonial/:testimonialId',
          patch:    '/api/int/nominations/:nominationId/testimonial/:testimonialId'
        },
        workflowSteps: {
          cget:     '/api/int/nominations/:nominationId/workflowsteps',
          post:     '/api/int/nominations/:nominationId/workflowsteps',
          delete:   '/api/int/nominations/:nominationId/workflowsteps/:workflowStepId'
        }
      },      
      labs: {
        cget:   '/api/int/labs',
        post:   '/api/int/labs',
        get:    '/api/int/labs/:labId',
        delete: '/api/int/labs/:labId',
        patch:  '/api/int/labs/:labId'
      },
      globalDirectory: {
        cget:   '/api/int/global-directory/:gdScope',
        post:   '/api/int/global-directory/:gdScope',
        get:    '/api/int/global-directory/:gdScope/:gdItemId',
        delete: '/api/int/global-directory/:gdScope/:gdItemId',
        patch:  '/api/int/global-directory/:gdScope/:gdItemId'
      },
      reports: {
        nomination_overview_status: '/api/int/reports/dashboard/nomination-overview-status',
        nomination_require_attention: '/api/int/reports/dashboard/nomination-require-attention',
        internalProductFeedback: {
          cget: '/api/int/reports/internal-product-feedback',
          post: '/api/int/reports/internal-product-feedback',
          put: '/api/int/reports/internal-product-feedback/:internalProductFeedbackUuid',
          delete: '/api/int/reports/internal-product-feedback/:internalProductFeedbackUuid',
        },
        customerProductFeedback: '/api/int/reports/customer-product-feedback',
        submittedCompletedNominationsStat: '/api/int/reports/submitted-completed-nomination-stat',
        completedNominationsSummary: '/api/int/reports/completed-nomination-summary',
        upcomingNominations: '/api/int/reports/upcoming-nomination',
        getPowerBiReportConfig: '/api/int/reports/powerbi-report-config',
      }
    },
    externalUser: {
      nominations: {
        cget:   '/api/ext/nominations',
        post:   '/api/ext/nominations',
        get:    '/api/ext/nominations/:nominationId',
        patch:  '/api/ext/nominations/:nominationId',
        delete: '/api/ext/nominations/:nominationId',
        submit: '/api/ext/nominations/:nominationId/submit',
      },
      companies: {
        get:      '/api/ext/companies/:companyId',
        patch:    '/api/ext/companies/:companyId'
      },      
      globalDirectory: {
        cget:   '/api/ext/global-directory/:gdScope',
      }      
    }
  }
}

export const routesUI = routes.ui
export const routesAPI = routes.api
// export const routesFlatUI = dot.dot(routes.ui)
// export const routesFlatAPI = dot.dot(routes.api)

const Routing = {

  getRoute(path) {
    if (path.substring(0,7) === 'routes.') {
      path = path.substring(7)
    }

    let url = dot.pick(path, routes) || false;

    if (url) {
      return url;
    } else {
      throw `No route '${path}' found`;
    }
  },

  generate(path, params) {
    let url = (path[0] === '/') ? path : Routing.getRoute(path)

    if (params) {
      Object.keys(params).map((key, index) => {
        let value = params[key];
        url = url.replace(`:${key}`, value)
      });
    }

    return url;
  },
}

export default Routing;
