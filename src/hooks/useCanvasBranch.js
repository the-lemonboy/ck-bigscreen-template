// useCanvasBranch.js
import { ref, computed, onMounted } from 'vue';

export function useCanvasBranch() {
  const el = ref(null);
  const ctx = computed(() => el.value.getContext('2d'));

  let pendingTasks = [];

  function init() {
    ctx.value.strokeStyle = '#fff5';
    step({
      start: { x: 0, y: 0 },
      length: 10,
      theta: Math.PI / 4,
    });
  }

  function step(b, depth = 0) {
    const end = getEndPoint(b);
    drawBranch(b);

    if (depth < 4 || Math.random() < 0.5) {
      pendingTasks.push(() =>
        step(
          {
            start: end,
            length: b.length + (Math.random() * 2 - 1),
            theta: b.theta - 0.2 * Math.random(),
          },
          depth + 1,
        ),
      );
    }
    if (depth < 4 || Math.random() < 0.5) {
      pendingTasks.push(() =>
        step(
          {
            start: end,
            length: b.length + (Math.random() * 2 - 1),
            theta: b.theta + 0.2 * Math.random(),
          },
          depth + 1,
        ),
      );
    }
  }

  function frame() {
    const tasks = [];
    pendingTasks = pendingTasks.filter((i) => {
      if (Math.random() > 0.4) {
        tasks.push(i);
        return false;
      }
      return true;
    });
    tasks.forEach((fn) => fn());
  }

  let framesCount = 0;
  function startFrame() {
    requestAnimationFrame(() => {
      framesCount += 1;
      if (framesCount % 3 === 0) frame();
      startFrame();
    });
  }

  function lineTo(p1, p2) {
    ctx.value.beginPath();
    ctx.value.moveTo(p1.x, p1.y);
    ctx.value.lineTo(p2.x, p2.y);
    ctx.value.stroke();
  }

  function getEndPoint(b) {
    return {
      x: b.start.x + b.length * Math.cos(b.theta),
      y: b.start.y + b.length * Math.sin(b.theta),
    };
  }

  function drawBranch(b) {
    lineTo(b.start, getEndPoint(b));
  }

  onMounted(() => {
    init();
    startFrame();
  });

  return { el };
}
