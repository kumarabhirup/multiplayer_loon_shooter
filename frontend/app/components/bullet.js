/* eslint-disable no-unused-vars */

/* 
  global

  Koji
  dispatch
  GameObject
  createVector
  Smooth
  isMobile
  usingKeyboard
  camera
  player
  arenaSize
  spawnExplosion
  random
  bullets
  p5
*/

class Bullet extends GameObject {
  fromWeapon = this.settings.weapon

  direction = this.fromWeapon.shootDirection

  owner = this.fromWeapon.owner

  rotation = this.fromWeapon.rotation

  maxVelocity = Koji.config.strings.bulletSpeed

  goalVelocity = this.maxVelocity / 4

  fire() {
    this.body.angle = this.rotation

    this.maxVelocity = Smooth(this.maxVelocity, this.goalVelocity, 20)

    // Movement
    this.body.position.add(p5.Vector.mult(this.direction, this.sizing.radius))

    if (this.isTouchingEdges()) {
      this.removable = true
      spawnExplosion(this.body.position.x, this.body.position.y, random(2, 10))
    }

    // this.checkBulletCollision()
  }

  checkBulletCollision() {
    for (let i = 0; i < bullets.length; i += 1) {
      if (bullets[i] !== this) {
        if (
          this.didTouch(
            { sizing: bullets[i].sizing, body: bullets[i].body },
            'circle'
          )
        ) {
          this.removable = true

          bullets[i].removable = true

          spawnExplosion(
            (this.body.position.x + bullets[i].body.position.x) / 2,
            (this.body.position.y + bullets[i].body.position.y) / 2,
            random(35, 50)
          )
        }
      }
    }
  }

  isTouchingEdges() {
    return (
      this.body.position.x > arenaSize / 2 ||
      this.body.position.x < -arenaSize / 2 ||
      this.body.position.y > arenaSize / 2 ||
      this.body.position.y < -arenaSize / 2
    )
  }
}