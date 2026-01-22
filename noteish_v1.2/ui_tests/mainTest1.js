// Classes
import {Player} from "../entities/noteishCreatorClass_v1_2.js"
import { NarrationManager } from "../entities/noteishNarration_v1_2.js";
import { NoteishManager } from "../entities/noteishManager_v1_2.js"
import { BattleManager } from "../entities/noteishBattle_v1_2.js";
import { weaponsArray } from "../item_sets/noteish_weaponset.js";

// Utility Functions
import { disableAllButtons,disable_enable_screen,disableScreens,
  enableAllButtons, renderCard, renderChest,readOnlySections } from "./main_js_utils/HTMLutilityFunctions.js";

  import { renderPlayer1Card, renderPlayer2Card } from "./main_js_utils/battleUtilityFunctions.js";


const narrationManager = new NarrationManager()
const characterManager = new NoteishManager()
const battleManager = new BattleManager()

const createNewPlayer = document.getElementById('createNewPlayer')
const deletePlayer = document.getElementById('deletePlayer')
const summarisePlayer = document.getElementById('summarisePlayer')
const player1_btn = document.getElementById('player1_btn')
const player2_btn = document.getElementById('player2_btn')

const first_box = document.getElementById('first_box')
const character_name = document.getElementById('character_name')

const notes_screen = document.getElementById('notes_screen')
const xp_lvl_screen = document.getElementById('xp_lvl_screen')
const shop_screen = document.getElementById('shop_screen')
const floating_screen = document.getElementById('floating_screen')

const equip_weapon = document.getElementById('equip_weapon')
const auto_eq = document.getElementById('auto_eq')
const player_chest = document.getElementById('player_chest')
const prep_battle1 = document.getElementById('prep_battle1')
const prep_battle2 = document.getElementById('prep_battle2')

const player_info_name = document.getElementById('player_info_name')
const player_info_level = document.getElementById('player_info_level')
const player_info_weapon = document.getElementById('player_info_weapon')
const player_info_gear = document.getElementById('player_info_gear')
const player_info_attack = document.getElementById('player_info_attack')
const player_info_armour = document.getElementById('player_info_armour')
const player_info_agility = document.getElementById('player_info_agility')
const xp_bar = document.getElementById('xp_bar')
const player_info_wallet = document.getElementById('player_info_wallet')

const min_xp = document.getElementById('min_xp')
const max_xp = document.getElementById('max_xp')

let selectedPlayer
let player1 = null
let player2 = null
let p1maxhp = null
let p2maxhp = null
let p1maxmp = null
let p2maxmp = null



// SCREEN BUTTON TOGGLES ---
notes_screen.addEventListener('click', () =>{
note_logger.classList.toggle("is-hidden")})

xp_lvl_screen.addEventListener('click', () =>{
levelling.classList.toggle("is-hidden")})

shop_screen.addEventListener('click', () =>{
weapon_repo.classList.toggle("is-hidden")})

floating_screen.addEventListener('click', () =>{
floating_section.classList.toggle("is-hidden")
readOnlySections() 
p1maxhp = player1.hp
p2maxhp = player2.hp
})


player1_btn.addEventListener('click', () =>{
  character_name.value = null
character_name.placeholder = `${player1?.name||'Name player1 needs naming'}`
selectedPlayer = player1
renderCard(selectedPlayer,{
 player_info_name,
 player_info_level, 
 player_info_weapon,
 player_info_gear,
 player_info_attack,
 player_info_armour,
 player_info_agility,
 xp_bar,
 player_info_wallet,
 min_xp,
 max_xp
})
playerNoteButtons(player1)
second_box.textContent = ''
add_note.value = ''
 character_name.placeholder = `${player1.name}`
 player_chest.appendChild(renderChest(selectedPlayer,player_chest))
})

player2_btn.addEventListener('click', () =>{
  character_name.value = null
character_name.placeholder = `${player2?.name||'Name player2 needs naming'}`
selectedPlayer = player2
renderCard(selectedPlayer,{
 player_info_name,
 player_info_level, 
 player_info_weapon,
 player_info_gear,
 player_info_attack,
 player_info_armour,
 player_info_agility,
 xp_bar,
 player_info_wallet,
 min_xp,
 max_xp
})
playerNoteButtons(player2)
second_box.textContent = ''
add_note.value = ''
 character_name.placeholder = `${player2.name}`
 player_chest.appendChild(renderChest(selectedPlayer,player_chest))
})



// CHARACTER CREATION SECTION ---



function createPlayer() {

  if (player1 !== null && player2 !== null) {
   return first_box.textContent = player1.name,' ',player2.name,' already exist' }

  if (player1 == null && selectedPlayer == player1) {
  const { payload,message} = narrationManager.creationAnnouncment(characterManager.playerCreation(character_name.value))
  player1 = (payload)
      const p = message
        player1_btn.disabled = false

  first_box.textContent = p
    character_name.placeholder = `Name ${player1.name}`
    character_name.value = ''
    return payload

} else if (player1 !== null) { first_box.textContent = `Player 1: ${player1.name} already exists`}

 if (player1 !== null && player2 == null && selectedPlayer == player2 ){
   const {payload,message} = narrationManager.creationAnnouncment(characterManager.playerCreation(character_name.value))
    player2 = (payload)
      const p = message
        player2_btn.disabled = false

  first_box.textContent = p
    character_name.placeholder = `Name ${player2.name}`
     return payload
  }  else if (player2 !== null) { first_box.textContent = `Player 2: ${player2.name} already exists`}

}

createNewPlayer.addEventListener('click', () => {
  second_box.textContent = ''
 createPlayer()
   enableAllButtons()
   
      createNote.disabled = false
        if (player1 !== null && player2 !== null) createNewPlayer.disabled = true
})

summarisePlayer.addEventListener('click', () => {
  first_box.textContent = narrationManager.summaryAnnouncment(selectedPlayer.summary())
  forth_box.textContent = characterManager.showInventory(selectedPlayer)
 renderCard(selectedPlayer,{
 player_info_name,
 player_info_level, 
 player_info_weapon,
 player_info_gear,
 player_info_attack,
 player_info_armour,
 player_info_agility,
 xp_bar,
 player_info_wallet,
 min_xp,
 max_xp
})
 
})

deletePlayer.addEventListener('click', () => {
  first_box.textContent = selectedPlayer.name+' deleted'
  createNewPlayer.disabled = false
  player_chest.innerHTML = '' 
  selectedPlayer = null

  if (player1 == null && selectedPlayer == player1) { 
    player1_btn = disabled
    player1_btn.removeEventListener('click', () =>{
    character_name.placeholder = `${player1?.name||'Name player1 needs naming'}`
    
    player_chest.appendChild(renderChest(selectedPlayer,player_chest))
})
}


  if (player2 == null && selectedPlayer == player2) {
    player2_btn = disabled
    player2_btn.addEventListener('click', () =>{
    character_name.placeholder = `${player2?.name||'Name player2 needs naming'}`
  
    player_chest.appendChild(renderChest(selectedPlayer,player_chest))
})
}
  disableAllButtons() 
  disableScreens()
  renderCard(selectedPlayer,{
 player_info_name,
 player_info_level, 
 player_info_weapon,
 player_info_gear,
 player_info_attack,
 player_info_armour,
 player_info_agility,
 xp_bar,
 player_info_wallet,
 min_xp,
 max_xp
})
 return selectedPlayer
})

equip_weapon.addEventListener('click', () => {
  const p = narrationManager.equipNarration(characterManager.equipCharweapon(selectedPlayer,chestItem))
  forth_box.textContent = p
  
  player_chest.appendChild(renderChest(selectedPlayer,player_chest))
  player_chest.querySelectorAll("li")
  .forEach(li => li.classList.remove("selected"));
  renderCard(selectedPlayer,{
 player_info_name,
 player_info_level, 
 player_info_weapon,
 player_info_gear,
 player_info_attack,
 player_info_armour,
 player_info_agility,
 xp_bar,
 player_info_wallet,
 min_xp,
 max_xp
})
  chestItem = ''
})

auto_eq.addEventListener('click', () => {
  const p = narrationManager.autoequipNarration(characterManager.autoEquipCharweapon(selectedPlayer))
forth_box.textContent = p
 player_chest.appendChild(renderChest(selectedPlayer,player_chest))
 renderCard(selectedPlayer,{
 player_info_name,
 player_info_level, 
 player_info_weapon,
 player_info_gear,
 player_info_attack,
 player_info_armour,
 player_info_agility,
 xp_bar,
 player_info_wallet,
 min_xp,
 max_xp
})
})

let chestItem

player_chest.addEventListener('click', (e) => {
  chestItem = ''
    if (e.target.tagName !== 'LI') return;

player_chest.querySelectorAll("li")
    .forEach(li => li.classList.remove("selected"));
      e.target.classList.add("selected");
        chestItem = e.target.id;
})


// NOTE TAKING ---

const createNote = document.getElementById('createNote')
const add_note = document.getElementById('add_note')
const second_box = document.getElementById('second_box')

const printNote = document.getElementById('printNote')
const note_number = document.getElementById('note_number')
const deleteNote = document.getElementById('deleteNote')

const note1 = document.getElementById('note1')
const note2 = document.getElementById('note2')
const note3 = document.getElementById('note3')
const note4 = document.getElementById('note4')
const note5 = document.getElementById('note5')
const note_all = document.getElementById('note_all')

function playerNoteButtons(cp){
  if (cp.actualMessages.length>= Player.maxNumberOfMessages) createNote.disabled = true
  if (cp.actualMessages.length >0) note_all.disabled = false;
  if (cp.actualMessages.length >= 1) note1.disabled = false;
  if (cp.actualMessages.length >= 2) note2.disabled = false;
  if (cp.actualMessages.length >= 3) note3.disabled = false;
  if (cp.actualMessages.length >= 4) note4.disabled = false;
  if (cp.actualMessages.length >= 5) note5.disabled = false;

  if (selectedPlayer.actualMessages.length<Player.maxNumberOfMessages) createNote.disabled = false;
  if (selectedPlayer.actualMessages.length <= 0) note_all.disabled = true;
  if (selectedPlayer.actualMessages.length < 1) note1.disabled = true;
  if (selectedPlayer.actualMessages.length < 2) note2.disabled = true;
  if (selectedPlayer.actualMessages.length < 3) note3.disabled = true;
  if (selectedPlayer.actualMessages.length < 4) note4.disabled = true;
  if (selectedPlayer.actualMessages.length < 5) note5.disabled = true;
}

createNote.addEventListener('click', () => {

  const p = narrationManager.addMessage(characterManager.addCharactersMessage(selectedPlayer,add_note.value))
  second_box.textContent = p   
playerNoteButtons(selectedPlayer)

})

printNote.addEventListener('click', () => {
    let x = (note_number.value-0)
      let p = narrationManager.printMessage(characterManager.printCharNotes(selectedPlayer,x))
        second_box.textContent = p
})

deleteNote.addEventListener('click', () => {
  let x = (note_number.value-0)
    let p = narrationManager.deleteMessage(characterManager.deleteCharNotes(selectedPlayer,x))
       second_box.textContent = p
playerNoteButtons(selectedPlayer)
})

note1.addEventListener('click', () => {
    note_number.value = 1

      let p = narrationManager.printMessage(characterManager.printCharNotes(selectedPlayer,1))
        second_box.textContent = p
})

note2.addEventListener('click', () => {
      note_number.value = 2

      let p = narrationManager.printMessage(characterManager.printCharNotes(selectedPlayer,2))
        second_box.textContent = p
})
note3.addEventListener('click', () => {
      note_number.value = 3

      let p = narrationManager.printMessage(characterManager.printCharNotes(selectedPlayer,3))
        second_box.textContent = p
})
note4.addEventListener('click', () => {
      note_number.value = 4

      let p = narrationManager.printMessage(characterManager.printCharNotes(selectedPlayer,4))
        second_box.textContent = p
})
note5.addEventListener('click', () => {
      note_number.value = 5

      let p = narrationManager.printMessage(characterManager.printCharNotes(selectedPlayer,5))
        second_box.textContent = p
})
note_all.addEventListener('click', () => {
      note_number.value = 0

      let p = narrationManager.printMessage(characterManager.printCharNotes(selectedPlayer,0))
        second_box.textContent = p
})


// XP and LEVELLING ---
const xp_gain = document.getElementById('xp_gain')
const xp_points = document.getElementById('xp_points')
const third_box = document.getElementById('third_box')

xp_gain.addEventListener('click', () => {

    let x = (xp_points.value-0)
  let p = narrationManager.xpAndLevelMessage(characterManager.xpGainIndividual(selectedPlayer,x))
  

  third_box.textContent = p
  renderCard(selectedPlayer,{
 player_info_name,
 player_info_level, 
 player_info_weapon,
 player_info_gear,
 player_info_attack,
 player_info_armour,
 player_info_agility,
 xp_bar,
 player_info_wallet,
 min_xp,
 max_xp
})
})

// Weapon Repo

const weapon_chest = document.getElementById('weapon_chest')
const weapon_desc = document.getElementById('weapon_desc')


const forth_box = document.getElementById('forth_box')

const buy = document.getElementById('buy')

const weaponList = structuredClone(weaponsArray)
const weaponsDesc = structuredClone(weaponsArray)


describeInventory(weaponsDesc)
weaponInventory(weaponList)


function weaponInventory(data) {
weapon_chest.innerHTML = ''
    const ul = document.createElement('ul')

data.forEach(item => { // loops the cleanData and logs each line to the shop inventory
  const li = document.createElement('li')
  li.setAttribute('id',item.name)
    li.textContent = `Weapon: ${item.name} Lvl: ${item.level} Str: ${item.str??'N/A'} Def: ${item.def??'N/A'}`
      ul.appendChild(li)
});
  weapon_chest.appendChild(ul)
}

function describeInventory(data) {
  weapon_desc.innerHTML = ''
    const ul = document.createElement('ul')

data.forEach(item => { // loops the cleanData and logs each line to the shop inventory
  const li = document.createElement('li')
  li.setAttribute('id',item.name)
    li.textContent = `Weapon: ${item.name} Description: ${item.desc} Cost: ${item.cost}`
      ul.appendChild(li)
});
  weapon_desc.appendChild(ul)
}

let itemName

weapon_chest.addEventListener('click', (e) => {
  itemName = ''
    if (e.target.tagName !== 'LI') return;

weapon_chest.querySelectorAll("li")
    .forEach(li => li.classList.remove("selected"));
      e.target.classList.add("selected");
        itemName = e.target.id;
})


buy.addEventListener('click', () => {
  if (itemName === undefined) {return forth_box.textContent = 'No weapon selected'}
    const p = narrationManager.purchaseNarration(characterManager.purchaseWeapon(selectedPlayer,itemName))
      forth_box.textContent = p

  player_chest.appendChild(renderChest(selectedPlayer,player_chest))
    itemName = ''
      document.querySelectorAll("li")
      .forEach(li => li.classList.remove("selected"));
      renderCard(selectedPlayer,{
 player_info_name,
 player_info_level, 
 player_info_weapon,
 player_info_gear,
 player_info_attack,
 player_info_armour,
 player_info_agility,
 xp_bar,
 player_info_wallet,
 min_xp,
 max_xp
})    
})




const fight_start = document.getElementById('fight_start')
import { fight } from "./main_js_utils/battleUtilityFunctions.js";

const reset_battle = document.getElementById('reset_battle')




prep_battle1.addEventListener('click', () => {
p1maxhp= structuredClone(player1.hp)
p1maxmp= structuredClone(player1.mp)

  renderPlayer1Card(player1)
})
prep_battle2.addEventListener('click', () => {
p2maxhp= structuredClone(player2.hp)
p2maxmp= structuredClone(player2.mp)

  renderPlayer2Card(player2)
})

fight_start.addEventListener('click', () => {
 fight(player1,player2,narrationManager,battleManager)

})

reset_battle.addEventListener('click', () => {

win_loss_screen.classList = ('is-hidden')
player1_battle_info.classList = ('player-info')
player2_battle_info.classList = ('player-info')

prep_battle1.disabled = false
prep_battle2.disabled = false
fight_start.disabled = false

player1.hp = p1maxhp
player2.hp = p2maxhp
player1.mp = p1maxmp
player2.mp = p2maxmp
 renderPlayer1Card(player1)
 renderPlayer2Card(player2)

})
