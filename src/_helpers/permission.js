'use strict'

import {createContext} from 'react'
import {createContextualCan} from '@casl/react'
import { Ability } from '@casl/ability'

const permissionAbility = new Ability([])

export const buildPermissionRules = (userPermissionArray) => {
  permissionAbility.update(
    userPermissionArray.map( item => {
      return {action: 'do', subject: item}
    })
  )
}
export const PermissionContext = createContext()
export const Can = createContextualCan(PermissionContext.Consumer)
export default permissionAbility