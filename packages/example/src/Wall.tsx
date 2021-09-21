import React, { MutableRefObject, useRef } from 'react'
import {
  gamepadAxis,
  gamepadButton,
  keycode,
  KEYS,
  mouseAxis,
  useAxis,
  useButtonHeld,
  useButtonPressed,
} from 'use-control'
import { useGamepadButtonPressed } from './gamepad'

const XBOX_ONE = {
  D_LEFT: 14,
  D_RIGHT: 15,
  D_UP: 12,
  D_DOWN: 13,
  STICK_L_X: 0,
  STICK_L_Y: 1,
  STICK_R_X: 2,
  STICK_R_Y: 3,
}

const inputMap = {
  buttons: {
    left: [keycode(KEYS.left_arrow), keycode(KEYS.a), gamepadButton(0, XBOX_ONE.D_LEFT)],
    right: [keycode(KEYS.right_arrow), keycode(KEYS.d), gamepadButton(0, XBOX_ONE.D_RIGHT)],
    up: [keycode(KEYS.up_arrow), keycode(KEYS.w), gamepadButton(0, XBOX_ONE.D_UP)],
    down: [keycode(KEYS.down_arrow), keycode(KEYS.s), gamepadButton(0, XBOX_ONE.D_DOWN)],
    count: [keycode(KEYS.space)],
  },
  axes: {
    x: [mouseAxis('x'), gamepadAxis(0, XBOX_ONE.STICK_R_X)],
    y: [mouseAxis('y'), gamepadAxis(0, XBOX_ONE.STICK_R_Y)],
  },
}

function modify<T>(val: MutableRefObject<T> | undefined, sink: (v: T) => void) {
  if (val?.current) {
    sink(val.current)
  }
}

export default function Wall(props: any) {
  const mesh = useRef()

  useGamepadButtonPressed(0, XBOX_ONE.D_LEFT, () => {
    modify<any>(mesh, (m) => {
      m.scale.x -= 0.1
    })
  })

  useAxis(inputMap, 'x', (v) => {
    modify<any>(mesh, (m) => {
      m.rotation.x = v * Math.PI * 2
    })
  })

  useAxis(inputMap, 'y', (v) => {
    modify<any>(mesh, (m) => {
      m.rotation.y = v * Math.PI * 2
    })
  })

  useButtonPressed(inputMap, 'left', () => {
    modify<any>(mesh, (m) => {
      m.scale.x -= 0.1
    })
  })

  useButtonPressed(inputMap, 'right', () => {
    modify<any>(mesh, (m) => {
      m.scale.x += 0.1
    })
  })

  useButtonHeld(inputMap, 'up', 50, () => {
    modify<any>(mesh, (m) => {
      m.scale.y += 0.05
    })
  })

  useButtonHeld(inputMap, 'down', 50, () => {
    modify<any>(mesh, (m) => {
      m.scale.y -= 0.05
    })
  })

  // useMouseMoveNormalised(([x, y]) => {
  //   modify<any>(mesh, (m) => {
  //     m.rotation.x = x * Math.PI * 2
  //     m.rotation.y = y * Math.PI * 2
  //   })
  // }, 1000 / 30)

  return (
    <group {...props}>
      <mesh ref={mesh}>
        <boxGeometry args={[4, 4]} />
        <meshPhongMaterial color={props.color || 'white'} />
      </mesh>
    </group>
  )
}
