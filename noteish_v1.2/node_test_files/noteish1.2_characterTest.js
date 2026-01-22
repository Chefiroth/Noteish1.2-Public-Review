import { Player } from "../entities/noteishCreatorClass_v1_2.js";


//expected newPlayer created, auto-equip initiated
const newPlayer = new Player('Marcus')
console.log('************')
console.warn('expected newPlayer created, auto-equip initiated')
console.log('************\n')


console.log(newPlayer.xpGain(800))
console.log('************')
console.warn('Expected: 8 levels gained with auto-equip initiating at points')
console.log('************\n')


console.log(newPlayer.addNote('hello'))
console.log(newPlayer.addNote('2nd note added'))

console.log('************')
console.warn('new message added to a message slot')
console.log('************\n')


console.log(newPlayer.summary())
console.log('************')
console.warn('Summary of character details along with any notes added')
console.log('************\n')


console.log(newPlayer.equipWeapon(1))
console.log(newPlayer.chest)

console.log(newPlayer.equipWeapon(1))
console.log(newPlayer.chest)

console.log('************')
console.warn('A set of user equip tests,\nexpected: previous weapon passed back to the charaters chest and new weapon equiped,\nboth actions being logged')
console.log('************\n')




