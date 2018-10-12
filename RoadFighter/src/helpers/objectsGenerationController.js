import Enemy from './../enemy'
import enemyImg from './../assets/enemy.png'

import Tree from './../road/tree'
import Explosion from './../explosion'

// enemies

const MAX_ENEMIES_NUMBER = 3
export const controlEnemies = (game) => {
  const {
    ctx,
    objects: {
      enemies,
      explosions,
    },
  } = game

  if (enemies.length < MAX_ENEMIES_NUMBER) {
    const shouldGenerateNew = Math.random() > 0.95
    if (shouldGenerateNew) {
      const enemy = new Enemy(game, enemyImg)
      enemies.push(enemy)
    }
  }

  enemies.forEach((enemy, idx) => {
    enemy.move(game)
    const isAlive = enemy.validation(game)
    if (isAlive) {
      enemy.draw(ctx)
    } else {
      const removedEnemy = enemies.splice(idx, 1)[0]
      const explosion = new Explosion(removedEnemy.x, removedEnemy.y)
      explosions.push(explosion)
    }
  })
}

// trees

const MAX_TREES_NUMBER = 50
export const controlTrees = (game) => {
  const { objects: { trees }, ctx } = game
  if (trees.length < MAX_TREES_NUMBER) {
    const shouldGenerateNew = Math.random() > 0.9
    if (shouldGenerateNew) {
      const tree = new Tree(game)
      trees.push(tree)
    }
  }

  trees.forEach((tree, idx) => {
    const isAlive = tree.validation()
    if (isAlive) {
      tree.draw(ctx)
    } else {
      trees.splice(idx, 1)
    }
  })
}

// explosions

export const controlExplosions = (game) => {
  const { objects: { explosions }, ctx } = game

  explosions.forEach((explosion, idx) => {
    explosion.move(game)
    const isAlive = explosion.validation()
    if (isAlive) {
      explosion.draw(ctx)
    } else {
      explosions.splice(idx, 1)
    }
  })
}