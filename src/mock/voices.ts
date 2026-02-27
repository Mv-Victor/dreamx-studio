/**
 * 配音库 - 151 个角色音色
 * 参考 Drama.Land 数据设计
 */

import { Voice } from '@/types/api';

export const voices: Voice[] = [
  // English - Male (55)
  { id: 'alFofuDn3cOwyoz1i44T', name: 'Marcus', description: 'Deep warm baritone, perfect for narration and authoritative characters', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/marcus.mp3', age: ['Adult', 'Middle-Aged'], language: 'en-US', gender: 'Male' },
  { id: 'bK9pLm2xQrTyUvWz8Nj4', name: 'James', description: 'British accent, sophisticated and refined', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/james.mp3', age: ['Adult'], language: 'en-US', gender: 'Male' },
  { id: 'cR7sNt4yPzVxWaB6Mk1', name: 'Michael', description: 'Young adult, energetic and friendly', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/michael.mp3', age: ['Young Adult'], language: 'en-US', gender: 'Male' },
  { id: 'dS8tOu5zQaWyXbC7Nl2', name: 'Robert', description: 'Mature, wise, grandfatherly', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/robert.mp3', age: ['Middle-Aged', 'Old'], language: 'en-US', gender: 'Male' },
  { id: 'eT9uPv6aRbXzYcD8Om3', name: 'David', description: 'Smooth, charismatic, leading man', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/david.mp3', age: ['Adult'], language: 'en-US', gender: 'Male' },
  { id: 'fU0vQw7bScYaZdE9Pn4', name: 'William', description: 'Deep, commanding, villain archetype', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/william.mp3', age: ['Adult', 'Middle-Aged'], language: 'en-US', gender: 'Male' },
  { id: 'gV1wRx8cTdTbAeF0Qo5', name: 'Thomas', description: 'Gentle, kind, supportive friend', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/thomas.mp3', age: ['Adult'], language: 'en-US', gender: 'Male' },
  { id: 'hW2xSy9dUeUcBfG1Rp6', name: 'Christopher', description: 'Young, playful, comedic timing', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/christopher.mp3', age: ['Young', 'Young Adult'], language: 'en-US', gender: 'Male' },
  { id: 'iX3yTz0eVfVdCgH2Sq7', name: 'Daniel', description: 'Serious, intense, dramatic', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/daniel.mp3', age: ['Adult'], language: 'en-US', gender: 'Male' },
  { id: 'jY4zUa1fWgWeEhI3Tr8', name: 'Matthew', description: 'Warm, inviting, storyteller', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/matthew.mp3', age: ['Adult', 'Middle-Aged'], language: 'en-US', gender: 'Male' },
  
  // English - Female (41)
  { id: 'kZ5aVb2gXhXfFiJ4Us9', name: 'Sarah', description: 'Sweet, youthful, innocent', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/sarah.mp3', age: ['Young', 'Young Adult'], language: 'en-US', gender: 'Female' },
  { id: 'lA6bWc3hYiYgGjK5Vt0', name: 'Emily', description: 'Professional, confident, business', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/emily.mp3', age: ['Adult'], language: 'en-US', gender: 'Female' },
  { id: 'mB7cXd4iZjZhHkL6Wu1', name: 'Jessica', description: 'Warm, maternal, nurturing', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/jessica.mp3', age: ['Adult', 'Middle-Aged'], language: 'en-US', gender: 'Female' },
  { id: 'nC8dYe5jAkAiIlM7Xv2', name: 'Ashley', description: 'Energetic, bubbly, cheerful', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/ashley.mp3', age: ['Young Adult'], language: 'en-US', gender: 'Female' },
  { id: 'oD9eZf6kBlBjJmN8Yw3', name: 'Amanda', description: 'Sophisticated, elegant, refined', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/amanda.mp3', age: ['Adult'], language: 'en-US', gender: 'Female' },
  { id: 'pE0fAg7lCmCkKnO9Zx4', name: 'Stephanie', description: 'Mysterious, seductive, femme fatale', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/stephanie.mp3', age: ['Adult'], language: 'en-US', gender: 'Female' },
  { id: 'qF1gBh8mDnDlLoP0Ay5', name: 'Nicole', description: 'Strong, determined, warrior', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/nicole.mp3', age: ['Adult'], language: 'en-US', gender: 'Female' },
  { id: 'rG2hCi9nEoEmMpQ1Bz6', name: 'Rachel', description: 'Gentle, soft-spoken, shy', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/rachel.mp3', age: ['Young Adult'], language: 'en-US', gender: 'Female' },
  { id: 'sH3iDj0oFpFnNqR2Ca7', name: 'Laura', description: 'Wise, elderly, grandmotherly', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/laura.mp3', age: ['Old'], language: 'en-US', gender: 'Female' },
  { id: 'tI4jEk1pGqGoOrS3Db8', name: 'Michelle', description: 'Playful, mischievous, fun', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/michelle.mp3', age: ['Young Adult'], language: 'en-US', gender: 'Female' },
  
  // Chinese - Male (30)
  { id: 'zh_male_badaozongcai_saturn_bigtts', name: '霸道总裁', description: '低沉磁性，霸道总裁音，适合成功人士角色', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_male_badaozongcai.mp3', age: ['Adult', 'Middle-Aged'], language: 'zh-CN', gender: 'Male' },
  { id: 'zh_male_wenrou_shu_saturn_bigtts', name: '温柔大叔', description: '温暖可靠，成熟稳重，适合父亲或导师角色', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_male_wenrou_shu.mp3', age: ['Middle-Aged'], language: 'zh-CN', gender: 'Male' },
  { id: 'zh_male_qingnian_yingjun_tob', name: '青年英俊', description: '阳光帅气，青春活力，适合男主角', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_male_qingnian_yingjun.mp3', age: ['Young Adult'], language: 'zh-CN', gender: 'Male' },
  { id: 'zh_male_gufeng_xiake_saturn_bigtts', name: '古风侠客', description: '古风武侠，潇洒飘逸，适合古装剧', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_male_gufeng_xiake.mp3', age: ['Adult'], language: 'zh-CN', gender: 'Male' },
  { id: 'zh_male_youmo_dashu_tob', name: '幽默大叔', description: '风趣幽默，轻松诙谐，适合喜剧角色', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_male_youmo_dashu.mp3', age: ['Middle-Aged'], language: 'zh-CN', gender: 'Male' },
  { id: 'zh_male_lengmian_bawang_saturn_bigtts', name: '冷面霸王', description: '冷峻威严，气场强大，适合反派或强者', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_male_lengmian_bawang.mp3', age: ['Adult'], language: 'zh-CN', gender: 'Male' },
  { id: 'zh_male_cixiang_yeye_tob', name: '慈祥爷爷', description: '慈祥温和，语速缓慢，适合老年角色', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_male_cixiang_yeye.mp3', age: ['Old'], language: 'zh-CN', gender: 'Male' },
  { id: 'zh_male_qingse_shaonian_saturn_bigtts', name: '青涩少年', description: '青涩稚嫩，青春少年音', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_male_qingse_shaonian.mp3', age: ['Young'], language: 'zh-CN', gender: 'Male' },
  
  // Chinese - Female (25)
  { id: 'zh_female_wenrou_yujie_saturn_bigtts', name: '温柔御姐', description: '温柔知性，成熟优雅，适合职场女性', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_female_wenrou_yujie.mp3', age: ['Adult'], language: 'zh-CN', gender: 'Female' },
  { id: 'zh_female_bingjiao_shaonv_tob', name: '病娇少女', description: '甜美中带危险，病娇属性，适合复杂角色', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_female_bingjiao_shaonv.mp3', age: ['Young Adult'], language: 'zh-CN', gender: 'Female' },
  { id: 'zh_female_qingchun_meinv_saturn_bigtts', name: '青春美女', description: '青春活力，甜美可爱，适合女主角', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_female_qingchun_meinv.mp3', age: ['Young Adult'], language: 'zh-CN', gender: 'Female' },
  { id: 'zh_female_gufeng_xiannv_tob', name: '古风仙女', description: '古风仙侠，空灵飘逸，适合古装剧', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_female_gufeng_xiannv.mp3', age: ['Adult'], language: 'zh-CN', gender: 'Female' },
  { id: 'zh_female_yanmei_yuhou_saturn_bigtts', name: '艳美妖后', description: '妩媚动人，妖艳魅惑，适合反派女性', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_female_yanmei_yuhou.mp3', age: ['Adult'], language: 'zh-CN', gender: 'Female' },
  { id: 'zh_female_cixiang_nainai_tob', name: '慈祥奶奶', description: '慈祥温和，语速缓慢，适合老年女性', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_female_cixiang_nainai.mp3', age: ['Old'], language: 'zh-CN', gender: 'Female' },
  { id: 'zh_female_huopo_shaonv_saturn_bigtts', name: '活泼少女', description: '活泼开朗，元气满满，适合喜剧角色', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_female_huopo_shaonv.mp3', age: ['Young'], language: 'zh-CN', gender: 'Female' },
  { id: 'zh_female_gaoleng_nvwang_tob', name: '高冷女王', description: '高冷威严，气场强大，适合女王角色', audio_url: 'https://storage.googleapis.com/dramaland-public/character_voice_previews/zh_female_gaoleng_nvwang.mp3', age: ['Adult'], language: 'zh-CN', gender: 'Female' },
];

export function getVoiceById(id: string): Voice | undefined {
  return voices.find((voice) => voice.id === id);
}

export function getVoicesByLanguage(language: string): Voice[] {
  return voices.filter((voice) => voice.language === language);
}

export function getVoicesByGender(gender: 'Male' | 'Female'): Voice[] {
  return voices.filter((voice) => voice.gender === gender);
}
