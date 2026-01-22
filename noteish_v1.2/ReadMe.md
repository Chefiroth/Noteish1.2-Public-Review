# noteish_v1.2

- A focused practice system for structured event logging, battle flow, and data-driven reasoning, built as part of my learning repository.

---

## 1. What is this?

`noteish_v1.2` is a sandbox designed for me to practice:
- turn-based battle flow
- event and narration logging
- entity interactions (characters, items, actions)
- separation between logic, data, and presentation

Noteish 1.2 does not represent finished work, but more a snapshot of my current progress as a learner.

---

## 2. Why this exists

This system exists to:
- practice thinking in *systems*, not scripts
- improve clarity of event data across turns
- experiment with modular design under real constraints
- support later visualisation, testing, or replay tools

My goal here is to show clarity over cleverness. (I hope 🤞🏾)
- learn to trace state changes across modules
- keeping event data serialisable, while trying not to mutate where I can avoid it.

---

## 3. Folder overview

High-level structure (details may evolve):

- `entities/`  
  Core domain objects: Managers for separate areas of control of the codebase.
  Character, Narration, Battle, etc.

- `item_sets/`  
  Originally housed just weapons for test equip, but I later added 2 gear pieces to test if I could scale, without breaking logic.

- `node_test_files/`  
  Node-based test or simulation scripts

- `ui_tests/`  
  Early or experimental UI-facing logic (non-production)

- `dev_notes/`  
  Design notes, observations, and learning reflections, all dated and timestamped.
  This was just my stresses, reflections and lightbulb moments.

---

## 4. What is in scope

✔ Event and battle flow logic  
✔ Data structures and relationships  
✔ Logging, narration, and state transitions  
✔ Refactoring for readability and intent (work in progress)

---

## 5. What is explicitly out of scope

✖ Production-ready architecture  
✖ Performance optimisation  
✖ Visual polish or animation systems  
✖ Framework-level abstractions  

---

## 6. How to approach this code

Can I ask all reviewers to focus on:
- readability and intent of the codebase
- data flow between modules
- separation of concerns
- structural naming and consistency

This code prioritises learning over perfection and polish

---

## 7. Feedback requested

For any reviewer I would appreciate feedback on:
- clarity and consistency of event data 
- system boundaries
- over- or under-coupling between modules
- opportunities for simplification

Specifically I am interested in the readability of the codebase as a whole is and where I could structure my intent clearer.
Basically I need/want to have full feedback and honest critique on how readable the codebase 
---

## 8. Status

Active learning project.  
Structure and files may change as understanding deepens.
