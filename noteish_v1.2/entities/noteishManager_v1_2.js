import { weaponsArray } from "../item_sets/noteish_weaponset.js"
import { Player1,Player2 } from "./noteishCreatorClass_v1_2.js"
/**  a class export for the live note pad
 *   this will be the noteish file creation, the setters and getters are to manage the inflow of message data prior to logging with the manager
*/
export class NoteishManager { 

  static maxPlayers = 2
  static maxNumberOfMessages = 5
  static maxMessageCharacters = 50
  static maxNameCharacters = 10

constructor(name) {
  this.name = name || 'characterManager'
  this.numberOfPlayers = 0

  this.loggedMessage = []
  this.fileNames = []
  this.timestamp = new Date().toISOString().slice(0,19).replace('T', ' ');
  this.message = null

}

playerCreation(playerName) {
const nameRegex = /^[A-Za-z0-9]{1,10}$/

if (!nameRegex.test(playerName)) return {type: 'Nme_Err', name: playerName, payload: null, metaData:{PN:null, PL:null}, success: 'fail'} 

switch (true) {
  case(this.numberOfPlayers == 1): {
    const player2 = new Player2(playerName)
    this.numberOfPlayers = 2
  return {type: 'Ply2_Cre', name: playerName, payload: player2, metaData:{PN:player2.name, PL:player2.level}, success: 'pass'} 
}

 case(this.numberOfPlayers <1): {
   const player1 = new Player1(playerName)
   this.numberOfPlayers = 1
  return {type: 'Ply1_Cre', name: playerName, payload: player1, metaData:{PN:player1.name, PL:player1.level}, success: 'pass'} 

}}}



charSummary(char) {

const {type, name, payload, metaData:{Name, Level, HP, MP,ATK, STR, ARM, DEF, AGI, WPN,XP,TOTXP,MAXXP,MNY}, success}= char.summary()
return {type, name, payload, metaData:{Name, Level, HP, MP,ATK, STR, ARM, DEF, AGI, WPN,XP,TOTXP,MAXXP,MNY}, success}
}


xpGainIndividual(char,xpEarned) {
 if (char.hp >0 ) {
const { name, payload, metaData:{newLevel, oldLevel}} = char.xpGain(xpEarned)
return {type: 'EXP_GAN', name, payload, metaData:{newLevel, oldLevel}, success: 'pass'}
 } else {

  return {type: 'EXP_GAN', name: char.name, payload:null, metaData:{newLevel:null, oldLevel:null}, success: 'fail'}
 }
}

equipCharweapon(char,wanted) {
for (let searchWeapon of char?.chest) {
    if (wanted === searchWeapon.name && searchWeapon.level <= char.level) {

           const returnMessage = 'equiped'
        const { name, metaData:{oldWeapon, newWeapon}}  = char.equipWeapon(wanted)
    return {type: 'EQP_WPN', name, payload: returnMessage, metaData:{oldWeapon, newWeapon}, success: 'pass'}

    }  else if (wanted === searchWeapon.name && searchWeapon.level > char.level) {

    const newWeapon = searchWeapon
      const returnMessage = 'Lvl-high'
        return {type: 'EQP_WPN', name: char.name, payload: returnMessage, metaData:{oldWeapon:null, newWeapon}, success: 'fail'}
  }

 }

}

autoEquipCharweapon(char) {
if (char.chest) {
   const returnMessage = 'auto-equipped'
 const { name, metaData:{oldWeapon, newWeapon}} = char.autoEquipWeapon()

  return {type: 'AUT_EQP', name, payload: returnMessage, metaData:{oldWeapon, newWeapon}, success: 'pass'} 
}else {
  const returnMessage = 'auto-equip fail'
    return {type: 'AUT_EQP', name: char.name, payload: returnMessage, metaData:{oldWeapon, newWeapon}, success: 'fail'}
}}


addCharactersMessage(char,message) {

if (char.actualMessages.length<NoteishManager.maxNumberOfMessages) {

  const {name,payload,metaData} = char.addNote(message)
  return {type: 'ADD_MSG',name,payload,metaData, success: 'pass'}
}   else if (char.actualMessages.length >=NoteishManager.maxNumberOfMessages)  
{
return {
  type: 'ADD_MSG',
  name: char.name, 
  payload: char.noteMessage,
  metaData: char.actualMessages.length,
  success: 'fail'
}}
}

deleteCharNotes(char,noteNum) {
  const {type, name,payload, metaData, success} = char.deleteNote(noteNum)
  return  {type, name,payload, metaData, success}
}  

printCharNotes(char,noteNum) {
  const {type, name,payload, metaData, success} = char.printMessage(noteNum)
  return {type, name,payload, metaData, success}
}  


purchaseWeapon(char,wanted) {
const {type, name,payload, metaData:{spent, left}, success} = char.purchaseWeapon(wanted)
  return {type, name,payload, metaData:{spent, left}, success}

}




showInventory(char) {
let inventory = []
let slotNum = 0
  inventory = char.chest.map(elem => {
    return `Slot ${slotNum+=1} - ${elem.name} - qty: ${elem.qty}`
}).join('\n') || 'Empty'

const noteMessage = `Current Inventory:- ${inventory}`  

return noteMessage
}

}