import { Project, VisualStyle, Voice, Character, Episode } from '@/types';

export const mockProjects: Project[] = [
  {
    project_id: 'p-001',
    project_type: 'multi_episodes',
    series_id: 's-001',
    series_title: '共生劫：白骨夫人的生死局',
    drama_cover: null,
    updated_at: Date.now() - 3600000,
    episode_count: 4,
  },
  {
    project_id: 'p-002',
    project_type: 'single_episode',
    series_id: 's-002',
    series_title: '众声喧哗',
    drama_cover: null,
    updated_at: Date.now() - 86400000,
    episode_count: 1,
  },
  {
    project_id: 'p-003',
    project_type: 'redbook_note',
    series_id: 's-003',
    series_title: '职场暴击：年终奖缩水80%',
    drama_cover: null,
    updated_at: Date.now() - 7200000,
    episode_count: 1,
  },
];

export const mockVisualStyles: VisualStyle[] = [
  { id: 1, title: 'Immersive Raw Realism', type: 'Realistic/Live', description: 'Wide-angle natural lighting with continuous dynamic movement...', img_url: '/styles/1.jpg' },
  { id: 2, title: 'Hong Kong Neo-Noir', type: 'Realistic/Live', description: 'Neon-drenched streets, high contrast shadows...', img_url: '/styles/2.jpg' },
  { id: 3, title: 'Sharp Futuristic Anime', type: '2D Animation', description: 'Clean lines, vibrant colors, dynamic action poses...', img_url: '/styles/3.jpg' },
  { id: 4, title: 'Korean Webtoon', type: '2D Animation', description: 'Soft gradients, expressive eyes, romantic atmosphere...', img_url: '/styles/4.jpg' },
  { id: 5, title: 'Vibrant Soft 3D', type: '3D Render', description: 'Rounded forms, pastel palette, soft global illumination...', img_url: '/styles/5.jpg' },
  { id: 6, title: 'Classic American Comic', type: 'Illustration', description: 'Bold outlines, halftone dots, primary colors...', img_url: '/styles/6.jpg' },
  { id: 7, title: 'Epic Oriental Wuxia', type: 'Realistic/Live', description: 'Sweeping landscapes, flowing robes, ink wash atmosphere...', img_url: '/styles/7.jpg' },
  { id: 8, title: 'K-Pop Avant-Garde', type: 'Experimental', description: 'Glitch effects, neon overlays, fashion-forward aesthetics...', img_url: '/styles/8.jpg' },
];

export const mockVoices: Voice[] = [
  { id: 'v-en-001', name: 'Marcus', description: 'Deep warm baritone, narrator style', audioUrl: '', age: ['Adult', 'Middle-Aged'], language: 'en-US', gender: 'Male' },
  { id: 'v-en-002', name: 'Sophia', description: 'Bright, youthful female voice', audioUrl: '', age: ['Young Adult'], language: 'en-US', gender: 'Female' },
  { id: 'v-zh-001', name: '霸道总裁', description: '低沉磁性男声，气场强大', audioUrl: '', age: ['Adult'], language: 'zh-CN', gender: 'Male' },
  { id: 'v-zh-002', name: '温柔御姐', description: '成熟知性女声，温暖有力', audioUrl: '', age: ['Adult'], language: 'zh-CN', gender: 'Female' },
  { id: 'v-zh-003', name: '少年热血', description: '清亮少年音，充满活力', audioUrl: '', age: ['Young'], language: 'zh-CN', gender: 'Male' },
];

export const mockCharacters: Character[] = [
  { id: 'c-001', name: '白骨夫人', occupation: '妖族女王', level: 'major', gender: '女', age: '外表25', height: '170cm', brief_bio: '千年白骨精修炼成人形，外表冷艳内心孤独', appearance: '银白长发，冰蓝色瞳孔，身着白色长裙', image_url: null, voice_id: 'v-zh-002' },
  { id: 'c-002', name: '唐三藏', occupation: '取经僧人', level: 'major', gender: '男', age: '30', height: '178cm', brief_bio: '西行取经的高僧，慈悲为怀却内心坚定', appearance: '光头，身着金色袈裟，手持九环锡杖', image_url: null, voice_id: 'v-zh-001' },
];

export const mockEpisodes: Episode[] = [
  {
    episode_id: 'e-001',
    title: '第一集：初遇',
    summary: '白骨夫人在荒山设下陷阱，等待取经队伍的到来。一场命运的邂逅即将展开。',
    scenes: [
      { scene_number: 1, header: '外景 - 荒山古道 - 黄昏', description: '夕阳西下，一条蜿蜒的古道穿过荒凉的山谷。', dialogue: ['悟空：师父，前方妖气甚重，我们还是绕道吧。', '唐僧：阿弥陀佛，既是前路，便无退路。'], vo_narration: '命运的齿轮，在这一刻开始转动。' },
      { scene_number: 2, header: '内景 - 白骨洞 - 夜', description: '幽暗的洞穴中，白骨夫人端坐在骨制王座上。', dialogue: ['白骨夫人：千年等待，终于等到了他。'], vo_narration: '她等的不是唐僧肉，而是一个了断。' },
    ],
  },
  {
    episode_id: 'e-002',
    title: '第二集：试探',
    summary: '白骨夫人化身村姑接近取经队伍，与唐僧展开第一次对话。',
    scenes: [
      { scene_number: 1, header: '外景 - 山间小路 - 清晨', description: '薄雾笼罩的山路上，一位村姑提着竹篮缓缓走来。', dialogue: ['村姑（白骨夫人）：大师，前方无路，不如到我家歇歇脚？', '唐僧：多谢施主好意。'], vo_narration: '伪装之下，是千年的孤寂。' },
    ],
  },
];
