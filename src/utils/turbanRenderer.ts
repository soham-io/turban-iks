import type { TryOnPresetId } from '../types/museum';

export interface TurbanPlacement {
  centerX: number;
  centerY: number;
  width: number;
  rotationRad: number;
  opacity?: number;
}

export interface TryOnTurbanOption {
  id: TryOnPresetId;
  turbanId: string;
  name: string;
  region: string;
  subtitle: string;
  primaryColor: string;
  accentColor: string;
  thumbnail: string;
  culturalNote: string;
}

export const TRY_ON_OPTIONS: TryOnTurbanOption[] = [
  {
    id: 'jodhpuri-safa',
    turbanId: 'jodhpuri-safa',
    name: 'Royal Jodhpuri Safa',
    region: 'Rajasthan',
    subtitle: 'Diagonal Leheriya pleats · Fanned Turra · Shoulder Shimla',
    primaryColor: '#641F2B',
    accentColor: '#B49A62',
    thumbnail: '/src/assets/images/turban_jodhpuri_safa_1795273980634.jpg',
    culturalNote: 'Marwar royal celebratory turban with diagonal stripes and Kalgi crest.',
  },
  {
    id: 'punjabi-dastar',
    turbanId: 'punjabi-patiala-shahi-dastar',
    name: 'Patiala Shahi Dastar',
    region: 'Punjab',
    subtitle: 'Tall symmetrical V-apex · Layered Full Voile folds',
    primaryColor: '#1F305E',
    accentColor: '#3B5998',
    thumbnail: '/src/assets/images/turban_punjabi_dastar_1795273980615.jpg',
    culturalNote: 'Sacred Sikh Dastar worn as an emblem of dignity, discipline, and equality.',
  },
  {
    id: 'kolhapuri-pheta',
    turbanId: 'kolhapuri-pheta',
    name: 'Maharashtrian Kolhapuri Pheta',
    region: 'Maharashtra',
    subtitle: 'Saffron wrap · Upright peacock fan rosette · Flowing tail',
    primaryColor: '#D4622B',
    accentColor: '#B49A62',
    thumbnail: '/src/assets/images/turban_kolhapuri_pheta_1795273980861.jpg',
    culturalNote: 'Traditional Maharashtrian ceremonial Pheta symbolising warmth and valour.',
  },
  {
    id: 'mysore-peta',
    turbanId: 'mysore-peta',
    name: 'Mysore Royal Peta',
    region: 'Karnataka (South India)',
    subtitle: 'Ivory silk · Woven gold zari tissue · Jeweled Sarpech',
    primaryColor: '#EFE7D6',
    accentColor: '#B49A62',
    thumbnail: '/src/assets/images/turban_mysore_peta_1795273980342.jpg',
    culturalNote: 'Historic Mysuru court honour turban presented to scholars and guests.',
  },
];

/**
 * Renders 4 architecturally distinct, layered turban silhouettes onto a 2D canvas
 * positioned relative to detected facial landmarks (forehead, temple width, roll angle).
 */
export function drawTurbanOnCanvas(
  ctx: CanvasRenderingContext2D,
  presetId: TryOnPresetId,
  placement: TurbanPlacement
): void {
  const { centerX, centerY, width, rotationRad, opacity = 0.96 } = placement;
  if (width <= 8) return;

  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(centerX, centerY);
  ctx.rotate(rotationRad);

  // Normalized unit: scale drawing space where 200 units = width of turban
  const s = width / 200;
  ctx.scale(s, s);

  // Subtle ambient shadow cast onto forehead below the lower turban rim
  const foreheadShadow = ctx.createLinearGradient(0, -10, 0, 26);
  foreheadShadow.addColorStop(0, 'rgba(15, 10, 8, 0.48)');
  foreheadShadow.addColorStop(1, 'rgba(15, 10, 8, 0)');
  ctx.fillStyle = foreheadShadow;
  ctx.beginPath();
  ctx.ellipse(0, 6, 86, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  switch (presetId) {
    case 'jodhpuri-safa':
      drawJodhpuriSafa(ctx);
      break;
    case 'punjabi-dastar':
      drawPunjabiDastar(ctx);
      break;
    case 'kolhapuri-pheta':
      drawKolhapuriPheta(ctx);
      break;
    case 'mysore-peta':
      drawMysorePeta(ctx);
      break;
  }

  ctx.restore();
}

function drawJodhpuriSafa(ctx: CanvasRenderingContext2D): void {
  // 1. Trailing shoulder shimla (falling behind left side)
  const shimlaGrad = ctx.createLinearGradient(-95, -10, -110, 175);
  shimlaGrad.addColorStop(0, '#541822');
  shimlaGrad.addColorStop(0.6, '#641F2B');
  shimlaGrad.addColorStop(1, '#3D1018');
  ctx.fillStyle = shimlaGrad;
  ctx.beginPath();
  ctx.moveTo(-78, -22);
  ctx.quadraticCurveTo(-116, 48, -110, 168);
  ctx.lineTo(-76, 176);
  ctx.quadraticCurveTo(-72, 65, -62, -10);
  ctx.closePath();
  ctx.fill();

  // Leheriya diagonal gold stripes on shimla
  ctx.strokeStyle = 'rgba(218, 184, 114, 0.72)';
  ctx.lineWidth = 3.5;
  for (let y = 15; y < 165; y += 22) {
    ctx.beginPath();
    ctx.moveTo(-104, y);
    ctx.lineTo(-74, y + 14);
    ctx.stroke();
  }

  // 2. Upright fanned pleated Turra crest on upper right
  ctx.save();
  ctx.translate(38, -86);
  ctx.rotate(0.28);
  for (let i = -4; i <= 4; i++) {
    const angle = i * 0.14;
    ctx.save();
    ctx.rotate(angle);
    const fanGrad = ctx.createLinearGradient(0, 0, 0, -56);
    fanGrad.addColorStop(0, '#4E151F');
    fanGrad.addColorStop(0.7, '#7A2736');
    fanGrad.addColorStop(1, '#B49A62');
    ctx.fillStyle = fanGrad;
    ctx.beginPath();
    ctx.moveTo(-6, 4);
    ctx.lineTo(-11, -52);
    ctx.quadraticCurveTo(0, -58, 11, -52);
    ctx.lineTo(6, 4);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 225, 170, 0.35)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();

  // 3. Main dome volume
  const domeGrad = ctx.createRadialGradient(-10, -64, 14, 0, -45, 108);
  domeGrad.addColorStop(0, '#8A2E3D');
  domeGrad.addColorStop(0.65, '#641F2B');
  domeGrad.addColorStop(1, '#3B0F17');
  ctx.fillStyle = domeGrad;
  ctx.beginPath();
  ctx.moveTo(-90, 4);
  ctx.bezierCurveTo(-104, -55, -62, -108, 0, -108);
  ctx.bezierCurveTo(64, -108, 104, -55, 90, 4);
  ctx.quadraticCurveTo(0, -20, -90, 4);
  ctx.closePath();
  ctx.fill();

  // 4. Layered diagonal pleated bands (left-to-right and right-to-left)
  for (let i = 0; i < 4; i++) {
    const offset = i * 13;
    // Left diagonal wrap
    ctx.fillStyle = i % 2 === 0 ? '#782534' : '#581924';
    ctx.beginPath();
    ctx.moveTo(-90 + i * 3, 2 - offset * 0.45);
    ctx.quadraticCurveTo(-20, -48 - offset * 0.75, 62 - i * 8, -78 + offset * 0.45);
    ctx.lineTo(68 - i * 8, -64 + offset * 0.45);
    ctx.quadraticCurveTo(-16, -34 - offset * 0.75, -86 + i * 3, 12 - offset * 0.45);
    ctx.closePath();
    ctx.fill();

    // Gold & saffron Leheriya highlight lines
    ctx.strokeStyle = i % 2 === 0 ? '#D4A857' : '#B75E40';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(-88 + i * 3, 4 - offset * 0.45);
    ctx.quadraticCurveTo(-18, -42 - offset * 0.75, 60 - i * 8, -72 + offset * 0.45);
    ctx.stroke();
  }

  for (let i = 0; i < 4; i++) {
    const offset = i * 13;
    ctx.fillStyle = i % 2 === 0 ? '#6E2130' : '#4E151F';
    ctx.beginPath();
    ctx.moveTo(90 - i * 3, 2 - offset * 0.45);
    ctx.quadraticCurveTo(18, -46 - offset * 0.75, -60 + i * 8, -76 + offset * 0.45);
    ctx.lineTo(-65 + i * 8, -62 + offset * 0.45);
    ctx.quadraticCurveTo(14, -32 - offset * 0.75, 86 - i * 3, 12 - offset * 0.45);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = i % 2 === 0 ? '#E0BA6E' : 'rgba(255,240,210,0.28)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(88 - i * 3, 4 - offset * 0.45);
    ctx.quadraticCurveTo(16, -40 - offset * 0.75, -58 + i * 8, -70 + offset * 0.45);
    ctx.stroke();
  }

  // 5. Kalgi brooch ornament on front right crown
  ctx.save();
  ctx.translate(16, -62);
  ctx.rotate(0.12);
  // Feather plume
  ctx.strokeStyle = '#F6F1E7';
  ctx.lineWidth = 1.6;
  for (let k = -3; k <= 3; k++) {
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.quadraticCurveTo(k * 4, -28, k * 6, -42);
    ctx.stroke();
  }
  // Gold teardrop jewel
  const jewelGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, 12);
  jewelGrad.addColorStop(0, '#F5DFA0');
  jewelGrad.addColorStop(1, '#9A7836');
  ctx.fillStyle = jewelGrad;
  ctx.beginPath();
  ctx.moveTo(0, -14);
  ctx.bezierCurveTo(9, -4, 8, 11, 0, 14);
  ctx.bezierCurveTo(-8, 11, -9, -4, 0, -14);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#8E1D31';
  ctx.beginPath();
  ctx.arc(0, 2, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPunjabiDastar(ctx: CanvasRenderingContext2D): void {
  // Patiala Shahi Dastar: tall, proud symmetrical silhouette with 5 crisp V-larhs
  const baseGrad = ctx.createRadialGradient(0, -75, 16, 0, -62, 118);
  baseGrad.addColorStop(0, '#2B4480');
  baseGrad.addColorStop(0.7, '#1F305E');
  baseGrad.addColorStop(1, '#121D3B');

  // Outer crown silhouette (taller & fuller at cheeks)
  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.moveTo(-94, 4);
  ctx.bezierCurveTo(-114, -55, -86, -138, 0, -138);
  ctx.bezierCurveTo(86, -138, 114, -55, 94, 4);
  ctx.lineTo(64, -6);
  ctx.lineTo(0, -34);
  ctx.lineTo(-64, -6);
  ctx.closePath();
  ctx.fill();

  // Subtle central inner fifty/keski triangle peek above brow (authentic touch)
  ctx.fillStyle = '#152245';
  ctx.beginPath();
  ctx.moveTo(-36, -6);
  ctx.lineTo(0, -36);
  ctx.lineTo(36, -6);
  ctx.quadraticCurveTo(0, -12, -36, -6);
  ctx.closePath();
  ctx.fill();

  // 5 Symmetrical Patiala Larhs (folds) sweeping up to central V-apex
  for (let i = 0; i < 5; i++) {
    const yLift = i * 16;
    const shade = i % 2 === 0 ? '#273E76' : '#1B2B54';
    const highlight = 'rgba(130, 165, 235, 0.28)';
    const shadow = 'rgba(8, 12, 26, 0.45)';

    // Right-side larh (viewer's right)
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-2, -32 - yLift);
    ctx.quadraticCurveTo(54, -58 - yLift * 0.72, 95 - i * 4, -8 - yLift * 0.6);
    ctx.lineTo(92 - i * 4, 5 - yLift * 0.6);
    ctx.quadraticCurveTo(48, -42 - yLift * 0.72, -2, -18 - yLift);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = shadow;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-2, -18 - yLift);
    ctx.quadraticCurveTo(48, -42 - yLift * 0.72, 92 - i * 4, 5 - yLift * 0.6);
    ctx.stroke();

    ctx.strokeStyle = highlight;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-2, -30 - yLift);
    ctx.quadraticCurveTo(52, -55 - yLift * 0.72, 94 - i * 4, -7 - yLift * 0.6);
    ctx.stroke();

    // Left-side larh (viewer's left)
    ctx.fillStyle = i % 2 === 0 ? '#223668' : '#19284E';
    ctx.beginPath();
    ctx.moveTo(2, -32 - yLift);
    ctx.quadraticCurveTo(-54, -58 - yLift * 0.72, -95 + i * 4, -8 - yLift * 0.6);
    ctx.lineTo(-92 + i * 4, 5 - yLift * 0.6);
    ctx.quadraticCurveTo(-48, -42 - yLift * 0.72, 2, -18 - yLift);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = shadow;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(2, -18 - yLift);
    ctx.quadraticCurveTo(-48, -42 - yLift * 0.72, -92 + i * 4, 5 - yLift * 0.6);
    ctx.stroke();
  }

  // Smooth top crown ridge highlight
  ctx.strokeStyle = 'rgba(175, 200, 255, 0.24)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-66, -98);
  ctx.quadraticCurveTo(0, -136, 66, -98);
  ctx.stroke();
}

function drawKolhapuriPheta(ctx: CanvasRenderingContext2D): void {
  // 1. Flowing side Shemla tail on left side
  const tailGrad = ctx.createLinearGradient(-85, 0, -90, 185);
  tailGrad.addColorStop(0, '#BA501E');
  tailGrad.addColorStop(0.5, '#D4622B');
  tailGrad.addColorStop(1, '#9E3E14');
  ctx.fillStyle = tailGrad;
  ctx.beginPath();
  ctx.moveTo(-74, -10);
  ctx.quadraticCurveTo(-112, 65, -104, 184);
  ctx.lineTo(-64, 188);
  ctx.quadraticCurveTo(-66, 75, -55, -2);
  ctx.closePath();
  ctx.fill();

  // Vertical pleat lines on tail
  ctx.strokeStyle = 'rgba(70, 22, 6, 0.35)';
  ctx.lineWidth = 1.6;
  for (let x = -94; x <= -70; x += 8) {
    ctx.beginPath();
    ctx.moveTo(x + 12, 6);
    ctx.quadraticCurveTo(x - 4, 92, x, 184);
    ctx.stroke();
  }

  // 2. Signature large upright pleated Peacock Fan (Tura) on upper right
  ctx.save();
  ctx.translate(46, -74);
  ctx.rotate(0.45);
  const pleatCount = 13;
  for (let i = -6; i <= 6; i++) {
    const a = i * 0.135;
    ctx.save();
    ctx.rotate(a);
    const pGrad = ctx.createLinearGradient(0, 0, 0, -76);
    pGrad.addColorStop(0, '#9E3E14');
    pGrad.addColorStop(0.6, i % 2 === 0 ? '#DC6B34' : '#C65622');
    pGrad.addColorStop(1, '#E6834D');
    ctx.fillStyle = pGrad;
    ctx.beginPath();
    ctx.moveTo(-4, 0);
    ctx.lineTo(-10, -72);
    ctx.quadraticCurveTo(0, -76, 10, -72);
    ctx.lineTo(4, 0);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(75, 22, 6, 0.3)';
    ctx.lineWidth = 0.9;
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();

  // 3. Rounded voluminous saffron Pheta crown
  const crownGrad = ctx.createRadialGradient(-16, -54, 12, 0, -45, 105);
  crownGrad.addColorStop(0, '#E87A43');
  crownGrad.addColorStop(0.65, '#D4622B');
  crownGrad.addColorStop(1, '#983C14');
  ctx.fillStyle = crownGrad;
  ctx.beginPath();
  ctx.moveTo(-92, 4);
  ctx.bezierCurveTo(-106, -52, -62, -98, 2, -98);
  ctx.bezierCurveTo(64, -98, 104, -52, 90, 4);
  ctx.quadraticCurveTo(0, -14, -92, 4);
  ctx.closePath();
  ctx.fill();

  // 4. Crisp sweeping Maharashtrian wrap bands
  for (let i = 0; i < 4; i++) {
    const shift = i * 12;
    ctx.fillStyle = i % 2 === 0 ? '#DF6E36' : '#C45320';
    ctx.beginPath();
    ctx.moveTo(-91 + i * 3, 2 - shift * 0.45);
    ctx.quadraticCurveTo(-5, -36 - shift * 0.75, 84 - i * 4, -22 - shift * 0.4);
    ctx.lineTo(86 - i * 4, -8 - shift * 0.4);
    ctx.quadraticCurveTo(-5, -22 - shift * 0.75, -89 + i * 3, 12 - shift * 0.45);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(70, 20, 6, 0.28)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Zari edge trim along brow
  ctx.strokeStyle = '#E5BE70';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(-88, 3);
  ctx.quadraticCurveTo(0, -17, 88, 1);
  ctx.stroke();
}

function drawMysorePeta(ctx: CanvasRenderingContext2D): void {
  // 1. Feathered plume crest behind royal Sarpech
  ctx.save();
  ctx.translate(0, -104);
  ctx.strokeStyle = 'rgba(246, 241, 231, 0.9)';
  ctx.lineWidth = 1.8;
  for (let i = -8; i <= 8; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.quadraticCurveTo(i * 4.5, -24, i * 7.5, -48 + Math.abs(i) * 2.2);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(180, 154, 98, 0.85)';
  ctx.lineWidth = 1.2;
  for (let i = -5; i <= 5; i += 2) {
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.quadraticCurveTo(i * 3, -22, i * 5.5, -42);
    ctx.stroke();
  }
  ctx.restore();

  // 2. Ivory mulberry silk sculpted crown
  const silkGrad = ctx.createRadialGradient(-12, -62, 16, 0, -48, 108);
  silkGrad.addColorStop(0, '#FCF8F0');
  silkGrad.addColorStop(0.65, '#EAE0CC');
  silkGrad.addColorStop(1, '#B8AA92');
  ctx.fillStyle = silkGrad;
  ctx.beginPath();
  ctx.moveTo(-92, 4);
  ctx.bezierCurveTo(-104, -56, -64, -104, 0, -104);
  ctx.bezierCurveTo(64, -104, 104, -56, 92, 4);
  ctx.quadraticCurveTo(0, -18, -92, 4);
  ctx.closePath();
  ctx.fill();

  // 3. Ornate wide Gold Zari tissue bands crossing diagonally
  const zariGrad = ctx.createLinearGradient(-90, -20, 90, -60);
  zariGrad.addColorStop(0, '#9E7F43');
  zariGrad.addColorStop(0.5, '#D7BA7A');
  zariGrad.addColorStop(1, '#8C6E34');

  // Left-to-right broad zari sash
  ctx.fillStyle = zariGrad;
  ctx.beginPath();
  ctx.moveTo(-90, 2);
  ctx.quadraticCurveTo(-8, -32, 72, -64);
  ctx.lineTo(82, -46);
  ctx.quadraticCurveTo(-2, -14, -84, 10);
  ctx.closePath();
  ctx.fill();

  // Right-to-left broad zari sash
  ctx.fillStyle = zariGrad;
  ctx.beginPath();
  ctx.moveTo(90, 2);
  ctx.quadraticCurveTo(8, -32, -72, -64);
  ctx.lineTo(-82, -46);
  ctx.quadraticCurveTo(2, -14, 84, 10);
  ctx.closePath();
  ctx.fill();

  // Fine brocade embroidery dots on zari bands
  ctx.fillStyle = 'rgba(255, 244, 214, 0.72)';
  for (let x = -65; x <= 65; x += 14) {
    ctx.beginPath();
    ctx.arc(x, -18 - Math.abs(x) * 0.2, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. Sculpted gold pleated side tiers
  ctx.strokeStyle = 'rgba(140, 110, 52, 0.45)';
  ctx.lineWidth = 1.6;
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(-82 + i * 6, -34 - i * 14);
    ctx.quadraticCurveTo(0, -65 - i * 12, 82 - i * 6, -34 - i * 14);
    ctx.stroke();
  }

  // 5. Central Jeweled Sarpech Brooch
  ctx.save();
  ctx.translate(0, -56);
  ctx.fillStyle = '#C9A55A';
  ctx.beginPath();
  ctx.moveTo(0, -34);
  ctx.quadraticCurveTo(14, -14, 10, 8);
  ctx.lineTo(20, 18);
  ctx.lineTo(0, 26);
  ctx.lineTo(-20, 18);
  ctx.lineTo(-10, 8);
  ctx.quadraticCurveTo(-14, -14, 0, -34);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#6E5220';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Ruby & Emerald center stones
  ctx.fillStyle = '#7A1627';
  ctx.beginPath();
  ctx.arc(0, 6, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1E5B3A';
  ctx.beginPath();
  ctx.arc(-11, 14, 2.5, 0, Math.PI * 2);
  ctx.arc(11, 14, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
