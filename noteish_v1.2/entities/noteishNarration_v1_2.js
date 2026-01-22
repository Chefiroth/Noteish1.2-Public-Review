
export class NarrationManager {

  static maxMessageCharacters = 50
  static maxMessages = 5
  constructor (name) {
    this.name = name || 'narrationManager'
    this.narratorMessage = ''

  }

  get name() { return this._name}

  set name(nval) { this._name = nval.slice(0,10).trim()}

rng() {
return Math.ceil(Math.random()*3)
}

// CHARACTER CREATION AND SUMMARY

creationAnnouncment(funcType) {
 let message = ''
const  {type, name, payload, metaData:{PN, PL}, success}  = funcType
  let num = this.rng()
switch (type) {
  
case ('Nme_Err'):
  message = `Please enter a valid name` 
break;

 case ('Ply2_Cre'): 
 if (num === 1)
   message = `${PN} created\n\nPrepare for battle!`
if (num === 2)
  message = `${PN} created\n\nGEEEEET READY!!`
if (num === 3)
  message = `${PN} Checking In!`
break;

case ('Ply1_Cre'): 
if (num === 1)
  message = `${PN} created\n\nPlayer2 get ready`
if (num === 2)
  message = `${PN} created\n\nPlayer2 Hurry`
if (num === 3)
  message = `${PN} created!!!!`
break;

}

return {payload,message};
}


summaryAnnouncment(funcType) {

  const{type, name, payload, metaData:{Name, Level, HP, MP,ATK, STR, ARM, DEF, AGI, WPN, GEAR, XP, MAXXP, TOTXP, MNY}, success} = funcType
const message = `We see ${Name} ( Level ${Level}: ${XP}/${MAXXP} xp ${TOTXP} total xp ) with ${HP} health ${MP} mana ${ATK} attack ${STR} str ${ARM} armour ${DEF} def and ${AGI} agi. weapon held ${WPN}, gear worn ${GEAR} and ${MNY} Gp in their pouch `
return message
}


// Note Narration

addMessage(funcType) { 
  let messageNarative = ''
 
  const {type,name,payload,metaData, success} = funcType
  switch (true) {

    case (metaData> 6):
      messageNarative = 404
      break;

    case (success === 'fail'):
      const maxedMessage ='Max Notes Reached, please delete one'
      messageNarative = `${maxedMessage}\n`
  
      break;
    
    case (success === 'pass'):
      messageNarative = `\nMessage slot ${metaData} filled`
      
      break;
  }

  return messageNarative
}

deleteMessage(funcType) {
let deleteMessage = ''
const  {type, name,payload, metaData, success} = funcType

  switch(success) {
    
case('fail') :{
if(type === 'DEL_EMT') {
return deleteMessage = `${name} - No message in this slot\n`}

if(type === 'DEL_NON') {
return deleteMessage = `${name} - No messages to delete\n`

}

break
}

case ('pass') :{

if (type === 'DEL_ALL') {
return deleteMessage = `${name} - All notes deleted\n`
}

if (type === 'DEL_ONE') {
return deleteMessage = `${name} - Slot ${metaData} cleared\n`

}
break
}


}
return deleteMessage
}

printMessage(funcType) {
let printMessage = ''
const {type, name,payload, metaData, success} = funcType

  switch(success) {

case ('fail'): {
return printMessage = `${name} - No messages to see\n`
}
   
case ('pass'):{

  if (type === 'PRN_ALL') {return printMessage = payload.map(elem => { return elem.Message }).join('\n')}
  if (type === 'PRN_ONE') {return printMessage =  payload[metaData-1].Message }
}
break
}
return printMessage
}


// CHARACTER PASSIVE METHODS


xpAndLevelMessage(funcType) {
let xpNarrative = ''
let levellingNarative = ''
const {type, name, payload, metaData:{newLevel, oldLevel}, success}= funcType

switch(success) {

  case ('fail'): {
    xpNarrative = `${name} not elegible for xp gains`
    break;
  };

  case ('pass'): {

  if (payload> 200) {
    xpNarrative = `${name} gained a beautiful ${payload} EXP`
    break; };

  if (payload> 70) {
    xpNarrative = `${name} gained a nice ${payload} EXP`
    break; };
  
  if(payload> 40){ 
    xpNarrative = `${name} earned a decent ${payload} EXP`
    break; };
  
  if(payload<=40) {
    xpNarrative = `${name} got ${payload} EXP`
    break; };

  }
}
  

switch(true) {

  case (newLevel>oldLevel+5):
    levellingNarative = `📜 gained a nice ${newLevel-oldLevel} levels, now at ${newLevel}`
    break;

  case (newLevel>oldLevel+2):
    levellingNarative = `📜 grabbed level ${newLevel}`
    break;

  case (newLevel>oldLevel):
    levellingNarative = `📜 Now at level ${newLevel}`
    break;





}
    return `${xpNarrative}${' ',levellingNarative||''}`
}


purchaseNarration(funcType) {
const num = this.rng()
let purchaseweaponNarrative= ''

  const {type, name,payload, metaData:{spent, left}, success} = funcType
switch (success) {
  
  case ('fail'): {
      purchaseweaponNarrative = `${payload.name} is too expensive`
      break; };

  case ('pass'): {

    switch (num) {
    case(1): {
      purchaseweaponNarrative = `Purchased the ${payload.name}`
      break; };

    case(2): {
      purchaseweaponNarrative = `Paid ${spent} for a ${payload.name}`
      break; };

    case (3): {
      purchaseweaponNarrative = `Bought the ${payload.name}`
      break; };
    }
}
}
  return purchaseweaponNarrative
}



equipNarration(funcType) {
  let equipWeaponNarrative = ''
  let num = this.rng()
  const {type, name, payload, metaData:{oldWeapon, newWeapon}, success} = funcType


switch (success) {
  
  case ('fail' ): {
    if (payload == 'Lvl-high')
    equipWeaponNarrative = `${newWeapon.name} is too high a level for ${name}`
    break; 
  }
  case ('pass'): {

    if (num === 1) {
    equipWeaponNarrative = `${name} has changed ${oldWeapon.name} to ${newWeapon.name}`
    break; }

    if (num === 2) {
    equipWeaponNarrative = `${oldWeapon.name} swapped out for a ${newWeapon.name}`
    break; }

    if (num === 3) {
    equipWeaponNarrative = `${name} equiped the ${newWeapon.name}`
    break; }
}}
  return equipWeaponNarrative
}

autoequipNarration(funcType) {
let autoequipNarrative = ''

const {type, name, payload, metaData:{oldWeapon, newWeapon}, success}  = funcType

const num = this.rng()
switch (success) {
  
case ('fail'): {
    autoequipNarrative = `${newWeapon.name} auto-equip failed`;
    break;
  };
case ('pass'): {
  if (num === 1) {
    autoequipNarrative = `${oldWeapon.name} has auto-equiped to ${newWeapon.name}`;
    break;
  };
  if (num === 2) {
    autoequipNarrative = `${name} auto-equiped a ${newWeapon.name}`;
    break;
  };
  if (num === 3) {
    autoequipNarrative = `${newWeapon.name} auto-equiped`;
    break;
  };
};
}

return autoequipNarrative

}


turnOrderAnnouncer(funcType) {
let turnnumber = 0
const num = this.rng()

function announcmentChoices(number,name) {
let announcer1 = ''
let announcer2 = ''
  
switch (true) {
  case (num===1 && turnnumber === 1):

    announcer1 = `First up we have ${name}`
    break

  case (num===2 && turnnumber === 1):
    announcer1 = `The first challanger IS!!! ${name}`
    break;  

  case (num===3 && turnnumber === 1):
    announcer1 = `${name} ENTERS THE AREANA AT NUMBER ${number}`
    break;
}


switch (true) {
  case (num===1 && turnnumber === 2):
    announcer2 = `Second up we have ${name}`
    break;
  
  case (num===2 && turnnumber === 2):
    announcer2 = `And now we see ${name}`
    break;
  
  case (num===3 && turnnumber === 2):
    announcer2 = `ANNNND THE CHALLENGER! ${name}`
    break;
}

return {announcer1,announcer2}

}

return funcType.map(element => {
  turnnumber+=1
    const {announcer1,announcer2}= announcmentChoices(turnnumber,element.name)
      return this.lineBreakReplace(`\n${announcer1} ${announcer2}\n`)
})}



async attackNarration(funcType) {
const {user,target,attack,TYPE} = funcType

  let timer = 1000
const fightNaration = (user,target,attack)=> {
    return new Promise((resolve, reject) => {  
  setTimeout(() => { 
     resolve (this.lineBreakReplace(`\n${user.name} attacks ${target.name} for ${attack} ${TYPE} damage ⚔️\n\n`))
  },timer) 
});}


 return await fightNaration(user,target,attack)

}

lineBreakReplace(text) {

  return text.replace('\n', '<br>')
}

}