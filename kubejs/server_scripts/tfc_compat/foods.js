// priority: 0

console.info('Food compat recipes registering...')

const fishMeats = [
  "cod",
  "salmon"
]

const fruits = [
  "apple",
  //"melon_slice",
  "sweet_berries",
  "glow_berries"
]

const vegetables = [
  "carrot",
  "potato",
  "beetroot"
]

// dough recipes
const doughRecipe = (event, dough, flour) => {
  let input = [{
    "type": "tfc:fluid_item",
    "fluid_ingredient": {
      "ingredient": "minecraft:water",
      "amount": 100
    }
  }]
  for (let i = 1; i <= 8; i++) {
    input.push({
      "type": "tfc:not_rotten",
      "ingredient": {
        "item": flour
      }
    })
    event.custom({
      "type": "tfc:advanced_shapeless_crafting",
      "ingredients": input,
      "result": {
        "stack": {
          "item": dough,
          "count": i*2
        },
        "modifiers": [
          "tfc:copy_oldest_food"
        ]
      }
    })
  }
}


onEvent('server.datapack.first', event => {
  // meat
  fishMeats.forEach(meat => {
    event.addTFCHeat(`minecraft:${meat}`, 1.0)
    event.addTFCHeat(`minecraft:cooked_${meat}`, 1.0)
    // temporary value!
    event.addTFCFoodItem(`minecraft:${meat}`, event => {
      event.hunger(4)
      event.saturation(0)
      event.decayModifier(3)
      event.protein(1)
    })
    event.addTFCFoodItem(`minecraft:cooked_${meat}`, event => {
      event.hunger(4)
      event.saturation(1)
      event.decayModifier(1.5)
      event.protein(2)
    })
  })

  // fruit
  fruits.forEach(fruit => {
    // temporary value!
    event.addTFCFoodItem(`minecraft:${fruit}`, event => {
      event.hunger(4)
      event.saturation(0.2)
      event.decayModifier(2.5)
      event.fruit(1)
    })
  })

  // vegetable
  vegetables.forEach(vegetable => {
    // temporary value!
    event.addTFCFoodItem(`minecraft:${vegetable}`, event => {
      event.hunger(4)
      event.saturation(1)
      event.decayModifier(1)
      event.vegetables(1)
    })
  })

  // grain
  event.addTFCFoodItem("minecraft:wheat", event => {
    event.decayModifier(2)
  })

})

onEvent('recipes', event => {
  // meat
  fishMeats.forEach(meat => {
    event.recipes.tfc.heating(`minecraft:cooked_${meat}`, `minecraft:${meat}`, 200)
  })

  // grain
  event.remove({output: "minecraft:bread"})
  event.remove({output: "minecraft:cake"})
  event.remove({output: "minecraft:cookie"})
  event.recipes.tfc.extra_products_shapeless_crafting("tfc:straw", 
    event.recipes.tfc.damage_inputs_shapeless_crafting("tfc:food/wheat_grain", ["minecraft:wheat", "#tfc:knives"])
  )

})

onEvent('tags.items', event => {
  // meat
  fishMeats.forEach(meat => {
    event.add("tfc:foods", `minecraft:${meat}`)
    event.add("tfc:foods", `minecraft:cooked_${meat}`)
    event.add("tfc:foods/meats", `minecraft:${meat}`)
    event.add("tfc:foods/meats", `minecraft:cooked_${meat}`)
    event.add("tfc:foods/raw_meats", `minecraft:${meat}`)
    event.add("tfc:foods/cooked_meats", `minecraft:cooked_${meat}`)
  })

  // fruit
  fruits.forEach(fruit => {
    event.add("tfc:foods", `minecraft:${fruit}`)
    event.add("tfc:foods/fruits", `minecraft:${fruit}`)
  })

  // vegetable
  vegetables.forEach(vegetable => {
    event.add("tfc:foods", `minecraft:${vegetable}`)
    event.add("tfc:foods/vegetables", `minecraft:${vegetable}`)
  })

  // grain
  event.add("tfc:foods", "minecraft:wheat")

})