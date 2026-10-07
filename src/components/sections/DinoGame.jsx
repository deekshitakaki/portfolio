import { useEffect, useRef, useState } from 'react'

/*
 * a tiny chrome-dino runner. tap / click / space to jump.
 * keyboard only works once the game is focused, so space still scrolls the page normally.
 * pauses itself when scrolled out of view or when the tab is hidden.
 */

const PX = 2 // size of one sprite pixel
const H = 150 // canvas height (css px)
const GROUND_PAD = 22 // ground line distance from the bottom
const DINO_X = 28
const GRAVITY = 2600
const JUMP_V = 620 // peak ≈ 74px: clears the tallest cactus group without leaving the canvas
const START_SPEED = 380
const MAX_SPEED = 860
const ACCEL = 0.011 // speed gained per px travelled

const COLORS = {
  dino: '#f4f1ea',
  dead: '#ff9ec7',
  cactus: '#d4f57a',
  bird: '#b9a6ff',
  ground: '#3a3944',
  speck: '#55535f',
  cloud: 'rgba(169,166,181,0.2)',
}

// ── sprites ('#' = filled) ──
const DINO = [
  '...........########.',
  '..........##.#######',
  '..........##########',
  '..........##########',
  '..........#####.....',
  '..........########..',
  '#........#####......',
  '#.......#########...',
  '##.....#########.##.',
  '###...##########....',
  '####.###########....',
  '################....',
  '.##############.....',
  '..############......',
  '...##########.......',
  '....#######.........',
]
const LEGS = {
  stand: ['....###..##.........', '....##....#.........', '....#.....#.........', '....##....##........'],
  a: ['....###..##.........', '....##....###.......', '....#...............', '....##..............'],
  b: ['....###..##.........', '.....##...#.........', '..........#.........', '..........##........'],
}
const DINO_H = (DINO.length + 4) * PX
const CACTUS = [
  '...#...',
  '..###..',
  '..###.#',
  '#.###.#',
  '#.###.#',
  '#.#####',
  '#.###..',
  '#####..',
  '..###..',
  '..###..',
  '..###..',
  '..###..',
  '..###..',
  '..###..',
]
const BIRD = {
  up: ['....#.......', '....##......', '..#.###.....', '.##########.', '####.#######', '.....######.', '............', '............'],
  down: ['............', '............', '..#.........', '.##########.', '####.#######', '.....######.', '.....###....', '.....##.....'],
}
const CLOUD = ['.....####.....', '...##....##...', '.##........##.', '#............#', '##############']

function drawSprite(ctx, rows, x, y, scale, color) {
  ctx.fillStyle = color
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r]
    for (let c = 0; c < row.length; c++) {
      if (row[c] === '#') ctx.fillRect(Math.round(x + c * scale), Math.round(y + r * scale), scale, scale)
    }
  }
}

const overlaps = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
const pad = (n) => String(Math.floor(n)).padStart(5, '0')

function readHi() {
  try {
    return Number(localStorage.getItem('dino-hi')) || 0
  } catch {
    return 0
  }
}
function saveHi(v) {
  try {
    localStorage.setItem('dino-hi', String(v))
  } catch {
    /* storage unavailable — the high score just won't stick */
  }
}

const messages = {
  idle: 'press space or tap to play',
  paused: 'paused · tap to resume',
  over: 'game over · tap to try again',
}

export default function DinoGame() {
  const canvasRef = useRef(null)
  const scoreRef = useRef(null)
  const hiRef = useRef(null)
  const game = useRef(null)
  const [status, setStatus] = useState('idle') // idle | running | paused | over

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const g = {
      status: 'idle',
      w: 0,
      raf: 0,
      last: 0,
      overAt: 0,
      hi: readHi(),
      y: 0, // dino height above the ground
      vy: 0,
      speed: START_SPEED,
      dist: 0,
      gap: 0,
      obstacles: [],
      clouds: [],
      specks: [],
    }
    game.current = g

    const groundY = () => H - GROUND_PAD
    const setS = (s) => {
      g.status = s
      setStatus(s)
    }

    function reset() {
      Object.assign(g, { y: 0, vy: 0, speed: START_SPEED, dist: 0, gap: 0, obstacles: [] })
      g.clouds = [
        { x: g.w * 0.35, y: 20 },
        { x: g.w * 0.8, y: 42 },
      ]
      g.specks = Array.from({ length: Math.ceil(g.w / 36) }, (_, i) => ({
        x: i * 36 + Math.random() * 24,
        y: groundY() + 5 + Math.random() * 10,
        w: 1 + Math.round(Math.random() * 2),
      }))
    }

    function spawn() {
      const x = g.w + 20
      if (g.dist > 2500 && Math.random() < 0.25) {
        const w = BIRD.up[0].length * PX
        const h = BIRD.up.length * PX
        // low birds must be jumped; high ones fly over your head
        const high = Math.random() < 0.5
        g.obstacles.push({ kind: 'bird', x, w, h, y: high ? groundY() - DINO_H - h - 8 : groundY() - h - 10 })
      } else {
        const scale = Math.random() < 0.35 ? 3 : 2
        const count = Math.random() < 0.55 ? 1 : Math.random() < 0.7 ? 2 : 3
        const one = CACTUS[0].length * scale
        const h = CACTUS.length * scale
        g.obstacles.push({ kind: 'cactus', x, scale, count, w: count * one + (count - 1) * 2, h, y: groundY() - h })
      }
      g.gap = g.speed * (0.75 + Math.random() * 0.8) + 140
    }

    function gameOver() {
      setS('over')
      g.overAt = performance.now()
      const score = Math.floor(g.dist / 40)
      if (score > g.hi) {
        g.hi = score
        saveHi(score)
        if (hiRef.current) hiRef.current.textContent = pad(score)
      }
    }

    function update(dt) {
      g.speed = Math.min(MAX_SPEED, START_SPEED + g.dist * ACCEL)
      const dx = g.speed * dt
      g.dist += dx

      // jump physics
      if (g.y > 0 || g.vy > 0) {
        g.y += g.vy * dt
        g.vy -= GRAVITY * dt
        if (g.y <= 0) {
          g.y = 0
          g.vy = 0
        }
      }

      // scroll the world
      for (const o of g.obstacles) o.x -= o.kind === 'bird' ? dx * 1.08 : dx
      g.obstacles = g.obstacles.filter((o) => o.x + o.w > -10)
      const last = g.obstacles[g.obstacles.length - 1]
      if ((!last && g.dist > 250) || (last && last.x < g.w - g.gap)) spawn()

      for (const c of g.clouds) {
        c.x -= dx * 0.15
        if (c.x < -40) Object.assign(c, { x: g.w + Math.random() * 120, y: 14 + Math.random() * 34 })
      }
      for (const s of g.specks) {
        s.x -= dx
        if (s.x < -4) Object.assign(s, { x: s.x + g.w + 40, y: groundY() + 5 + Math.random() * 10 })
      }

      // collisions: one box for the head, one for the body
      const top = groundY() - DINO_H - g.y
      const dino = [
        { x: DINO_X + 21, y: top + 1, w: 17, h: 10 },
        { x: DINO_X + 4, y: top + 13, w: 24, h: 25 },
      ]
      const hit = g.obstacles.some((o) => {
        const box = { x: o.x + 2, y: o.y + 2, w: o.w - 4, h: o.h - 3 }
        return dino.some((b) => overlaps(b, box))
      })
      if (hit) gameOver()

      if (scoreRef.current) scoreRef.current.textContent = pad(g.dist / 40)
    }

    function draw() {
      ctx.clearRect(0, 0, g.w, H)
      for (const c of g.clouds) drawSprite(ctx, CLOUD, c.x, c.y, PX, COLORS.cloud)

      ctx.fillStyle = COLORS.ground
      ctx.fillRect(0, groundY(), g.w, 1)
      ctx.fillStyle = COLORS.speck
      for (const s of g.specks) ctx.fillRect(Math.round(s.x), Math.round(s.y), s.w, 1)

      for (const o of g.obstacles) {
        if (o.kind === 'bird') {
          drawSprite(ctx, Math.floor(g.dist / 60) % 2 ? BIRD.up : BIRD.down, o.x, o.y, PX, COLORS.bird)
        } else {
          for (let i = 0; i < o.count; i++) drawSprite(ctx, CACTUS, o.x + i * (CACTUS[0].length * o.scale + 2), o.y, o.scale, COLORS.cactus)
        }
      }

      const top = groundY() - DINO_H - g.y
      const color = g.status === 'over' ? COLORS.dead : COLORS.dino
      const legs = g.status === 'running' && g.y === 0 ? (Math.floor(g.dist / 28) % 2 ? LEGS.a : LEGS.b) : LEGS.stand
      drawSprite(ctx, DINO, DINO_X, top, PX, color)
      drawSprite(ctx, legs, DINO_X, top + DINO.length * PX, PX, color)
    }

    function frame(now) {
      const dt = Math.min(0.034, (now - g.last) / 1000)
      g.last = now
      update(dt)
      draw()
      if (g.status === 'running') g.raf = requestAnimationFrame(frame)
    }

    function run() {
      setS('running')
      g.last = performance.now()
      cancelAnimationFrame(g.raf)
      g.raf = requestAnimationFrame(frame)
    }

    function pause() {
      if (g.status !== 'running') return
      cancelAnimationFrame(g.raf)
      setS('paused')
      draw()
    }

    g.press = () => {
      if (g.status === 'over' && performance.now() - g.overAt < 400) return // ignore panic double-taps
      if (g.status === 'idle' || g.status === 'over') {
        reset()
        g.vy = JUMP_V
        run()
      } else if (g.status === 'paused') {
        run()
      } else if (g.y === 0) {
        g.vy = JUMP_V
      }
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      g.w = canvas.clientWidth
      canvas.width = Math.round(g.w * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (g.status !== 'running') draw()
    }

    resize()
    reset()
    draw()
    if (hiRef.current) hiRef.current.textContent = pad(g.hi)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => !e.isIntersecting && pause(), { threshold: 0.2 })
    io.observe(canvas)
    const onVisibility = () => document.hidden && pause()
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(g.raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const press = () => {
    canvasRef.current?.focus({ preventScroll: true })
    game.current?.press()
  }

  return (
    <section aria-label="dino game" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="rounded-[1.75rem] border border-line bg-ink-2 p-4 sm:p-5">
        <div className="mb-2 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-wider text-fog">
          <span>🦖 no internet required</span>
          <span className="tabular-nums">
            hi <span ref={hiRef}>00000</span>
            <span className="ml-3 text-paper" ref={scoreRef}>
              00000
            </span>
          </span>
        </div>
        <div className="relative">
          <canvas
            ref={canvasRef}
            tabIndex={0}
            onPointerDown={press}
            onKeyDown={(e) => {
              if ([' ', 'ArrowUp', 'w', 'W', 'Enter'].includes(e.key)) {
                e.preventDefault()
                game.current?.press()
              }
            }}
            aria-label="dino game — press space or tap to jump"
            className="block h-[150px] w-full cursor-pointer touch-manipulation rounded-xl focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-white/15"
          />
          {status !== 'running' && (
            <p
              aria-live="polite"
              className="pointer-events-none absolute inset-x-0 top-6 text-center font-mono text-xs text-fog"
            >
              {messages[status]}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
