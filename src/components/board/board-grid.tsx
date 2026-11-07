import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import { isLocalImageUrl } from '@/lib/image-url'
import { Badge } from '@/components/ui/badge'
import { BOARD_ROLES, BOARD_ROLE_KEYS, type BoardBodyValue } from '@/lib/board'

async function loadMembers(body: BoardBodyValue) {
  try {
    return await prisma.boardMember.findMany({ where: { body }, select: { role: true, name: true, photo: true } })
  } catch (error) {
    // Keep the public page usable (all roles "tbd") if the table is missing or the DB is unreachable.
    // eslint-disable-next-line no-console
    console.error('Failed to load board members', error)
    return []
  }
}

export async function BoardGrid({ body, namespace }: { body: BoardBodyValue; namespace: 'club' | 'council' }) {
  const t = await getTranslations(namespace)
  const members = await loadMembers(body)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {BOARD_ROLES.map((role) => {
        const member = members.find((m) => m.role === role)
        return (
          <div
            key={role}
            className="flex flex-col gap-2 rounded-lg border border-border bg-muted/40 p-4 hover:bg-muted/70 transition-colors"
          >
            <Badge variant="secondary" className="w-fit text-xs">
              {t(`roles.${BOARD_ROLE_KEYS[role]}`)}
            </Badge>
            {member ? (
              <div className="flex items-center gap-3">
                {member.photo && (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={56}
                    height={56}
                    unoptimized={isLocalImageUrl(member.photo)}
                    className="size-14 shrink-0 rounded-full object-cover"
                  />
                )}
                <p className="font-semibold text-foreground">{member.name}</p>
              </div>
            ) : (
              <p className="font-semibold text-foreground">{t('tbd')}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
