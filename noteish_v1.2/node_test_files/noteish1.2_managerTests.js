
import { NoteishManager } from "../entities/noteishManager_v1_2.js";
import { Player } from "../entities/noteishCreatorClass_v1_2.js"
const noteishManager = new NoteishManager()

const newPlayer1 = new Player('Marcus')
const newPlayer2 = new Player('Lion-O')



noteishManager.addCharactersMessage(newPlayer1,'Hello1')
noteishManager.addCharactersMessage(newPlayer1,'Hello2')
noteishManager.addCharactersMessage(newPlayer1,'Hello3')
noteishManager.addCharactersMessage(newPlayer1,'Hello4')
noteishManager.addCharactersMessage(newPlayer1,'Hello5')
noteishManager.addCharactersMessage(newPlayer1,'Hello6')

noteishManager.addCharactersMessage(newPlayer2,'Hello21')
noteishManager.addCharactersMessage(newPlayer2,'Hello22')
noteishManager.addCharactersMessage(newPlayer2,'Hello23')
noteishManager.addCharactersMessage(newPlayer2,'Hello24')
noteishManager.addCharactersMessage(newPlayer2,'Hello25')
noteishManager.addCharactersMessage(newPlayer2,'Hello26')


noteishManager.xpGainIndividual(newPlayer1,55)
noteishManager.xpGainIndividual(newPlayer1,55)
noteishManager.xpGainIndividual(newPlayer1,55)
noteishManager.xpGainIndividual(newPlayer1,55)

noteishManager.xpGainIndividual(newPlayer2,55)
noteishManager.xpGainIndividual(newPlayer2,55)
noteishManager.xpGainIndividual(newPlayer2,55)
noteishManager.xpGainIndividual(newPlayer2,55)

noteishManager.deleteCharNotes(newPlayer1,2)
noteishManager.printCharNotes(newPlayer1,0)

noteishManager.showInventory(newPlayer1)

noteishManager.quickPPurchaseShhhhh(newPlayer1,3)
noteishManager.quickPPurchaseShhhhh(newPlayer1,2)

noteishManager.showInventory(newPlayer1)

noteishManager.equipCharweapon(newPlayer1,2)

noteishManager.showInventory(newPlayer1)