import {Injectable} from '@angular/core'

@Injectable({providedIn: 'root'})
export class UuidServant {

  public uuid(): string {
    const length = 5
    const uuidArray: string[] = []
    const possibleValues = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < length; i++) {
      uuidArray.push(possibleValues[Math.floor(Math.random() * possibleValues.length)])
    }
    return uuidArray.join('')
  }
}
