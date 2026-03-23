import { SkillCategory } from './skill-category';

export interface Skill {
  name: string;
  image_file: string;
  order: number;
  categories: SkillCategory[];
  padding_flg: boolean;
  mb_flg: boolean;
}
