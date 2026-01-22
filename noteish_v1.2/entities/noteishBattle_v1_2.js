
export class BattleManager {
    static maxMessageCharacters = 50
  static maxNameCharacters = 10
  static maxNumberOfMessages = 5
  constructor (name) {
    this.name = name || 'battleManager'

  }
  get name() { return this._name}
  set name(v) { this._name = v.slice(0, BattleManager.maxNameCharacters).trim() }


  // ─── small targeting helpers ────────────────────────────────────────────────
getAlive(char) {
  return (typeof char.isAlive === 'function' && char.isAlive());
}

pickRandomTatget(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

self(user, A1, B2) {
  return A1 === user ? A1 : B2;
}

enemies(user, A1, B2) {
  return user === A1 ? B2 : A1;
}

getTurnOrder(A1,B2) {
 return [A1,B2]
 .filter(m => typeof m?.isDead === 'function' && !m.isDead())
 .sort((member,next) => (next.agility + Math.random() * 2) - (member.agility + Math.random() * 2)
)}

attack(user,target) {
const attack =  Math.floor(user.attack) - Math.ceil(Math.random()*target.def)
  target.hp-=attack;
    return {user,target,attack,TYPE:'norm'}
}

criticalAttack(user,target) {
   let cost = 30
let attack = (Math.floor(user.attack) - Math.ceil(Math.random()*target.def))*2
 if (user.mp<cost && user.mp >0) {
  cost = structuredClone(user.mp && this.getAlive(user)),
attack= Math.ceil(attack*0.7)
    target.hp -= attack
  user.mp -=cost
  user.mp = 0
    return {user,target,attack,TYPE:'❤️‍🔥'}
}else{

  target.hp-=attack;
  user.mp -=cost
    return {user,target,attack,TYPE:'⚡️'}
}}

battleChoice(user,target) {
const rng = () => {
return Math.ceil(Math.random()*100)
} 

const rngNum = rng()

const conditions = () => {
 return (user.mp>0 && user.hp<=40 && rngNum>=70)
}

if (conditions()) {return this.criticalAttack(user,target)}
else if (!conditions()) {return this.attack(user,target)}

}



targetHp(target) { return `${target.name} now has ${target.hp} hp`}


}