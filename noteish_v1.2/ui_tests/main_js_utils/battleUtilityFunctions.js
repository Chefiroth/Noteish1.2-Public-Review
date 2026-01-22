

export function renderPlayer1Card(player) {

const player1_name = document.getElementById('player1_name')
const player1_level = document.getElementById('player1_level')
const player1_weapon = document.getElementById('player1_weapon')
const player1_hp = document.getElementById('player1_hp')
const player1_mp = document.getElementById('player1_mp')

const player1_attack = document.getElementById('player1_attack')
const player1_armour = document.getElementById('player1_armour')
const player1_agility = document.getElementById('player1_agility')
const player1_xp_bar = document.getElementById('player1_xp_bar')

const player1_min_xp = document.getElementById('player1_min_xp')
const player1_max_xp = document.getElementById('player1_max_xp')

player1_xp_bar.value = structuredClone(player.xp)
player1_xp_bar.max = structuredClone(player.maxXp)

player1_min_xp.textContent  = player1_xp_bar.value
player1_max_xp.textContent = player1_xp_bar.max

player1_name.innerHTML = ''
player1_level.innerHTML = ''
player1_weapon.innerHTML = ''
player1_hp.innerHTML = ''
player1_mp.innerHTML = ''

player1_attack.innerHTML = ''
player1_armour.innerHTML = ''
player1_agility.innerHTML = ''

 const nme = document.createElement('p')
 const lvl = document.createElement('p')
 const wpn = document.createElement('p')
 const hp = document.createElement('p')
 const mp = document.createElement('p')
 const atk = document.createElement('p')
 const arm = document.createElement('p')
 const agi = document.createElement('p')

 hpCrit(player,hp,mp)
let wpnIcon = ''
 if (player.weapon.name == 'sword') { wpnIcon = '🗡️'}
 if (player.weapon.name == 'axe') { wpnIcon = '🪓'}
if (player.hp<=0) {  nme.textContent = `Name:- ${player.name} 💀`
} else nme.textContent = `Name:- ${player.name}`
   lvl.textContent = `Level:- ${player.level}`
   wpn.textContent = `Weapon:- ${player.weapon.name} ${wpnIcon}`

   hp.textContent = `Health:- ${player.hp}`
   mp.textContent = `Mana:- ${player.mp}`

   atk.textContent = `Attack:- ${player.attack}`
   arm.textContent = `Armour:- ${player.armour}`
   agi.textContent = `Agility:- ${player.agility}`
 
 
  player1_name.appendChild(nme)
  player1_level.appendChild(lvl)
  player1_weapon.appendChild(wpn)
  player1_hp.appendChild(hp)
  player1_mp.appendChild(mp)
  player1_attack.appendChild(atk)
  player1_armour.appendChild(arm)
  player1_agility.appendChild(agi)

}


export function renderPlayer2Card(player2) {
const player2_name = document.getElementById('player2_name')
const player2_level = document.getElementById('player2_level')
const player2_weapon = document.getElementById('player2_weapon')
const player2_hp = document.getElementById('player2_hp')
const player2_mp = document.getElementById('player2_mp')

const player2_attack = document.getElementById('player2_attack')
const player2_armour = document.getElementById('player2_armour')
const player2_agility = document.getElementById('player2_agility')
const player2_xp_bar = document.getElementById('player2_xp_bar')

const player2_min_xp = document.getElementById('player2_min_xp')
const player2_max_xp = document.getElementById('player2_max_xp')

player2_xp_bar.value = structuredClone(player2.xp)
player2_xp_bar.max = structuredClone(player2.maxXp)

player2_min_xp.textContent  = player2_xp_bar.value
player2_max_xp.textContent = player2_xp_bar.max

player2_name.innerHTML = ''
player2_level.innerHTML = ''
player2_weapon.innerHTML = ''
player2_hp.innerHTML = ''
player2_mp.innerHTML = ''
player2_attack.innerHTML = ''
player2_armour.innerHTML = ''
player2_agility.innerHTML = ''

 const nme = document.createElement('p')
 const lvl = document.createElement('p')
 const wpn = document.createElement('p')
 const hp = document.createElement('p')
 const mp = document.createElement('p')
 const atk = document.createElement('p')
 const arm = document.createElement('p')
 const agi = document.createElement('p')


 hpCrit(player2,hp,mp)
let wpnIcon = ''
 if (player2.weapon.name == 'sword') { wpnIcon = '🗡️'}
 if (player2.weapon.name == 'axe') { wpnIcon = '🪓'}
if (player2.hp<=0) { nme.textContent = `Name:- ${player2.name} 💀`
} else nme.textContent = `Name:- ${player2.name}`
   lvl.textContent = `Level:- ${player2.level}`
   wpn.textContent = `Weapon:- ${player2.weapon.name} ${wpnIcon}`
   hp.textContent = `Health:- ${player2.hp}`
   mp.textContent = `Mana:- ${player2.mp}`
   atk.textContent = `Attack:- ${player2.attack}`
   arm.textContent = `Armour:- ${player2.armour}`
   agi.textContent = `Agility:- ${player2.agility}`

  player2_name.appendChild(nme)
  player2_level.appendChild(lvl)
  player2_weapon.appendChild(wpn)
  player2_hp.appendChild(hp)
  player2_mp.appendChild(mp)
  player2_attack.appendChild(atk)
  player2_armour.appendChild(arm)
  player2_agility.appendChild(agi)

}


function hpCrit(player,hpStat,mpStat) {

  if (player.hp<50) {hpStat.style="color: purple"}
  if (player.hp<=0) {hpStat.style="color: black"}
  if (player.mp<25) {mpStat.style="color: red"}
}


export async function fight(ply1,ply2,narrationManager,battleManager) {
  const battle_box = document.getElementById('battle_box')
  const win_loss_screen = document.getElementById('win_loss_screen')
 battle_box.innerHTML = ''
const maxRounds = 50
let roundNum = 1 


do {  
  
  battle_box.innerHTML += narrationManager.lineBreakReplace(`\n ************\n ************`)
    battle_box.innerHTML += narrationManager.lineBreakReplace(`\nRound Number ${roundNum}`)

      let turnOrder = battleManager.getTurnOrder(ply1,ply2)
   battle_box.innerHTML +=  narrationManager.turnOrderAnnouncer(turnOrder)

     battle_box.innerHTML += await narrationManager.attackNarration(battleManager.battleChoice(turnOrder[0],turnOrder[1])) 

  renderPlayer1Card(ply1)
  renderPlayer2Card(ply2)


    if (turnOrder[1].hp<=0) { 
      turnOrder[1].hp=0

      const winLossText = winLoss(turnOrder[0],turnOrder[1],roundNum)
      battle_box.innerHTML += winLossText
        win_loss_screen.textContent = winLossText

         turnOrder[1]==ply1? player1_battle_info.classList = ('loser-card'):player2_battle_info.classList = ('loser-card')
          const xpWon = turnOrder[0].level-turnOrder[1].level+(2*20)

         turnOrder[0].xpGain(xpWon)
          renderPlayer1Card(ply1)
            renderPlayer2Card(ply2)
            win_loss_screen.classList.remove('is-hidden')
          break;};

          battle_box.innerHTML += await narrationManager.attackNarration(battleManager.battleChoice(turnOrder[1],turnOrder[0])) 
  renderPlayer1Card(ply1)
   renderPlayer2Card(ply2)

    if (turnOrder[0].hp<=0) { 
      turnOrder[0].hp=0

       const winLossText = winLoss(turnOrder[1],turnOrder[0],roundNum)
        battle_box.innerHTML += winLossText
        win_loss_screen.textContent= winLossText
          turnOrder[0]==ply1? player1_battle_info.classList = ('loser-card'):player2_battle_info.classList = ('loser-card')
 const xpWon = turnOrder[1].level-turnOrder[0].level+(2*20)

        turnOrder[1].xpGain(xpWon)
          renderPlayer1Card(ply1)
            renderPlayer2Card(ply2)
                win_loss_screen.classList.remove('is-hidden')
          break;};
         
  roundNum +=1
  
} while (roundNum <= maxRounds || ply1.hp>0 || ply2.hp>0)
}

// win/loss output
function winLoss(win,lose,roundNum) {

prep_battle1.disabled = true
prep_battle2.disabled = true
fight_start.disabled = true

const winFunds = Math.max(100,(win.hp - (lose.hp+lose.level)) * 100)

win.wallet +=winFunds
switch (true) {
  case(lose.hp <=0):
  return `\nThe Victor ${win.name}: triumphed with ${win.hp} 🛡️\nAnd the Loser is ${lose.name} 💀\nRounds: ${roundNum} ⚔️ 💰 = ${winFunds} 💳 = ${win.wallet}`;
  

  case(lose.hp>=1):
  return `\nThe Loser ${lose.name} 🫠 barely survived to lose to ${win.name} 😎\nRounds: ${roundNum} ⚔️`;
}

 
}

