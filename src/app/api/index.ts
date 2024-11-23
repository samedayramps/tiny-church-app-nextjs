import type { Database } from '@/types/database.types'
import { PostgrestError } from '@supabase/supabase-js'

// API Route Types
export type ApiResponse<T = unknown> = {
  data?: T
  error?: string
  message?: string
  status?: number
}

// Route Handlers
export * as apiKeys from './api-keys/route'
export * as apiKeysById from './api-keys/[id]/route'
export * as auditLogs from './audit-logs/route'
export * as auditLogsById from './audit-logs/[id]/route'
export * as emailSignups from './email-signups/route'
export * as emailSignupsById from './email-signups/[id]/route'
export * as eventAttendees from './event-attendees/route'
export * as eventAttendeesById from './event-attendees/[id]/route'
export * as events from './events/route'
export * as eventsById from './events/[id]/route'
export * as feedback from './feedback/route'
export * as feedbackById from './feedback/[id]/route'
export * as files from './files/route'
export * as filesById from './files/[id]/route'
export * as groups from './groups/route'
export * as groupsById from './groups/[id]/route'
export * as helpTickets from './help-tickets/route'
export * as helpTicketsById from './help-tickets/[id]/route'
export * as invitations from './invitations/route'
export * as invitationsById from './invitations/[id]/route'
export * as leadSubmissions from './lead-submissions/route'
export * as leadSubmissionsById from './lead-submissions/[id]/route'
export * as logs from './logs/route'
export * as logsById from './logs/[id]/route'
export * as memberGroups from './member-groups/route'
export * as memberGroupsById from './member-groups/[id]/route'
export * as memberRoles from './member-roles/route'
export * as memberRolesById from './member-roles/[id]/route'
export * as notifications from './notifications/route'
export * as notificationsById from './notifications/[id]/route'
export * as organizationSettings from './organization-settings/route'
export * as organizationSettingsById from './organization-settings/[id]/route'
export * as organizations from './organizations/route'
export * as organizationsById from './organizations/[id]/route'
export * as payments from './payments/route'
export * as paymentsById from './payments/[id]/route'
export * as reports from './reports/route'
export * as reportsById from './reports/[id]/route'
export * as roles from './roles/route'
export * as rolesById from './roles/[id]/route'
export * as statusLookup from './status-lookup/route'
export * as statusLookupById from './status-lookup/[id]/route'
export * as subscriptions from './subscriptions/route'
export * as subscriptionsById from './subscriptions/[id]/route'
export * as systemInfo from './system-info/route'
export * as systemInfoById from './system-info/[id]/route'
export * as systemSettings from './system-settings/route'
export * as systemSettingsById from './system-settings/[id]/route'
export * as tasks from './tasks/route'
export * as tasksById from './tasks/[id]/route'
export * as ticketComments from './ticket-comments/route'
export * as ticketCommentsById from './ticket-comments/[id]/route'

// Common Error Messages
export const ERROR_MESSAGES = {
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden access',
  SERVER_ERROR: 'Internal server error',
  VALIDATION_ERROR: 'Validation error',
  DATABASE_ERROR: 'Database error',
} as const

// Common HTTP Status Codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const

// Helper function to create standardized API responses
export function createApiResponse<T>(
  data?: T,
  error?: string,
  status: number = STATUS_CODES.OK
): ApiResponse<T> {
  if (error) {
    return {
      error,
      status: status >= 400 ? status : STATUS_CODES.BAD_REQUEST,
    }
  }
  return {
    data,
    status,
  }
}

// Helper function to handle database errors
export function handleDatabaseError(error: PostgrestError | Error) {
  console.error('Database error:', error)
  return createApiResponse(
    undefined,
    error.message || ERROR_MESSAGES.DATABASE_ERROR,
    STATUS_CODES.SERVER_ERROR
  )
}

// Helper function to handle server errors
export function handleServerError(error: Error) {
  console.error('Server error:', error)
  return createApiResponse(
    undefined,
    ERROR_MESSAGES.SERVER_ERROR,
    STATUS_CODES.SERVER_ERROR
  )
}

// Export Database type for use in route handlers
export type { Database } 