import { SkillCategory } from './skill-category';

export interface Skill {
  name: string;
  image_file: string;
  order: number;
  categories: SkillCategory[];
  mb_flg: boolean;
}
