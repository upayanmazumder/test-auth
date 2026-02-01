export interface APIResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface User {
  id: string;
  email: string;
  name: string;
  reg_no: string | null;
  phone_no: string | null;
  gender: string;
  github_profile: string;
  hostel_block: string;
  room_no: number;
  role: string;
  is_leader: boolean;
  is_banned: boolean;
  is_verified: boolean;
  is_profile_complete: boolean;
  team_id: string | null;
}

export interface UserProfile {
  name: string;
  registration_number: string;
  email: string;
  phone: string;
  gender: 'M' | 'F' | 'O';
  hostel_block: string;
  room_number: number;
}

export interface Team {
  ID: string;
  Name: string;
  TeamSize: number;
  RoundQualified: number;
  Code: string;
  IsBanned: boolean;
  TotalScore: number;
}

export interface UpdateTeam {
  id: string;
  name: string;
  team_size: number;
  round_qualified: number;
  code: string;
  is_banned: boolean;
  total_score: number;
}

export interface Idea {
  id: string;
  team_id: string;
  title: string;
  description: string;
  track: string;
  is_selected: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamIdea {
  ID: string;
  Title: string;
  Description: string;
  Track: string;
}

export interface TeamMember {
  id: string;
  name: string;
  reg_no: string;
  is_leader: boolean;
}
