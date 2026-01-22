import { Player } from "../entities/noteishCreatorClass_v1_2.js";
import { NarrationManager } from "../entities/noteNarration_v1_2.js";
import { NoteishManager } from "../entities/noteishManager_v1_2.js"
import { LogNote } from "../entities/logNote.js";

import { weaponsArray } from "../item_sets/noteish_weaponset.js";

const narrationManager = new NarrationManager()
const characterManager = new NoteishManager()
const newPlayer1 = new Player('Marcus')

narrationManager.charAutoEquip(newPlayer1.autoEquipWeapon(weaponsArray))
console.warn('****')
console.warn('Expectation Charater is created \nAuto-Equip to be run')
console.warn('****')


narrationManager.charAutoEquip
narrationManager.addMessage(characterManager.addCharactersMessage(newPlayer1,'Yo How`s life?'))
narrationManager.addMessage(characterManager.addCharactersMessage(newPlayer1,'Yo How`s life?'))
narrationManager.addMessage(characterManager.addCharactersMessage(newPlayer1,'Yo How`s life?'))
narrationManager.addMessage(characterManager.addCharactersMessage(newPlayer1,'Yo How`s life?'))
narrationManager.addMessage(characterManager.addCharactersMessage(newPlayer1,'Yo How`s life?'))
narrationManager.addMessage(characterManager.addCharactersMessage(newPlayer1,'Yo How`s life?'))

narrationManager.xpAndLevelMessage(characterManager.xpGainIndividual(newPlayer1,75))
narrationManager.xpAndLevelMessage(characterManager.xpGainIndividual(newPlayer1,555))
narrationManager.xpAndLevelMessage(characterManager.xpGainIndividual(newPlayer1,38))



characterManager.quickPPurchaseShhhhh(newPlayer1,2)
characterManager.quickPPurchaseShhhhh(newPlayer1,1)

console.log(...newPlayer1.chest)

narrationManager.equipNarration(characterManager.equipCharweapon(newPlayer1,1))
narrationManager.equipNarration(characterManager.equipCharweapon(newPlayer1,2))

narrationManager.charAutoEquip(newPlayer1.autoEquipWeapon(weaponsArray))

console.log(...newPlayer1.chest)







