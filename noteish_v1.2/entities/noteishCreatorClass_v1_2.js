import { weaponsArray } from "../item_sets/noteish_weaponset.js"



/**  a class export for the live note pad
 *   this will be the noteish file creation, the setters and getters are to manage the inflow of message data prior to logging with the manager
*/

const wpset = structuredClone(weaponsArray)
export class Player { 
  static maxMessageCharacters = 50
  static maxNameCharacters = 10
  static maxNumberOfMessages = 5

constructor(name) {

  this.name = name || 'default'

  this.hp = 100
  this.mp = 50
  this.xp = 0
  this.totalXp = 0
  this.maxXp = 100
  this.wallet = 1000


  this.chest = []
  this.weapon = {
    name: 'bare hands',
    type: 'weapon',
    level: 0,
    str: 3
  }
  this.gear = {
    name: 'robe',
    type: 'gear',
    level: 0,
    def: 1
  }

  this.level = 1

  this.str = 4
  this.attack =0
 

  this.def = 3
  this.armour = 0


  this.agility = Math.floor(Math.random()*4)+1

  this.actualMessages = []
  this.timestamp = new Date().toISOString().slice(0,19).replace('T', ' ');
  
  this.mergeEquipStats()
}


get name() { return this._name}
get hp() { return this._hp}
get mp() { return this._mp}
get xp() { return this._xp}
get totalXp() { return this._totalXp}
get str() { return this._str}
get attack() { return this._attack}

get maxXp() { return this._maxXp}
get wallet() { return this._wallet}
get level() { return this._level}
get weapon() { return this._weapon} 
get gear() { return this._gear} 

get noteMessage() { return this._noteMessage }

set name(v) { this._name = v.slice(0, Player.maxNameCharacters).trim() }
set hp(vHP) { this._hp = parseInt(vHP)}
set mp(vMP) { this._mp = parseInt(vMP)}
set xp(vXP) { this._xp = parseInt(vXP)}
set totalXp(tXP) { this._totalXp = parseInt(tXP)}

set str(vSTR) { this._str = parseInt(vSTR)}
set attack(vATT) { this._attack = parseInt(vATT)}

set maxXp(mXP) {  this._maxXp = parseInt(mXP)}
set wallet(vWal) { this._wallet = parseInt(vWal)}
set level(vLevel) { this._level = parseInt(vLevel) }
set weapon(wItem) {this._weapon = structuredClone(wItem)}
set gear(gItem) {this._gear = structuredClone(gItem)}

set noteMessage(m) { this._noteMessage = m.slice(0, Player.maxMessageCharacters).trim()}


summary() {
      return {
  type: 'PLY_SUM',
  name: this.name,
  payload: 'STATS SUMMARY',
  metaData: {Name: this.name, Level: this.level, HP: this.hp, MP: this.mp, ATK: this.attack, 
              STR: this.str, ARM: this.armour, DEF: this.def, AGI: this.agility,
              WPN: this.weapon.name, GEAR: this.gear.name, XP: this.xp, MAXXP: this.maxXp, TOTXP: this.totalXp, MNY: this.wallet},
  success: 'pass'
}
}
 
// MESSAGE METHODS

addNote(message) {
this.noteMessage = message
 { 
  this.pushToLog(this.noteMessage)
return {
 
  name: this.name,
  payload: this.noteMessage,
  metaData: this.actualMessages.length,
}}}


pushToLog(newMessage) {

const event = {
  Message: newMessage,
  Time: this.timestamp
}

this.actualMessages.push(event)
}



deleteNote(targetNum) {

  switch(true) {

   // 'No message in this slot\n'
    case(!this.actualMessages[targetNum-1] && targetNum>0 ): {// had to make a quick addition as i clocked the target num >0 was needed  
    return {
      type: 'DEL_EMT', 
      name: this.name, 
      payload: 'n/a',
      metaData: targetNum,
      success: 'fail'
    }
    }

    case(this.actualMessages.length<=0): {
  return {
    type: 'DEL_NON', 
    name: this.name,  
    payload: 'n/a',
    metaData: targetNum,
    success: 'fail'
  }
}

// All delete
case (targetNum === 0 || targetNum === 'all'): { 
  this.actualMessages = []
while (this.actualMessages.length>0) {
  this.actualMessages.pop()
}
  return {
    type: 'DEL_ALL', 
    name: this.name, 
    payload: 'n/a',
    metaData: targetNum,
    success: 'pass'
  }
}

case (targetNum <=5 && targetNum >0): {
  this.actualMessages.splice(targetNum-1,1)
    return {
      type: 'DEL_ONE', 
      name: this.name, 
      payload: 'n/a',
      metaData: targetNum,
      success: 'pass'
    }
}
}
}

printMessage(messageNumber) {
if (this.actualMessages.length<=0 ||this.actualMessages.length<messageNumber) {
  
  return {
    type: 'PRN_EMT', 
    name: this.name,
    payload: 'n/a',
    metaData: messageNumber,
    success: 'fail'
  }
}

if (messageNumber === 0 || messageNumber === 'all') { 
 
 return {
  type: 'PRN_ALL', 
  name: this.name,
  payload: this.actualMessages,
  metaData: messageNumber,
  success: 'pass'
}
}

else {
 
  return {
    type: 'PRN_ONE', 
    name: this.name, 
    payload: this.actualMessages,
    metaData: messageNumber,
    success: 'pass'

  }
}
}

// thisACTER PASSIVE METHODS


isAlive() { 
  return this.hp>0
}

isDead() {
  return this.hp<=0
}
xpGain(gainedXp) {

  this.xp += gainedXp
  this.totalXp += gainedXp
const oldLevel = this.level
let newLevel1
  while (this.xp >= this.maxXp) {

    this.xp -=this.maxXp
  const {newLevel} = this.levelUp()
    newLevel1 = newLevel
  }

return {
  name: this.name, 
  payload: gainedXp, 
  metaData:{ newLevel: newLevel1||oldLevel, oldLevel }
  }
}

levelUp() {
if (this.isAlive() === false) {return `${this.name} is already dead, so no level up`}
this.level+=1

this.statgrowth()
const newLevel = structuredClone(this.level)

  this.mergeEquipStats()
return {newLevel}
}

statgrowth() {

this.hp+=Math.ceil(0.4*(0.2+this.level))
this.mp+=Math.ceil(0.4*(0.2+this.level))

this.str+=Math.ceil(0.4*(0.2+this.level))
this.def+=Math.ceil(0.4*(0.2+this.level))

this.agility+=Math.ceil(0.4*(0.2+this.level))
this.maxXp +=Math.floor(Math.random()*(this.level*5))

}


mergeChest() {
  for (let i = 0; i < this.chest.length; i++) {
    if (this.chest[i].qty<=0) this.chest.splice(i, 1)
    
    for (let m = i + 1; m < this.chest.length; m++) {
      if (this.chest[i].name === this.chest[m].name) { 
        this.chest[i].qty += this.chest[m].qty
        this.chest.splice(m, 1); 
          m--; 
        }}}
}


oldEquipToChest (currentEquip) {
  const oldWeapon = structuredClone(currentEquip)
    if (oldWeapon.level>=1) {
      oldWeapon.qty=1
      this.chest.push(oldWeapon)
    //  this.mergeChest()
}
  return oldWeapon
}

mergeEquipStats() {
 this.attack = Math.round(this.str + this.weapon.str)
 this.armour = Math.round(this.def + this.gear.def)
}

equipWeapon(wanted) {
let oldWeapon = {}
let newWeapon = {}
  for (let search of this.chest) {
    


    if (wanted === search.name) {

       if (this.level >= search.level && search.type == `gear` ) {
      oldWeapon = this.gear
      oldWeapon.qty=1
      this.oldEquipToChest(oldWeapon)
      search.qty-=1
      this.mergeChest()
      this.gear = search
      newWeapon = this.gear

   } 
      if (this.level >= search.level && search.type == `weapon` ) {
      oldWeapon = this.weapon
      oldWeapon.qty=1
      this.oldEquipToChest(oldWeapon)
      search.qty-=1
      this.mergeChest()
      this.weapon = search
      newWeapon = this.weapon
 
   } 
       this.mergeEquipStats()
    return {name: this.name, metaData:{oldWeapon, newWeapon}}
 }
  }}

autoEquipWeapon() {
  // filters weapon api based on thisacter.job and level
  const filteredWeapon = this.chest?.filter(w =>  w.level <= this.level && w.type == 'weapon'); 
  
  // sorts available list based on level (desending order)
  const sortedWeapon = filteredWeapon.sort((a, b) => b.level - a.level);
  
  const chosenWeapon =structuredClone(sortedWeapon[0])
if (!this.weapon || chosenWeapon.level> this.weapon.level) {
let oldWeapon = structuredClone(this.weapon)

  if (this.weapon.level>=1)
    this.oldEquipToChest(this.weapon)
    sortedWeapon[0].qty -=1
    this.mergeChest()
    this.weapon = (chosenWeapon) 
    this.mergeEquipStats()
    const newWeapon = this.weapon
  
return { name: this.name, metaData:{oldWeapon, newWeapon}}

}
}

purchaseWeapon(wanted) {

  for (let searchWeapon of weaponsArray) {

    if (wanted === searchWeapon.name)

      if (this.wallet >= searchWeapon.cost)   {

        
    const boughtWeapon = structuredClone(searchWeapon)
      boughtWeapon.qty = 1
      this.chest.push(boughtWeapon)
      this.wallet -= boughtWeapon.cost
      const spent = structuredClone(boughtWeapon.cost)
      const left = structuredClone(this.wallet)
      this.mergeChest()
    return {type: 'BUY_WPN', name: this.name, payload: boughtWeapon, metaData:{spent, left}, success: 'pass'}
    }
      else  if (this.wallet < searchWeapon.cost) {
      const boughtWeapon = searchWeapon  
    const spent = 0
      const left = this.wallet
          return {type: 'BUY_WPN', name: this.name, payload: boughtWeapon, metaData:{spent, left}, success: 'fail'}
      }

  }
}

}

export class Player1 extends Player {
  constructor(name) {
    super(name)
    this.name = name || 'Player1'
  }
 }

 export class Player2 extends Player {
  constructor(name) {
    super(name)
    this.name = name || 'Player2'
  }
 }

 
