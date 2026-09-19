import { ReasonItem, LoveCoupon, FlowerNote } from '../types';

export const defaultLetter = {
  headline: '20 de Septiembre: Aunque haya distancia física, nuestro amor está más cerca que nunca',
  subtitle: 'Dicen que hoy no se celebra nada oficial en el calendario... y precisamente por eso quiero celebrarte, mi niña hermosa.',
  bodyParagraphs: [
    'Hoy me desperté pensando en cómo a veces el mundo espera fechas específicas como San Valentín o aniversarios para decir cosas bonitas. Pero el amor sincero y verdadero no depende de una fecha en el calendario, ni mucho menos de los kilómetros que nos separan.',
    'Hoy es 20 de septiembre. Para muchos es solo un día común y corriente, pero para mí es el momento perfecto para recordarte lo inmensamente feliz y agradecido que soy de tenerte en mi vida. Aunque la distancia a veces sea difícil, cada llamada, cada partida juntos en Roblox, cada mensaje de buenos días y cada risa que compartimos hacen que te sienta aquí mismo, abrazándome el alma.',
    'Amo la dulzura de tu voz a través del teléfono, la emoción con la que jugamos y nos reímos de cualquier tontería, y esa carita hermosa que ilumina mi pantalla en cada videollamada. No necesito que sea una fiesta oficial para recordarte que eres mi persona favorita en todo el universo.',
    'Este rinconcito digital lo creé pensando exclusivamente en ti, Nashalie. Con todo el amor de mi corazón, para recordarte hoy y siempre que la distancia es solo una prueba temporal para un amor que está destinado a ser infinito.'
  ],
  quote: '"La distancia solo separa cuerpos, jamás dos corazones que eligieron amarse todos los días."',
};

export const twentyReasons: ReasonItem[] = [
  {
    id: 1,
    title: 'Siempre tienes tiempo para mí',
    description: 'Sin importar lo ocupada que estés o qué tan pesado haya sido tu día, siempre buscas un momento para escribirme, llamarme y hacerme sentir tu prioridad.',
    category: 'detalles',
    icon: 'Clock',
  },
  {
    id: 2,
    title: 'Jugar Roblox juntos y reírnos',
    description: 'Nuestras partidas, las risas interminables, perder o ganar juntos y todas las ocurrencias graciosas que nos pasan en cada mapa.',
    category: 'momentos',
    icon: 'Gamepad2',
  },
  {
    id: 3,
    title: 'Tu carita hermosa en videollamada',
    description: 'Esa sonrisa tierna que ilumina mi pantalla antes de dormir y que tiene el poder de alegrarme el día en un solo segundo.',
    category: 'detalles',
    icon: 'Sparkles',
  },
  {
    id: 4,
    title: 'Quedarnos despiertos platicando',
    description: 'Esas noches donde las horas se pasan volando y ninguno de los dos se quiere ir a dormir por seguir compartiendo cosas juntos.',
    category: 'momentos',
    icon: 'Moon',
  },
  {
    id: 5,
    title: 'Cómo me escuchas y me comprendes',
    description: 'Tu paciencia, tu ternura y esa forma tan dulce en la que me apoyas cuando necesito contarte cómo me siento o cómo estuvo mi día.',
    category: 'personalidad',
    icon: 'Heart',
  },
  {
    id: 6,
    title: 'Hacer que la distancia no se sienta',
    description: 'Con tus mensajes de buenos días, tus llamadas y tus detalles, me demuestras que dos corazones unidos no conocen de kilómetros.',
    category: 'detalles',
    icon: 'MessageCircleHeart',
  },
  {
    id: 7,
    title: 'Tu ternura y cómo me consientes',
    description: 'Ese cariño tan puro y sincero con el que me tratas, haciéndome sentir el chico más afortunado y especial del mundo entero.',
    category: 'personalidad',
    icon: 'Smile',
  },
  {
    id: 8,
    title: 'Tu apoyo incondicional en todo',
    description: 'Saber que siempre estás ahí para animarme, creer en mí y recordarme lo fuerte y hermoso que es nuestro amor.',
    category: 'personalidad',
    icon: 'ShieldCheck',
  },
  {
    id: 9,
    title: 'Nuestros planes para cuando nos veamos',
    description: 'Soñar juntos con el instante en que por fin corra a abrazarte en persona y no nos soltemos por horas enteras.',
    category: 'futuro',
    icon: 'MapPin',
  },
  {
    id: 10,
    title: 'Simplemente ser tú, mi Nashalie',
    description: 'Porque eres la niña de mis ojos, mi persona favorita en el universo y a quien elegiría una y mil veces sin dudarlo.',
    category: 'personalidad',
    icon: 'Stars',
  },
];

export const tenReasons = twentyReasons;

export const defaultCoupons: LoveCoupon[] = [
  {
    id: 'dist-coupon-1',
    title: 'Recarga de 500 Robux para Ti',
    description: 'Válido para una recarga de hasta 500 Robux directa a tu cuenta de Roblox. ¡Tú eliges la skin, accesorios o gamepass que más quieras y Abdias te los recarga de inmediato!',
    category: 'Roblox Especial',
    tag: '500 Robux Máx',
    iconName: 'Coins',
    redeemed: false,
  },
  {
    id: 'dist-coupon-2',
    title: 'Noche de Roblox a tu Elección',
    description: 'Tú eliges el juego en Roblox (Brookhaven, Bloxburg, Dress to Impress, Adopt Me, o el que se te antoje) y jugamos todas las horas que quieras sin límite, divirtiéndonos juntos.',
    category: 'Gaming a Distancia',
    tag: 'Tú mandas en el server',
    iconName: 'Gamepad2',
    redeemed: false,
  },
  {
    id: 'dist-coupon-3',
    title: 'Videollamada hasta Dormirte',
    description: 'Nos conectamos en llamada o Discord por la noche, platicamos de todo, nos reímos y me quedo acompañándote con voz suave hasta que te quedes profundamente dormidita.',
    category: 'Noches Juntos',
    tag: 'Abrazo por voz',
    iconName: 'Moon',
    redeemed: false,
  },
  {
    id: 'dist-coupon-4',
    title: 'Cita de Cine Virtual con Palomitas',
    description: 'Preparamos snacks, sincronizamos la película o serie que tú elijas en Discord / pantalla compartida y disfrutamos nuestra cita de cine a distancia como si estuviéramos juntos.',
    category: 'Cita a Distancia',
    tag: 'Cine virtual',
    iconName: 'Film',
    redeemed: false,
  },
  {
    id: 'dist-coupon-5',
    title: 'Delivery de tu Postre o Comida Favorita',
    description: 'Elige tu hamburguesa, pizza, helado, sushi o antojito favorito, y Abdias te lo envía directamente por delivery a la puerta de tu casa para consentirte desde lejos.',
    category: 'Detalle a Domicilio',
    tag: 'A la puerta de tu casa',
    iconName: 'Utensils',
    redeemed: false,
  },
];

export const flowersCollection: FlowerNote[] = [
  {
    id: 1,
    name: 'Rosa de Amor Eterno',
    meaning: 'Pasión y devoción sin importar la distancia',
    note: 'Como esta rosa, mi amor por ti crece más fuerte cada día, cruzando cualquier distancia.',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 2,
    name: 'Flor Amarilla de Septiembre',
    meaning: 'Alegría, luz y primavera',
    note: 'Las flores amarillas de septiembre: un recordatorio de que tú eres el sol que ilumina mi vida.',
    color: 'from-amber-400 to-yellow-500',
  },
  {
    id: 3,
    name: 'Lirio de la Dulzura',
    meaning: 'Ternura y paz a través de la pantalla',
    note: 'Tu voz y tu ternura me transmiten la calma más pura del mundo.',
    color: 'from-rose-200 to-rose-300',
  },
  {
    id: 4,
    name: 'Girasol de Lealtad',
    meaning: 'Admiración y fidelidad infinita',
    note: 'No importa dónde estemos en el mapa, mi corazón siempre gira hacia ti.',
    color: 'from-yellow-400 to-amber-600',
  },
  {
    id: 5,
    name: 'Orquídea de la Esperanza',
    meaning: 'El día en que por fin nos abracemos',
    note: 'Cada segundo que pasa es un segundo más cerca de vernos y abrazarnos sin soltarnos jamás.',
    color: 'from-fuchsia-400 to-purple-500',
  },
];
