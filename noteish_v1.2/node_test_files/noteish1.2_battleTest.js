import {Player} from "../entities/noteishCreatorClass_v1_2.js"
import { NarrationManager } from "../entities/noteishNarration_v1_2.js";
import { NoteishManager } from "../entities/noteishManager_v1_2.js"
import { BattleManager } from "../entities/noteishBattle_v1_2.js";
import { weaponsArray } from "../item_sets/noteish_weaponset.js";

const narrationManager = new NarrationManager()
const characterManager = new NoteishManager()
const battleManager = new BattleManager()


const newPlayer1 = characterManager.playerCreation('Marcus',Player)
const newPlayer2 = characterManager.playerCreation('Mo',Player)


narrationManager.addMessage(characterManager.addCharactersMessage(newPlayer1,'Hello'))
narrationManager.addMessage(characterManager.addCharactersMessage(newPlayer1,'Hello'))

    console.log(battleManager.self(newPlayer1,newPlayer1,newPlayer2))
    console.log(battleManager.enemies(newPlayer1,newPlayer1,newPlayer2))
console.warn('The 2 functions to check if a target will be self or enemy\n')

    console.log(JSON.stringify(newPlayer1))
    console.log(JSON.stringify(newPlayer2))
console.warn('All character info show in a stringified fashion\n')

    narrationManager.xpAndLevelMessage(characterManager.xpGainIndividual(newPlayer1,100))
    narrationManager.xpAndLevelMessage(characterManager.xpGainIndividual(newPlayer1,500))
        newPlayer1.purchaseWeapon('axe')   
console.log(...newPlayer1.chest)
      narrationManager.autoequipNarration(newPlayer1.autoEquipWeapon())
        narrationManager.summaryAnnouncment(newPlayer1.summary())


    narrationManager.xpAndLevelMessage(characterManager.xpGainIndividual(newPlayer2,100))
    narrationManager.xpAndLevelMessage(characterManager.xpGainIndividual(newPlayer2,500)) 
    newPlayer2.purchaseWeapon('sword')  
    console.log(...newPlayer2.chest) 
      narrationManager.autoequipNarration(newPlayer2.autoEquipWeapon())
        narrationManager.summaryAnnouncment(newPlayer2.summary())
console.warn('Testing xp>levelling, auto-equip, and a basic summary.\nAll in prep for possible battle/adventure\n')

fight(newPlayer1,newPlayer2)
console.warn('Turn order set and annouced')

 function deathcheck(target) { return target.hp <=0 }

async function fight(ply1,ply2) {
const maxRounds = 50
let roundNum = 1 
while (roundNum <= maxRounds)
{  
  console.log('\n****\n')
    console.warn(`Round Number ${roundNum}`)
      let turnOrder = battleManager.getTurnOrder(ply1,ply2)
        narrationManager.turnOrderAnnouncer(turnOrder)
     
  battleManager.attack(turnOrder[0],turnOrder[1],battleManager.targetHp,roundNum) 
    if (turnOrder[1].hp<=0) { 
      winLoss(turnOrder[0],turnOrder[1])
        break;};

        battleManager.attack(turnOrder[1],turnOrder[0],battleManager.targetHp,roundNum) 
    if (turnOrder[0].hp<=0) { 
      winLoss(turnOrder[1],turnOrder[0])
  break;};
  roundNum +=1

}

}

// win/loss output
function winLoss(win,lose) {
  console.log(`${win.name} ${win.hp}`)
  console.log(`${lose.name} ${lose.hp}`)
}




