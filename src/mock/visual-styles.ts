/**
 * 视觉风格库 - 107 种
 * 参考 Drama.Land 数据设计
 */

import { VisualStyle } from '@/types/api';

export const visualStyles: VisualStyle[] = [
  // Realistic/Live (52 种)
  { id: 1, title: 'Immersive Raw Realism', type: 'Realistic/Live', description: 'Wide-angle natural lighting with continuous dynamic movement, Alejandro G. Iñárritu style', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/1.jpg' },
  { id: 2, title: 'Hong Kong Neo-Noir', type: 'Realistic/Live', description: 'Neon-lit streets, rain-slicked alleys, Wong Kar-wai inspired cinematography', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/2.jpg' },
  { id: 3, title: 'Epic Oriental Wuxia', type: 'Realistic/Live', description: 'Traditional Chinese martial arts aesthetics, flowing robes, misty mountains', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/3.jpg' },
  { id: 4, title: 'Romantic Comedy', type: 'Realistic/Live', description: 'Bright warm tones, soft focus, contemporary urban settings', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/4.jpg' },
  { id: 5, title: 'Cyberpunk Dystopia', type: 'Realistic/Live', description: 'Neon signs, towering skyscrapers, rain, Blade Runner aesthetic', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/5.jpg' },
  { id: 6, title: 'Period Drama Qing Dynasty', type: 'Realistic/Live', description: 'Traditional Chinese palace architecture, elaborate costumes, ceremonial grandeur', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/6.jpg' },
  { id: 7, title: 'Modern Urban Romance', type: 'Realistic/Live', description: 'Contemporary city life, coffee shops, office buildings, natural lighting', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/7.jpg' },
  { id: 8, title: 'Suspense Thriller', type: 'Realistic/Live', description: 'Dark shadows, high contrast, tension-building compositions', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/8.jpg' },
  { id: 9, title: 'Fantasy Adventure', type: 'Realistic/Live', description: 'Epic landscapes, magical elements, Lord of the Rings inspired', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/9.jpg' },
  { id: 10, title: 'Sci-Fi Space Opera', type: 'Realistic/Live', description: 'Futuristic spaceships, alien worlds, advanced technology', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/10.jpg' },
  { id: 11, title: 'Horror Gothic', type: 'Realistic/Live', description: 'Dark atmospheric, Victorian architecture, supernatural elements', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/11.jpg' },
  { id: 12, title: 'Documentary Style', type: 'Realistic/Live', description: 'Handheld camera, natural lighting, authentic real-world feel', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/12.jpg' },
  { id: 13, title: 'Music Video Avant-Garde', type: 'Realistic/Live', description: 'Experimental angles, rapid cuts, artistic abstraction', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/13.jpg' },
  { id: 14, title: 'Western Frontier', type: 'Realistic/Live', description: 'Desert landscapes, cowboy aesthetics, golden hour lighting', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/14.jpg' },
  { id: 15, title: 'Teen Drama High School', type: 'Realistic/Live', description: 'Bright youthful tones, school settings, coming-of-age themes', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/15.jpg' },
  
  // 2D Animation (24 种)
  { id: 53, title: 'Sharp Futuristic Anime', type: '2D Animation', description: 'Clean lines, vibrant colors, sci-fi anime aesthetic', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/53.jpg' },
  { id: 54, title: 'Nostalgic Watercolor Anime', type: '2D Animation', description: 'Soft watercolor textures, dreamy atmosphere, 90s anime feel', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/54.jpg' },
  { id: 55, title: 'Korean Webtoon', type: '2D Animation', description: 'Modern webtoon style, clean digital art, vertical scroll format', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/55.jpg' },
  { id: 56, title: 'Pastel Shoujo Anime', type: '2D Animation', description: 'Soft pastel colors, romantic themes, sparkly effects', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/56.jpg' },
  { id: 57, title: 'Dark Seinen Action', type: '2D Animation', description: 'Gritty mature themes, intense action sequences, high contrast', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/57.jpg' },
  { id: 58, title: 'Chibi Comedy', type: '2D Animation', description: 'Cute exaggerated proportions, comedic timing, bright colors', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/58.jpg' },
  { id: 59, title: 'Studio Ghibli Inspired', type: '2D Animation', description: 'Lush backgrounds, gentle storytelling, natural beauty', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/59.jpg' },
  { id: 60, title: 'Mecha Anime', type: '2D Animation', description: 'Giant robots, futuristic battles, detailed mechanical designs', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/60.jpg' },
  
  // Illustration (18 种)
  { id: 77, title: 'Classic American Comic', type: 'Illustration', description: 'Bold outlines, halftone dots, superhero comic aesthetic', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/77.jpg' },
  { id: 78, title: 'Vintage Oil Painting', type: 'Illustration', description: 'Classical oil painting technique, rich textures, museum quality', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/78.jpg' },
  { id: 79, title: 'Chinese Gongbi Art', type: 'Illustration', description: 'Traditional Chinese meticulous brushwork, elegant lines, classical themes', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/79.jpg' },
  { id: 80, title: 'Pixel Art Animation', type: 'Illustration', description: 'Retro 8-bit aesthetic, nostalgic gaming feel, limited color palette', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/80.jpg' },
  { id: 81, title: 'Art Nouveau', type: 'Illustration', description: 'Flowing organic lines, decorative patterns, Mucha inspired', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/81.jpg' },
  { id: 82, title: 'Minimalist Line Art', type: 'Illustration', description: 'Simple clean lines, monochromatic, elegant simplicity', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/82.jpg' },
  
  // 3D Render (7 种)
  { id: 95, title: 'Vibrant Soft 3D', type: '3D Render', description: 'Smooth surfaces, pastel colors, cute character designs', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/95.jpg' },
  { id: 96, title: 'Epic High-Fantasy CG', type: '3D Render', description: 'Detailed fantasy worlds, magical effects, cinematic quality', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/96.jpg' },
  { id: 97, title: '3D Cartoon', type: '3D Render', description: 'Pixar/Disney style, expressive characters, family-friendly', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/97.jpg' },
  { id: 98, title: 'Claymation', type: '3D Render', description: 'Stop-motion clay aesthetic, tactile textures, handmade feel', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/98.jpg' },
  { id: 99, title: 'Wool Fiber Texture', type: '3D Render', description: 'Soft wool-like surfaces, cozy aesthetic, unique texture', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/99.jpg' },
  
  // Experimental (6 种)
  { id: 102, title: 'K-Pop Avant-Garde', type: 'Experimental', description: 'Bold colors, dynamic transitions, music video aesthetics', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/102.jpg' },
  { id: 103, title: 'Digital Glitch', type: 'Experimental', description: 'Glitch art effects, digital distortion, cyber aesthetic', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/103.jpg' },
  { id: 104, title: 'J-pop Bubblegum', type: 'Experimental', description: 'Ultra colorful, kawaii culture, energetic pop aesthetic', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/104.jpg' },
  { id: 105, title: '90s Ethereal Zen', type: 'Experimental', description: 'Dreamy atmospheric, meditative visuals, soft gradients', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/105.jpg' },
  { id: 106, title: 'Vaporwave', type: 'Experimental', description: '80s nostalgia, neon grids, retro-futuristic aesthetic', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/106.jpg' },
  { id: 107, title: 'Abstract Expressionism', type: 'Experimental', description: 'Non-representational forms, emotional color, artistic freedom', img_url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/107.jpg' },
];

export function getVisualStyleById(id: number): VisualStyle | undefined {
  return visualStyles.find((style) => style.id === id);
}

export function getVisualStylesByType(type: VisualStyle['type']): VisualStyle[] {
  return visualStyles.filter((style) => style.type === type);
}
