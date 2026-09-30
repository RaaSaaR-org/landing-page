import { polar, twoDigit } from '@/lib/format';
import styles from './Knowledge.module.css';

const C = { x: 230, y: 210 };

interface KnowledgeGraphProps {
  aria: string;
  labels: { fundamentals: string; robots: string; glossary: string };
}

/** Hub artwork: the three areas as nodes of one knowledge graph, orbited by chapters, units and terms. */
export function KnowledgeGraph({ aria, labels }: KnowledgeGraphProps) {
  const nodes = [
    { key: 'fundamentals', x: 115, y: 105, label: labels.fundamentals },
    { key: 'robots', x: 365, y: 175, label: labels.robots },
    { key: 'glossary', x: 150, y: 330, label: labels.glossary },
  ] as const;
  const chapterDots = Array.from({ length: 8 }, (_, i) => polar(115, 105, 62, 165 + i * 23));
  const unitDots = Array.from({ length: 5 }, (_, i) => polar(365, 175, 60, -75 + i * 30));
  const letters = ['A', 'D', 'L', 'S', 'V', 'Z'].map((letter, i) => ({ letter, pos: polar(150, 330, 66, 150 + i * 24) }));

  return (
    <svg viewBox="0 0 460 420" fill="none" className={styles.graph} role="img" aria-label={aria}>
      {Array.from({ length: 9 }, (_, row) => Array.from({ length: 10 }, (_, col) => (
        <circle key={`${row}-${col}`} cx={23 + col * 46} cy={20 + row * 48} r="1" fill="currentColor" opacity=".12" />
      )))}
      <path d={`M${nodes[0].x} ${nodes[0].y}Q260 90 ${nodes[1].x} ${nodes[1].y}M${nodes[1].x} ${nodes[1].y}Q330 330 ${nodes[2].x} ${nodes[2].y}M${nodes[2].x} ${nodes[2].y}Q60 220 ${nodes[0].x} ${nodes[0].y}`} stroke="#ff8534" strokeOpacity=".16" strokeDasharray="3 6" />
      {nodes.map((node) => (
        <g key={node.key}>
          <path d={`M${C.x} ${C.y}L${node.x} ${node.y}`} stroke="#ff8534" strokeOpacity=".3" />
          <path d={`M${C.x} ${C.y}L${node.x} ${node.y}`} stroke="#ffa366" strokeWidth="2" strokeDasharray="10 150" className={styles.graphSignal} />
        </g>
      ))}
      {chapterDots.map(([x, y], i) => (
        <g key={i}>
          <path d={`M115 105L${x} ${y}`} stroke="#ff8534" strokeOpacity=".18" />
          <circle cx={x} cy={y} r="9" fill="#0c1115" stroke="#ff8534" strokeOpacity=".5" />
          <text x={x} y={y + 3} textAnchor="middle" className={styles.graphTiny}>{i + 1}</text>
        </g>
      ))}
      {unitDots.map(([x, y], i) => (
        <g key={i}>
          <path d={`M365 175L${x} ${y}`} stroke="#2dd4bf" strokeOpacity=".2" />
          <rect x={x - 7} y={y - 7} width="14" height="14" rx="4" fill="#0c1115" stroke="#5eead4" strokeOpacity=".6" />
          <circle cx={x} cy={y} r="2" fill="#5eead4" />
        </g>
      ))}
      {letters.map(({ letter, pos: [x, y] }) => (
        <g key={letter}>
          <path d={`M150 330L${x} ${y}`} stroke="#ff8534" strokeOpacity=".18" />
          <rect x={x - 10} y={y - 10} width="20" height="20" rx="5" fill="#0c1115" stroke="#ff8534" strokeOpacity=".45" />
          <text x={x} y={y + 3.5} textAnchor="middle" className={styles.graphLetter}>{letter}</text>
        </g>
      ))}
      {nodes.map((node) => {
        const width = node.label.length * 7.6 + 22;
        const teal = node.key === 'robots';
        return (
          <g key={node.key}>
            <circle cx={node.x} cy={node.y} r="26" fill="#0c1115" stroke={teal ? '#5eead4' : '#ff8534'} strokeWidth="1.5" />
            <circle cx={node.x} cy={node.y} r="5" fill={teal ? '#2dd4bf' : '#ff6700'} />
            <g transform={`translate(${node.x} ${node.y + 44})`}>
              <rect x={-width / 2} y="-11" width={width} height="22" rx="11" fill="#090c0f" stroke={teal ? '#5eead4' : '#ff8534'} strokeOpacity=".45" />
              <text y="4" textAnchor="middle" className={teal ? styles.graphLabelTeal : styles.graphLabel}>{node.label}</text>
            </g>
          </g>
        );
      })}
      <g transform={`translate(${C.x} ${C.y})`}>
        <circle r="40" stroke="#ff8534" strokeOpacity=".25" className={styles.graphPulse} />
        <rect x="-22" y="-22" width="44" height="44" rx="12" fill="#10161b" stroke="#ff8534" strokeWidth="1.5" />
        <path d="M-9 -6h18M-9 0h18M-9 6h11" stroke="#ffa366" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Small abstract diagrams give each knowledge area its own visual identity. */
export function AreaDiagram({ variant }: { variant: 'fundamentals' | 'robots' | 'glossary' }) {
  return (
    <svg viewBox="0 0 320 120" fill="none" className={styles.areaDiagram} aria-hidden="true">
      <path d="M0 60H320" stroke="currentColor" opacity=".06" />
      {variant === 'fundamentals' && <>
        {[70, 88, 62, 96, 78, 90, 66, 84].map((h, i) => (
          <g key={i}>
            <rect x={44 + i * 30} y={108 - h} width="22" height={h} rx="4" stroke="currentColor" opacity={i === 2 ? 1 : .35} fill={i === 2 ? 'currentColor' : 'none'} fillOpacity=".12" />
            <text x={55 + i * 30} y="102" textAnchor="middle" className={styles.areaTiny} opacity={i === 2 ? 1 : .6}>{twoDigit(i + 1)}</text>
          </g>
        ))}
        <path d="M36 110H290" stroke="currentColor" opacity=".3" />
      </>}
      {variant === 'robots' && <>
        <ellipse cx="160" cy="96" rx="118" ry="16" stroke="currentColor" opacity=".3" />
        <ellipse cx="160" cy="96" rx="72" ry="9" stroke="currentColor" opacity=".18" />
        <path d="M160 14V96M138 30V96M182 30V96" stroke="currentColor" opacity=".08" />
        <path d="M132 42L160 28L188 42V76L160 90L132 76Z" stroke="currentColor" opacity=".6" />
        <path d="M132 42L160 56L188 42M160 56V90" stroke="currentColor" opacity=".6" />
        <circle cx="160" cy="56" r="3" fill="currentColor" />
        <path d="M272 16V96M266 16H278M266 56H274M266 96H278" stroke="currentColor" opacity=".35" />
        <circle className={styles.areaOrbit} cx="278" cy="96" r="4" fill="currentColor" />
      </>}
      {variant === 'glossary' && <>
        <rect x="40" y="10" width="240" height="26" rx="13" stroke="currentColor" opacity=".35" />
        <circle cx="58" cy="23" r="5" stroke="currentColor" opacity=".7" />
        <path d="M62 27L66 31" stroke="currentColor" opacity=".7" />
        <path className={styles.areaCaret} d="M78 16V30" stroke="currentColor" strokeWidth="1.5" />
        {'ABCDEFGHILMOPRSTVZ'.split('').map((letter, i) => {
          const row = Math.floor(i / 9);
          const col = i % 9;
          const hot = ['D', 'L', 'S', 'V'].includes(letter);
          return (
            <g key={letter}>
              <rect x={40 + col * 27} y={52 + row * 32} width="22" height="24" rx="5" stroke="currentColor" opacity={hot ? .8 : .22} fill={hot ? 'currentColor' : 'none'} fillOpacity=".1" />
              <text x={51 + col * 27} y={68 + row * 32} textAnchor="middle" className={styles.areaTiny} opacity={hot ? 1 : .55}>{letter}</text>
            </g>
          );
        })}
      </>}
    </svg>
  );
}
