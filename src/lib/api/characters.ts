/**
 * Characters API
 * 角色相关接口
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { api } from './client';
import type { ApiResponse, Character, GenerateCharactersRequest, GenerateCharactersResponse, VoiceListResponse } from '@/types/api';
import { voices as allVoices } from '@/mock/voices';

/**
 * 获取配音列表
 */
export async function getVoices(params?: { language?: string; gender?: string }): Promise<ApiResponse<VoiceListResponse>> {
  let voices = allVoices;
  if (params?.language) voices = voices.filter(v => v.language === params.language);
  if (params?.gender) voices = voices.filter(v => v.gender === params.gender);

  return {
    code: 0,
    message: 'success',
    data: { voice_list: voices },
  };

  // Real API call:
  // return api.get<VoiceListResponse>('/query/voices', params);
}

/**
 * 生成角色集
 */
export async function generateCharacters(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _data: GenerateCharactersRequest
): Promise<ApiResponse<GenerateCharactersResponse>> {
  const mockCharacters: Character[] = [
    {
      id: 'c-001',
      name: '白骨夫人',
      occupation: '妖族女王',
      level: 'major',
      gender: '女',
      age: '外表 25',
      height: '170cm',
      brief_bio: '千年白骨精修炼成人形，外表冷艳内心孤独',
      appearance: '银白长发，冰蓝色瞳孔，身着白色长裙',
      image_url: null,
      voice_id: 'v-zh-002',
    },
    {
      id: 'c-002',
      name: '唐三藏',
      occupation: '取经僧人',
      level: 'major',
      gender: '男',
      age: '30',
      height: '178cm',
      brief_bio: '西行取经的高僧，慈悲为怀却内心坚定',
      appearance: '光头，身着金色袈裟，手持九环锡杖',
      image_url: null,
      voice_id: 'v-zh-001',
    },
  ];

  return {
    code: 0,
    message: 'success',
    data: { characters: mockCharacters },
  };

  // Real API call:
  // return api.post<GenerateCharactersResponse>('/ai/generate_characters', data);
}

/**
 * 更新角色配音
 */
export async function updateCharacterVoice(
  characterId: string,
  voiceId: string
): Promise<ApiResponse<{ character_id: string; voice_id: string }>> {
  return {
    code: 0,
    message: 'success',
    data: { character_id: characterId, voice_id: voiceId },
  };

  // Real API call:
  // return api.post('/character/update_voice', { character_id: characterId, voice_id: voiceId });
}
