function changeMove(sprite, move) {
  if (move == "next") {
    move = 1 + ((sprite.current_move + 1) % (dancers[sprite.style].length - 1));
  } else if (move == "prev") {
    move = 1 + ((sprite.current_move - 1) % (dancers[sprite.style].length - 1));
  } else if (move == "rand") {
    move = randomNumber(1, dancers[sprite.style].length - 1);
  }
  sprite.changeAnimation("anim" + move);
  sprite.animation.looping = true;
  sprite.previous_move = sprite.current_move;
  sprite.current_move = move;
  sprite.frameDelay = sprite.dance_speed;
  sprite.animation.changeFrame(0);
  sprite.animation.play();
}