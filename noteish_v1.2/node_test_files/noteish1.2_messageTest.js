import { Player } from "../entities/noteishCreatorClass_v1_2.js"

 const newPlayer = new Player('Marcus')

console.log(newPlayer)


newPlayer.addNote('123456789012345678901234567890123456789012345678905152')

newPlayer.addNote('Hello1')

newPlayer.addNote('Hello2')

newPlayer.addNote('Hello3')

newPlayer.addNote('Hello4')

newPlayer.addNote('Hello5')

console.log(newPlayer.printMessage(0))
newPlayer.deleteNote(2)
console.log(newPlayer.printMessage(0))
console.log(newPlayer.actualMessages)
newPlayer.deleteNote(0)
console.log(newPlayer.actualMessages)

