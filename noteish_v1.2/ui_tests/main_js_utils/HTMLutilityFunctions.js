
export function renderCard(player,info) {
const {
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
} = info


xp_bar.value = structuredClone(player.xp)
xp_bar.max = structuredClone(player.maxXp)

min_xp.textContent  = xp_bar.value
max_xp.textContent = xp_bar.max

player_info_name.innerHTML = ''
player_info_level.innerHTML = ''
player_info_weapon.innerHTML = ''
player_info_gear.innerHTML = ''
player_info_attack.innerHTML = ''
player_info_armour.innerHTML = ''
player_info_agility.innerHTML = ''
player_info_wallet.innerHTML = ''

 const nme = document.createElement('p')
 const lvl = document.createElement('p')
 const wpn = document.createElement('p')
 const ger = document.createElement('p')
 const atk = document.createElement('p')
 const arm = document.createElement('p')
 const agi = document.createElement('p')
 const wal = document.createElement('p')


let wpnIcon = ''
 if (player.weapon.name == 'sword') { wpnIcon = '🗡️'}
 if (player.weapon.name == 'axe') { wpnIcon = '🪓'}

   nme.textContent = `Name:- ${player.name}`
   lvl.textContent = `Level:- ${player.level}`
   wpn.textContent = `Weapon:- ${player.weapon.name} ${wpnIcon}`
   ger.textContent = `Gear:- ${player.gear.name}`
   atk.textContent = `Attack:- ${player.attack}`
   arm.textContent = `Armour:- ${player.armour}`
   agi.textContent = `Agility:- ${player.agility}`
   wal.textContent = `Wallet:- ${player.wallet}`

  player_info_name.appendChild(nme)
  player_info_level.appendChild(lvl)
  player_info_weapon.appendChild(wpn)
  player_info_gear.appendChild(ger)
  player_info_attack.appendChild(atk)
  player_info_armour.appendChild(arm)
  player_info_agility.appendChild(agi)
  player_info_wallet.appendChild(wal)

}

export function renderChest(player,player_chest) {
  player_chest.innerHTML = ''
    const ul = document.createElement('ul')

player.chest.sort((a,b) => a.level-b.level)

player.chest.forEach(item => { // loops the cleanData and logs each line to the shop inventory
  const li = document.createElement('LI')
  li.setAttribute('id',item.name)
    li.textContent = `Weapon: ${item.name} Lvl: ${item.level} Qty: ${item.qty}`
      ul.appendChild(li)

});



player.chest.length>0?  equip_weapon.disabled = false : equip_weapon.disabled = true
player.chest.length>0?  auto_eq.disabled = false : auto_eq.disabled = true


return ul
}

export function enableAllButtons() {
    const summarisePlayer = document.getElementById('summarisePlayer');
    const deletePlayer = document.getElementById('deletePlayer');
    const createNote = document.getElementById('createNote');
  const printNote = document.getElementById('printNote');
    const deleteNote = document.getElementById('deleteNote');
    const xp_gain = document.getElementById('xp_gain');
const buy = document.getElementById('buy');
    const equip_weapon = document.getElementById('equip_weapon');
    const auto_eq = document.getElementById('auto_eq');

  summarisePlayer.disabled = false
  deletePlayer.disabled = false

createNote.disabled = false
printNote.disabled = false
deleteNote.disabled = false

xp_gain.disabled = false

  buy.disabled = false
  equip_weapon.disabled = false
  auto_eq.disabled = false
}

export function disableAllButtons() {

     const summarisePlayer = document.getElementById('summarisePlayer');
    const createNote = document.getElementById('createNote');
  const printNote = document.getElementById('printNote');
    const deleteNote = document.getElementById('deleteNote');
    const xp_gain = document.getElementById('xp_gain');
const buy = document.getElementById('buy');
    const equip_weapon = document.getElementById('equip_weapon');
    const auto_eq = document.getElementById('auto_eq');
  summarisePlayer.disabled = true

createNote.disabled = true
printNote.disabled = true
deleteNote.disabled = true

xp_gain.disabled = true

  buy.disabled = true
  equip_weapon.disabled = true
  auto_eq.disabled = true
}

export function enableScreens() {
    const note_logger = document.getElementById('note_logger');
    const levelling = document.getElementById('levelling');
    const weapon_repo = document.getElementById('weapon_repo');

  note_logger.classList.remove("is-hidden")
  levelling.classList.remove("is-hidden")
  weapon_repo.classList.remove("is-hidden")
}

export function disableScreens() {
    const note_logger = document.getElementById('note_logger');
    const levelling = document.getElementById('levelling');
    const weapon_repo = document.getElementById('weapon_repo');

  note_logger.classList.add("is-hidden")
  levelling.classList.add("is-hidden")
  weapon_repo.classList.add("is-hidden")
}

export function disable_enable_screen(screen) {
 if (screen.classList == ("is-hidden") ){
   screen.classList.remove("is-hidden");
   }else {
     screen.classList.add("is-hidden");
   }
}

export function readOnlySections() {
  const notes_screen = document.getElementById('notes_screen');
  const xp_lvl_screen = document.getElementById('xp_lvl_screen');
  const shop_screen = document.getElementById('shop_screen');
  const character_creation = document.getElementById('character_creation');
  const levelling = document.getElementById('levelling');
  const note_logger = document.getElementById('note_logger');
  const weapon_repo = document.getElementById('weapon_repo');

  notes_screen.classList.toggle('read-only-section');
  xp_lvl_screen.classList.toggle('read-only-section');
  shop_screen.classList.toggle('read-only-section');

  character_creation.classList.toggle('read-only-section');
  levelling.classList.toggle('read-only-section');
  
  note_logger.classList.toggle('read-only-section');
  weapon_repo.classList.toggle('read-only-section');
}