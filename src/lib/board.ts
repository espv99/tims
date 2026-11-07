export const BOARD_BODIES = ['CLUB', 'COUNCIL'] as const
export const BOARD_ROLES = ['PRESIDENT', 'VICE_PRESIDENT', 'SECRETARY', 'TREASURER', 'MEMBER'] as const

export type BoardBodyValue = (typeof BOARD_BODIES)[number]
export type BoardRoleValue = (typeof BOARD_ROLES)[number]

export interface BoardMemberDTO {
  id: string
  body: BoardBodyValue
  role: BoardRoleValue
  name: string
  photo: string | null
}

export function isBoardBody(value: unknown): value is BoardBodyValue {
  return typeof value === 'string' && (BOARD_BODIES as readonly string[]).includes(value)
}

export function isBoardRole(value: unknown): value is BoardRoleValue {
  return typeof value === 'string' && (BOARD_ROLES as readonly string[]).includes(value)
}

/** Message key under `<namespace>.roles` for each role. */
export const BOARD_ROLE_KEYS: Record<BoardRoleValue, string> = {
  PRESIDENT: 'president',
  VICE_PRESIDENT: 'vicePresident',
  SECRETARY: 'secretary',
  TREASURER: 'treasurer',
  MEMBER: 'member',
}
